import axios from 'axios'


export const CheckUserData = () => {


    const checkUser = async (token, refresh) => {
        axios.get(import.meta.env.VITE_BACKEND + "users/userData", { headers: { "Authorization": token } })
            .then(res => {
                const { data, status } = res
                if (status === 200) {
                    refresh(
                        {
                            id: data.id,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            role: data.role,
                            remainingVotes: data.remainingVotes,
                            votedGames: data.votedGames
                        }, token
                    );
                }
            })
    }
    return {
        checkUser
    }

}
