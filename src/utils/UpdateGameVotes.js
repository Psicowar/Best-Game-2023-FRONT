import axios from "axios"
import Swal from "sweetalert2"
import { GetGames } from "./GetGames"
import { CheckUserData } from "./CheckUserData"
import { useAuth } from "../context/AuthContext"



export const UpdateGameVotes = () => {
    const { getAllGames } = GetGames()
    const { checkUser } = CheckUserData()
    const { authState, refresh } = useAuth()

    const addVote = (gameId, userId) => {
        axios.patch(import.meta.env.VITE_BACKEND + "games/addGameVote", { gameId, userId })
            .then(() => {
                getAllGames()
                checkUser(authState.token, refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Voted susscesfully',
                    showConfirmButton: false,
                    background: '#64748b',
                    timer: 1500
                })
            }).catch(err => {
                if (err.response.status === 422) {
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: `You've spent all your votes!`,
                        showConfirmButton: false,
                        background: '#64748b',
                        timer: 1500
                    })
                }
                else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: `Something went wrong!${err.response.status}`,
                        showConfirmButton: false,
                        background: '#64748b',
                        timer: 1500
                    })
                }
            })
    }

    const removeVote = (gameId, userId) => {
        axios.patch(import.meta.env.VITE_BACKEND + "games/removeGameVote", { gameId, userId })
            .then(() => {
                getAllGames()
                checkUser(authState.token, refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Unvoted susscesfully',
                    showConfirmButton: false,
                    background: '#64748b',
                    timer: 1500
                })
            }).catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: `Something went wrong!${err.response.status}`,
                    showConfirmButton: false,
                    background: '#64748b',
                    timer: 1500
                })
            })
    }
    return {
        addVote,
        removeVote
    }
}



