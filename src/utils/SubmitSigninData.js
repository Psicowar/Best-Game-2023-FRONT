import axios from "axios"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { useAuth } from "../context/AuthContext"
import { HOME } from "../router/path"

export const SubmitSigninData = () => {
    const navigate = useNavigate()
    const { login } = useAuth();
    
    const sendUserData = (data) => {

        axios.post(import.meta.env.VITE_BACKEND + 'users/authenticate', { data })
            .then(({ status, data }) => {
                const { token } = data
                if (status === 201) {
                    login(
                        {
                            id: data._id,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            role: data.role,
                            remainingVotes: data.remainingVotes,
                            votedGames: data.votedGames
                        }, token
                    );
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Successfully logged in',
                        showConfirmButton: false,
                        background: '#64748b',
                        timer: 1500
                    })
                    localStorage.setItem("userToken", token)
                    navigate(HOME)
                }
            }).catch((err) => {
                if (err.response.status === 401) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Incorrect login details',
                        showConfirmButton: false,
                        background: '#64748b',
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Something went wrong',
                        showConfirmButton: false,
                        background: '#64748b',
                        timer: 1500
                    })

                }
            })

    }


    return {
        sendUserData
    }
}
