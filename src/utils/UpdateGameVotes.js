import axios from "axios"
import Swal from "sweetalert2"



export const UpdateGameVotes = () => {
    const addVote = (gameId, userId) => {  
        axios.patch(import.meta.env.VITE_BACKEND + "games/addGameVote", { gameId, userId })
            .then(({ status, data }) => {
                if (status === 200) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: data.message,
                        showConfirmButton: false,
                        background: "#1b1e2a",
                        timer: 1500
                    })
                } else if (status === 201) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Voted successfully, ${data.user.remainingVotes} left!`,
                        showConfirmButton: false,
                        background: "#1b1e2a",
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        position: 'center', 
                        icon: 'error',
                        title: 'Voted susscesfully',
                        showConfirmButton: false,
                        background: "#1b1e2a",
                        timer: 1500
                    })
                }
            })
    }

    const removeVote = (gameId, userId) => {  
        axios.patch(import.meta.env.VITE_BACKEND + "games/removeGameVotes", { gameId, userId })
            .then(({ status, data }) => {
                if (status === 200) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: data.message,
                        showConfirmButton: false,
                        background: "#1b1e2a",
                        timer: 1500
                    })
                } else if (status === 201) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Unvoted successfully, ${data.user.remainingVotes} left!`,
                        showConfirmButton: false,
                        background: "#1b1e2a",
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Voted susscesfully',
                        showConfirmButton: false,
                        background: "#1b1e2a",
                        timer: 1500
                    })
                }
            })
    }
    return {
        addVote,
        removeVote
    }
}



