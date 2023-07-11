import axios from "axios"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { SIGNIN } from "../router/path";

export const SubmitSignupData = () => {
    const navigate = useNavigate()

    const sendUserData = (data) => {
        axios.post(import.meta.env.VITE_BACKEND + 'users/register', { data })
            .then(() => {
                navigate(SIGNIN)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Registered Successfully!',
                    showConfirmButton: false,
                    background: '#64748b',
                    timer: 1500
                })
            }).catch(err => {
                if (err.response.status === 422) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'User already exists!',
                        showConfirmButton: false,
                        background: '#64748b',
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Something went wrong!',
                        showConfirmButton: false,
                        background: '#64748b',
                        timer: 1500
                    })
                }
            });

    }

    return {
        sendUserData
    }
}
