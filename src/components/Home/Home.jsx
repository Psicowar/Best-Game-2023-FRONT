import { useEffect, useState } from "react";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { AddGameModal } from "./AddGameModal/AddGameModal";
import { useGlobalContext } from "../../context/GlobalContext";
import { GetGames, DeleteGame, CheckUserData } from "../../utils/index";
import { useAuth } from "../../context/AuthContext";
import { Button, Card } from "flowbite-react";
import { MdModeEditOutline } from "react-icons/md";
import { UpdateGameDataModal } from "../UpdateGameDataModal/UpdateGameDataModal";
import { UpdateGameVotes } from "../../utils/UpdateGameVotes";
import Swal from "sweetalert2";
import { SIGNIN } from "../../router/path";
import { useNavigate } from "react-router-dom";




export const Home = () => {
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [openUpdateGameModal, setOpenUpdateGameModal] = useState(false);
    const [currentGame, setCurrentGame] = useState()
    const { gamesState } = useGlobalContext()
    const { addVote, removeVote } = UpdateGameVotes()
    const { checkUser } = CheckUserData()
    const { getAllGames } = GetGames()
    const { deleteSingleGame } = DeleteGame()
    const navigate = useNavigate()
    const { allGames } = gamesState
    const { authState, refresh } = useAuth()
    const { isAuthenticated, user } = authState

    useEffect(() => {
        getAllGames()
    }, [])

    const handleOpenModal = (game) => {
        setCurrentGame(game)
        setOpenUpdateGameModal(true)
    }

    const delGame = (_id) => {
        deleteSingleGame(_id)
    }

    const handleVote = (gameId) => {
        if (isAuthenticated) {
            addVote(gameId, user.id)
            checkUser(authState.token, refresh)
            getAllGames()
        } else {
            Swal.fire({
                title: 'You are not logged in, log in to vote',
                icon: 'error',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sign in!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(SIGNIN)
                }
            })
        }
    }



    const handleUnVote = (gameId) => {
        removeVote(gameId, user.id)
        checkUser(authState.token, refresh)
    }


    return (
        <>
            <AddGameModal setOpen={setOpenUploadModal} open={openUploadModal} />
            <UpdateGameDataModal setOpen={setOpenUpdateGameModal} open={openUpdateGameModal} game={currentGame} />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-3 gap-y-10 place-items-center">
                {
                    isAuthenticated && user.role === "A" &&
                    <Card className="w-[262px] h-[437.6px] flex items-center hover:shadow-none hover:bg-gray-200" onClick={() => setOpenUploadModal(true)}>
                        <AiOutlinePlus size={32} color="black" className="hover:rounded-full hover:bg-opacity-10 hover:bg-slate-900 rounded-full" />
                    </Card>
                }
                {
                    allGames.sort(({ votes: a }, { votes: b }) => b - a).map((game) => (
                        <Card key={game._id}>
                            <div>
                                <div className="w-52 truncate">
                                    <span className=" font-semibold ">{game.gameName}</span>
                                </div>
                                <img src={game.picture} alt="" className="text-center rounded-lg py-3" />
                                <div className="flex justify-between w-full items-center">
                                    {
                                        isAuthenticated && user.role === "A" &&
                                        <>
                                            <MdModeEditOutline size={30} className="cursor-pointer rounded-full p-1 bg-gray-200 hover:bg-gray-400" onClick={() => handleOpenModal(game)} />
                                            <AiFillDelete size={30} className="cursor-pointer rounded-full p-1 bg-gray-200 hover:bg-gray-400" onClick={() => delGame(game._id)} />
                                        </>
                                    }
                                    <span className="">{game.votes} Votes</span>
                                    {

                                        user.votedGames?.includes(game._id) ?
                                            <Button onClick={() => handleUnVote(game._id)}>Unvote</Button>
                                            :
                                            <Button onClick={() => handleVote(game._id)}>Vote</Button>
                                    }
                                </div>
                            </div>
                        </Card>
                    ))
                }
            </div>
        </>
    )
}
