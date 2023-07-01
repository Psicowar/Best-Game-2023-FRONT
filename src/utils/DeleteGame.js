import axios from 'axios'
import Swal from 'sweetalert2'
import { GetGames } from './GetGames'


export const DeleteGame = () => {
    const { getAllGames } = GetGames()

    const deleteSingleGame = (_id) => {
        axios.delete(import.meta.env.VITE_BACKEND + "games/deleteGame/" + _id)
            .then(({ status }) => {
                if (status === 200) {
                    getAllGames()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'deleted successfully',
                        showConfirmButton: false,
                        background: '#64748b',
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Something get wron',
                        showConfirmButton: false,
                        background: '#64748b',
                        timer: 1500
                    })
                }
            })

    }


    return {
        deleteSingleGame
    }
}
