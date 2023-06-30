import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AddGameModal } from "./AddGameModal/AddGameModal";

export const Home = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <AddGameModal setOpen={setOpen} open={open} />
            <div className="grid grid-cols-4 gap-3 p-3">
                <div className="w-24 h-24 md:w-36 md:h-36 lg:h-60 lg:w-60 flex flex-col text-xs md:text-lg rounded-lg items-center justify-center bg-gradient-to-b from-[#ef5567] transition duration-700 hover:bg-[#ed233b] hover:cursor-pointer" onClick={() => setOpen(true)}>
                    <AiOutlinePlus size={32} color="black" className="hover:rounded-full hover:bg-opacity-10 hover:bg-slate-900 rounded-full" />
                </div>
            </div>
        </>
    )
}
