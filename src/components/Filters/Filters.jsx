/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Label, TextInput } from "flowbite-react"
import { useGlobalContext } from "../../context/GlobalContext";
import { useForm } from 'react-hook-form';
import { UseQueryParamsContext } from '../../context/queryParamsContext';





export const Filters = ({ setFilterResult }) => {
    const { register, handleSubmit, } = useForm();
    const { setQueryParams } = UseQueryParamsContext()
    const { globalState } = useGlobalContext()
    const [sortGames, setSortGames] = useState('A-Z')

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

    const handleAlphabeticalOrder = () => {
        if (sortGames === "A-Z") {
            setSortGames("Z-A")
            setFilterResult({
                sort: true,
            })
        } else {
            setSortGames("A-Z")
            setFilterResult({
                sort: false,
            })
        }
    }


    const onSubmit = (data) => {
        setQueryParams(data)
    }


    return (
        <section className="flex justify-center lg:justify-between p-3 gap-3 bg-slate-300 sticky top-0 flex-col md:flex-row">
            <form onSubmit={handleSubmit(onSubmit)} className='flex items-end justify-end gap-5'>
                <Button type="submit">
                    Search
                </Button>
                <TextInput
                    type="text"
                    className="border-0 bg-gray-200 focus:border-t-transparent focus:ring-gray-300 rounded-md h-10 "
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
                        allGames?.map((game) => (
                            <option key={game._id} value={game.categorie}>
                                {game.categorie}
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
                                {game.gameName} Votes: {game.votes}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="flex items-center flex-col justify-end">
                <Button onClick={handleAlphabeticalOrder} >
                    {sortGames}
                </Button>
            </div>
        </section>
    )
}

