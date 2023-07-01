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
import { useNavigate, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';




export const Home = () => {
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [openUpdateGameModal, setOpenUpdateGameModal] = useState(false);
    const [currentGame, setCurrentGame] = useState()
    const [categorie, setCategorie] = useState([])
    const [votedGames, setVotedGames] = useState([])
    const [textValue, setTextValue] = useState("A -> Z")

    // const [alpabetichalOrder, setAlphabeticalOrder] = useState([])
    const { globalState } = useGlobalContext()
    const { addVote, removeVote } = UpdateGameVotes()
    const { checkUser } = CheckUserData()
    const { getAllGames } = GetGames()
    const { deleteSingleGame } = DeleteGame()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const { allGames } = globalState
    const { authState, refresh } = useAuth()
    const { isAuthenticated, user } = authState
    const queryParams = searchParams.get('q') ?? "";

    const orderedGamesByVotes = allGames?.sort(({ votes: a }, { votes: b }) => b - a)

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
                confirmButtonText: 'Sign in!',
                background: '#64748b',
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

    const handleFilter = ({ target }) => {
        setSearchParams({ q: target.value })
    }

    const handleCategorieFilter = (e) => {
        const filterCategories = allGames?.find(value => value._id === e.target.value)
        setCategorie([filterCategories])
    }

    const handleVotedGamesFilter = (e) => {
        const filterVotedGames = allGames?.find(value => value._id === e.target.value)
        setVotedGames([filterVotedGames]);
    }

    const handleAlphabeticalOrder = () => {
        if (textValue === "Z -> A") {
            setTextValue("A -> Z")
            setAlphabeticalOrder(orderedGamesByVotes.sort())
        } else {
            setTextValue("Z -> A")
            setAlphabeticalOrder(orderedGamesByVotes.sort()).reverse()
        }

    }



    return (
        <>
            <AddGameModal setOpen={setOpenUploadModal} open={openUploadModal} />
            <UpdateGameDataModal setOpen={setOpenUpdateGameModal} open={openUpdateGameModal} game={currentGame} />
            <div className="flex w-full items-end justify-center gap-3 pt-5 pb-10 bg-slate-300 sticky top-[6.55vh]">
                <input
                    type="text"
                    className="border-0 bg-gray-200 focus:border-t-transparent focus:ring-gray-300 w-96 rounded-md "
                    placeholder="Search..."
                    value={queryParams}
                    onChange={handleFilter}
                />
                <div className="flex items-center flex-col">
                    <p className="font-semibold">Filter for voted games</p>
                    <select
                        label="Dropdown button categorie"
                        className="rounded-lg bg-gray-200 border-0 focus:ring-gray-300 w-48"
                        onChange={handleCategorieFilter}
                    >
                        <option onClick={() => setCategorie("")}>Select all</option>
                        {
                            allGames?.map((game) => (
                                <option key={game._id} value={game._id}>
                                    {game.categorie}
                                </option>

                            ))
                        }
                    </select>
                </div>
                <div className="flex items-center flex-col">
                    <p className="font-semibold">Filter for voted games</p>
                    <select
                        label="Dropdown button voted games"
                        className="rounded-lg  bg-gray-200 border-0 focus:ring-gray-300 w-48"
                        onChange={handleVotedGamesFilter}
                    >
                        <option onClick={() => setVotedGames("")}>Select all</option>
                        {
                            orderedGamesByVotes?.map((game) => (
                                <option key={game._id} value={game._id}>
                                    {game.gameName} Votes: {game.votes}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="flex items-center flex-col justify-center">
                    <Button onClick={handleAlphabeticalOrder} >
                        {textValue}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-3 gap-y-10 place-items-center bg-slate-500">

                {
                    isAuthenticated && user.role === "A" &&
                    <Card className="w-[262px] h-[437.6px] flex items-center hover:shadow-none bg-gray-200 hover:bg-gray-300" onClick={() => setOpenUploadModal(true)}>
                        <AiOutlinePlus size={32} color="black" className="hover:rounded-full hover:bg-opacity-10 hover:bg-slate-900 rounded-full" />
                    </Card>
                }
                {
                    categorie.length > 0 ?
                        categorie.map((game) => (
                            <Card key={uuidv4()} className="bg-gray-200">
                                <div>
                                    <div className="w-52 truncate">
                                        <span className=" font-semibold ">{game?.gameName}</span>
                                    </div>
                                    <img src={game?.picture} alt="" className="text-center rounded-lg py-3" />
                                    <div className="flex justify-between w-full items-center">
                                        {
                                            isAuthenticated && user.role === "A" &&
                                            <>
                                                <MdModeEditOutline size={30} className="cursor-pointer rounded-full p-1 bg-gray-200 hover:bg-gray-400" onClick={() => handleOpenModal(game)} />
                                                <AiFillDelete size={30} className="cursor-pointer rounded-full p-1 bg-gray-200 hover:bg-gray-400" onClick={() => delGame(game?._id)} />
                                            </>
                                        }
                                        <span className="">{game?.votes} Votes</span>
                                        {

                                            user.votedGames?.includes(game?._id) ?
                                                <Button onClick={() => handleUnVote(game?._id)}>Unvote</Button>
                                                :
                                                <Button onClick={() => handleVote(game?._id)}>Vote</Button>
                                        }
                                    </div>
                                </div>
                            </Card>
                        ))
                        :
                        votedGames.length > 0 ?
                            votedGames.map((game) => (
                                <Card key={uuidv4()} className="bg-gray-200">
                                    <div>
                                        <div className="w-52 truncate">
                                            <span className=" font-semibold ">{game?.gameName}</span>
                                        </div>
                                        <img src={game?.picture} alt="" className="text-center rounded-lg py-3" />
                                        <div className="flex justify-between w-full items-center">
                                            {
                                                isAuthenticated && user.role === "A" &&
                                                <>
                                                    <MdModeEditOutline size={30} className="cursor-pointer rounded-full p-1 bg-gray-200 hover:bg-gray-400" onClick={() => handleOpenModal(game)} />
                                                    <AiFillDelete size={30} className="cursor-pointer rounded-full p-1 bg-gray-200 hover:bg-gray-400" onClick={() => delGame(game?._id)} />
                                                </>
                                            }
                                            <span className="">{game?.votes} Votes</span>
                                            {

                                                user.votedGames?.includes(game._id) ?
                                                    <Button onClick={() => handleUnVote(game?._id)}>Unvote</Button>
                                                    :
                                                    <Button onClick={() => handleVote(game?._id)}>Vote</Button>
                                            }
                                        </div>
                                    </div>
                                </Card>
                            ))
                            :
                            orderedGamesByVotes?.filter(({ gameName }) => {
                                if (!queryParams) return true
                                else if (queryParams.length < 3) return true
                                else return gameName?.toLowerCase().includes(queryParams.toLowerCase())
                            })
                                .map((game) => (
                                    <Card key={game?._id} className="bg-gray-200">
                                        <div>
                                            <div className="w-52 truncate">
                                                <span className=" font-semibold ">{game?.gameName}</span>
                                            </div>
                                            <img src={game?.picture} alt="" className="text-center rounded-lg py-3" />
                                            <div className="flex justify-between w-full items-center">
                                                {
                                                    isAuthenticated && user.role === "A" &&
                                                    <>
                                                        <MdModeEditOutline size={30} className="cursor-pointer rounded-full p-1 bg-gray-200 hover:bg-gray-400" onClick={() => handleOpenModal(game)} />
                                                        <AiFillDelete size={30} className="cursor-pointer rounded-full p-1 bg-gray-200 hover:bg-gray-400" onClick={() => delGame(game?._id)} />
                                                    </>
                                                }
                                                <span className="">{game?.votes} Votes</span>
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
