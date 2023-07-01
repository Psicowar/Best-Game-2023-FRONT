import axios from "axios"
import { useGlobalContext } from "../context/GlobalContext"

export const GetGames = () => {
    const { setAllGames } = useGlobalContext()

    const getAllGames = () => {
        axios.get(import.meta.env.VITE_BACKEND + 'games/all')
            .then(({ data }) => {
                setAllGames(data);
            })
    }
    return {
        getAllGames
    }
}