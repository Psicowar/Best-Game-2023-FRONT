import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { Filters, Games } from "../index";




export const Home = () => {
    const { globalState } = useGlobalContext()
    const { allGames } = globalState

    const [filterResult, setFilterResult] = useState({
        category: "All",
        votedGame: "All",
        sort: false,
        filterType: "category"
    })


    const filterGame = (allGames) => {
        return allGames.filter(game => {
            if (filterResult.filterType === "category") {
                return (
                    filterResult.category === "All" ||
                    filterResult.category === game.categorie
                )
            } else if (filterResult.filterType === "voted") {
                return (
                    filterResult.votedGame === "All" ||
                    filterResult.votedGame === game._id
                )
            } else {
                return allGames
            }
        })
    }

    const filteredGames = filterGame(allGames)
    const alpabethicalFilter = [...filteredGames].sort((a, b) => a.gameName.localeCompare(b.gameName))


    return (
        <>
            <div className="flex justify-center gap-3 pt-5 pb-10 bg-slate-300 sticky top-0">
                <Filters setFilterResult={setFilterResult} />
            </div>
            <Games filteredGames={filterResult.sort ? alpabethicalFilter : filteredGames} />
        </>
    )
}
