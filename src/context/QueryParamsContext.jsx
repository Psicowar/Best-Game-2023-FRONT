/* eslint-disable react/prop-types */
import { useContext, createContext } from "react";
import { useState } from "react";

export const QueryParamsContext = createContext()

const QueryParamsProvider = ({ children }) => {

    const [queryParams, setQueryParams] = useState([])

    return (
        <QueryParamsContext.Provider value={{ queryParams, setQueryParams }}>
            {children}
        </QueryParamsContext.Provider>
    )
};


export const UseQueryParamsContext = () => {
    const context = useContext(QueryParamsContext)
    if (!context) {
        throw new Error('Error provider')
    }
    return context
}


export default QueryParamsProvider;
