
import Swal from "sweetalert2";
import { GetGames } from "./GetGames";

export const SubmitGameData = () => {
    const { getAllGames } = GetGames()

    const sendUserData = async (data, setLoading, setOpen, reset) => {
        const gameImage = data.image[0]
        const formData = new FormData();
        formData.append('image', gameImage);
        formData.append('title', data.title);
        formData.append('categorie', data.categorie);

        setLoading(true)

        const response = await fetch(import.meta.env.VITE_BACKEND + 'users/uploadGame', {
            method: 'POST',
            body: formData
        })

        const game = await response.json();
        if (game.status === true && game.message === "Successfully Uploaded") {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully Uploaded',
                showConfirmButton: false,
                background: '#64748b',
                timer: 1500
            })
            getAllGames()
            setLoading(false)
            setOpen(false)
            reset()

        } else if (game.status === false && game.message === "No image uploaded") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No image uploaded, please upload an image',
                showConfirmButton: false,
                background: '#64748b',
                timer: 1500
            })
            setLoading(false)
            setOpen(false)
            reset()
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Something went wrong, please try again',
                showConfirmButton: false,
                background: '#64748b',
                timer: 1500
            })
            setLoading(false)
            setOpen(false)
            reset()
        }
    }

    return {
        sendUserData
    }

}
