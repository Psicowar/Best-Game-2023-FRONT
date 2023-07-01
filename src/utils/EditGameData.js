import axios from "axios"
import Swal from "sweetalert2"
import { GetGames } from "./GetGames"

export const UpdateGameData = () => {
    const { getAllGames } = GetGames()

    const submitUpdateData = (data, reset, setOpen, id) => {
        axios.patch(import.meta.env.VITE_BACKEND + "games/updateGameData", { data, id })
            .then(({ status }) => {
                if (status === 200) {
                    getAllGames()
                    reset()
                    setOpen(false)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'deleted successfully',
                        showConfirmButton: false,
                        background: "#1b1e2a",
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Something get wron',
                        showConfirmButton: false,
                        background: "#1b1e2a",
                        timer: 1500
                    })
                }
            })
    }

    return {
        submitUpdateData
    }
}
