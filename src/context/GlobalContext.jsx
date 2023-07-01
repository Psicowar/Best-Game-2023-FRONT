/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import { TYPES } from "./types";

export const GlobalContext = createContext()

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}

export const GlobalProvider = ({ children }) => {

    const initialState = {
        allGames: [],
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case TYPES.SET_ALL_GAMES:
                return {
                    allGames: action.payload.allGames
                };
            default:
                return state;
        }
    };

    const setAllGames = useCallback((allGames) => {
        dispatch({ type: TYPES.SET_ALL_GAMES, payload: {allGames} })
    }, [])



    const [gamesState, dispatch] = useReducer(reducer, initialState)

    const data = useMemo(() => ({
        gamesState,
        setAllGames,
    }), [gamesState, setAllGames])

    return <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>

}
