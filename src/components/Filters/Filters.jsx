/* eslint-disable react/prop-types */
import { Button, Label } from "flowbite-react"
import { useGlobalContext } from "../../context/GlobalContext";
import { useForm } from 'react-hook-form';
import { UseQueryParamsContext } from '../../context/queryParamsContext';






export const Filters = ({ setFilterResult }) => {
    const { register, handleSubmit, } = useForm();
    const { setQueryParams } = UseQueryParamsContext()
    const { globalState } = useGlobalContext()

    const { allGames } = globalState


    const handleCategoryChange = (e) => {
        setFilterResult(prevState => ({
            ...prevState,
            category: e.target.value,
            filterType: 'category'
        }))
    }

    const handleGamesVoted = (e) => {
        setFilterResult(prevState => ({
            ...prevState,
            votedGame: e.target.value,
            filterType: 'voted'
        }))
    }

    const handleAlphabeticalOrder = (e) => {
        if (e.target.value === "Top voted") {
            setFilterResult(prevState => ({
                ...prevState,
                sort: "Top voted"
            }))
        } else if (e.target.value === "A - Z") {
            setFilterResult(prevState => ({
                ...prevState,
                sort: "A - Z"
            }))
        } else {
            setFilterResult(prevState => ({
                ...prevState,
                sort: "Z - A"
            }))
        }
    }


    const onSubmit = (data) => {
        setQueryParams(data)
    }

    let gameCategory = []
    allGames?.map((game) => (
        gameCategory.push(game.categorie.toLowerCase())
    ))
    const uniqueCategories = [...new Set(gameCategory)]

    return (
        <section className="flex justify-center lg:justify-between p-3 gap-3 bg-slate-300 flex-col md:flex-row">
            <form onSubmit={handleSubmit(onSubmit)} className='flex items-end justify-end gap-5'>
                <Button type="submit">
                    Search
                </Button>
                <input
                    type="text"
                    className="border-0 bg-gray-200 focus:border-t-transparent focus:ring-gray-300 rounded-md "
                    placeholder="Search..."
                    {...register("search")}
                />
            </form>
            <div className="flex items-center flex-col gap-1">
                <Label className="font-semibold" value='Filter for category' />
                <select
                    label="Dropdown button categorie"
                    className="rounded-lg bg-gray-200 border-0 focus:ring-gray-300 w-24 truncate"
                    onChange={handleCategoryChange}
                >
                    <option value="All">Select all</option>
                    {
                        uniqueCategories?.map((category, i) => (
                            <option key={i} value={category} className="capitalize ">
                                {category}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="flex items-center flex-col gap-1">
                <Label className="font-semibold" value='Filter for voted games' />
                <select
                    label="Dropdown button voted games"
                    className="rounded-lg  bg-gray-200 border-0 focus:ring-gray-300 w-48"
                    onChange={handleGamesVoted}
                >
                    <option value="All">Select all</option>
                    {
                        allGames?.map((game) => (
                            <option key={game._id} value={game._id}>
                                {game.gameName} - Votes: {game.votes}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="flex items-center flex-col justify-end gap-1">
                <Label className="font-semibold" value='Alphabetical order' />
                <select
                    label="Dropdown button alphabetical order for games"
                    className="rounded-lg  bg-gray-200 border-0 focus:ring-gray-300 w-28"
                    onChange={handleAlphabeticalOrder}
                >
                    <option value="Top voted">Top voted</option>
                    <option value="A - Z">A - Z</option>
                    <option value="Z - A">Z - A</option>
                </select>
            </div>
        </section>
    )
}

