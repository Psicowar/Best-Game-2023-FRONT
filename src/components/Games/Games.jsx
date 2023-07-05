/* eslint-disable react/prop-types */
import { Button } from 'flowbite-react'
import { AddGameModal } from "./AddGameModal/AddGameModal";
import { UpdateGameDataModal } from "./UpdateGameDataModal/UpdateGameDataModal";
import { MdModeEditOutline } from 'react-icons/md'
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai'
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react';
import { CheckUserData, DeleteGame, GetGames, UpdateGameVotes } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { SIGNIN } from '../../router/path';
import Swal from 'sweetalert2';
import { UseQueryParamsContext } from '../../context/queryParamsContext';


export const Games = ({ filteredGames }) => {

    const { authState } = useAuth()
    const { queryParams } = UseQueryParamsContext()
    const navigate = useNavigate()
    const { getAllGames } = GetGames()
    const { deleteSingleGame } = DeleteGame()
    const { addVote, removeVote } = UpdateGameVotes()
    const { checkUser } = CheckUserData()

    const { isAuthenticated, user } = authState
    const {search} = queryParams

    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [openUpdateGameModal, setOpenUpdateGameModal] = useState(false);
    const [currentGame, setCurrentGame] = useState()

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
            checkUser(authState.token)
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
        checkUser(authState.token)
        getAllGames()
    }

    useEffect(() => {
        getAllGames()
    }, [])

    return (
        <main>
            <AddGameModal setOpen={setOpenUploadModal} open={openUploadModal} />
            <UpdateGameDataModal setOpen={setOpenUpdateGameModal} open={openUpdateGameModal} game={currentGame} />
            <ul className='grid grid-cols-gridAutoFit gap-3 p-3'>
                {
                    isAuthenticated && user.role === "A" &&
                    <li className="flex items-center justify-center hover:shadow-none bg-gray-200 hover:bg-gray-300 rounded-lg" onClick={() => setOpenUploadModal(true)}>
                        <AiOutlinePlus size={32} color="black" className="hover:rounded-full hover:bg-opacity-10 hover:bg-slate-900 rounded-full" />
                    </li>
                }
                {
                    filteredGames?.filter(({ gameName }) => {
                        if (!search) return true
                        else if (search.length < 3) return true
                        else return gameName?.toLowerCase().includes(search.toLowerCase())
                    }).map((game) => (
                        <li key={game._id} className="bg-gray-200 border rounded-lg m-auto">
                            <div className="w-52 truncate my-2">
                                <span className=" font-semibold p-2">{game?.gameName}</span>
                                <img src={game?.picture} alt={game?.gameName} className="text-center rounded-lg py-3" />
                            </div>
                            <div className="flex justify-between w-full items-center px-2 pb-3 ">
                                {
                                    isAuthenticated && user.role === "A" &&
                                    <>
                                        <MdModeEditOutline size={30} className="cursor-pointer rounded-full p-1 bg-gray-200 hover:bg-gray-400" onClick={() => handleOpenModal(game)} />
                                        <AiFillDelete size={30} className="cursor-pointer rounded-full p-1 bg-gray-200 hover:bg-gray-400" onClick={() => delGame(game?._id)} />
                                    </>
                                }
                                <span className="h-full">{game?.votes} Votes</span>
                                {
                                    user.votedGames?.includes(game?._id) ?
                                        <Button onClick={() => handleUnVote(game?._id)}>Unvote</Button>
                                        :
                                        <Button onClick={() => handleVote(game?._id)}>Vote</Button>
                                }
                            </div>
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}
