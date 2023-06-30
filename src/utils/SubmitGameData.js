
import Swal from "sweetalert2";

export const SubmitGameData = async (data, setLoading, setOpen, reset) => {
    
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
    const respone = await response.json();
    if (respone.status === true && respone.message === "Successfully Uploaded") {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully Uploaded',
            showConfirmButton: false,
            background: "#1b1e2a",
            timer: 1500
        })
        setLoading(false)
        setOpen(false)
        reset()
    } else if (respone.status === false && respone.message === "No image uploaded") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No image uploaded, please upload an image',
            showConfirmButton: false,
            background: "#1b1e2a",
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
            background: "#1b1e2a",
            timer: 1500
        })
        setLoading(false)
        setOpen(false)
        reset()
    }

    console.log(respone);



}
