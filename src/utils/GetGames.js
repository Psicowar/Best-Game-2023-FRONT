import axios from "axios"
import { useGlobalContext } from "../context/GlobalContext"

export const GetGames = () => {
    const { setAllGames } = useGlobalContext()

    const getAllGames = () => {
        axios.get(import.meta.env.VITE_BACKEND + 'games/all')
            .then(({ data }) => {
                const byVotesOrderedGames = data?.sort(({ votes: a }, { votes: b }) => b - a)
                setAllGames(byVotesOrderedGames);
            })
    }
    return {
        getAllGames
    }
}