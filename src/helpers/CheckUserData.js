import axios from 'axios'

export const CheckUserData = () => {
    const checkUser = async (token, refresh) => {
        axios.post(import.meta.env.VITE_BACKEND + "users/userData", {}, { headers: { "Authorization": token } })
            .then(res => {
                const { data, status } = res
                if (status === 200) {
                    refresh(
                        {
                            id: data.id,
                            firstName: data.name,
                            lastName: data.last_name,
                            email: data.email,
                        }, token
                    );
                }
            })
    }
    return {
        checkUser
    }

}
