
/* eslint-disable react/prop-types */
import { Button, Modal } from "flowbite-react";
import { UpdateGameData } from "../../../utils/index";
import { useForm } from "react-hook-form";

export const UpdateGameDataModal = ({ open, setOpen, game }) => {
    const { register, handleSubmit, reset, } = useForm();
    const { submitUpdateData } = UpdateGameData()
    
    const onSubmit = async (data) => {
        submitUpdateData(data, reset, setOpen, game?._id)
    }

    return (
        <Modal
            show={open}
            size="md"
            popup={true}
            onClose={() => setOpen(false)}
            dismissible
        >
            <Modal.Header className='bg-slate-500' />
            <Modal.Body className='bg-slate-500'>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="text-center text-3xl font-bold"> Edit Game</h3>
                    <div className='w-full flex justify-center'>
                        <img src={game?.picture} alt={game?.gameName} className='w-50 h-40 object-cover rounded-md' />
                    </div>
                    <div className="flex flex-col gap-2 pb-5">
                       
                        <span className='font-semibold'>Game name</span>
                        <input
                            type="text"
                            className=' bg-gray-200 border-0 focus:border-t-transparent focus:ring-[#E6DDC4] rounded-md text-sm rounde block w-full p-2.5 truncate'
                            placeholder={game?.gameName}
                            {...register("gameName", { required: true})}  
                          
                            
                        />
                        <span className='font-semibold'>Game categorie</span>
                        <input
                            type="text"
                            className=' bg-gray-200 border-0 focus:border-t-transparent focus:ring-[#E6DDC4] rounded-md text-sm rounde block w-full p-2.5 truncate'
                            placeholder={game?.categorie}
                            {...register("categorie", { required: true})} 
                            
                        />
                    </div>
                    <div className='h-10'>
                        <Button type="submit" className=" rounded-lg m-auto font-semibold hover:border-2 text-center">
                            Update gif title
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal >
    )
}
