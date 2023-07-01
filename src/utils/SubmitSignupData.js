import axios from "axios"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { SIGNIN } from "../router/path";

export const SubmitSignupData = () => {
    const navigate = useNavigate()
    
    const sendUserData = (data) => {
        axios.post(import.meta.env.VITE_BACKEND + 'users/register', { data })
            .then(({ status }) => {
                if (status === 201) {
                    navigate(SIGNIN)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Registered Successfully!',
                        showConfirmButton: false,
                        background: "#1b1e2a",
                        timer: 1500
                    })
                }
                else if (status === 204) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'User already exists!',
                        showConfirmButton: false,
                        background: "#1b1e2a",
                        timer: 1500
                    })
                }
                else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Something went wrong!',
                        showConfirmButton: false,
                        background: "#1b1e2a",
                        timer: 1500
                    })
                }
            });

    }

    return {
        sendUserData
    }
}
