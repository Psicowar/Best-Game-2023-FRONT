
/* eslint-disable react/prop-types */
import { Modal } from "flowbite-react";
import { UpdateGameData } from "../../utils/index";
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
            <Modal.Header className='bg-[#256D85]' />
            <Modal.Body className='bg-[#256D85]'>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="text-center text-3xl font-bold text-[#E6DDC4]"> Edit Game</h3>
                    <div className='w-full flex justify-center'>
                        <img src={game?.picture} alt={game?.gameName} className='w-50 h-40 object-cover rounded-md' />
                    </div>
                    <div className="flex flex-col gap-2 pb-5">
                       
                        <span className='font-semibold text-[#E6DDC4]'>Game name</span>
                        <input
                            type="text"
                            className='bg-slate-600 border-0 focus:border-t-transparent focus:ring-[#E6DDC4] rounded-md text-[#E6DDC4] text-sm rounde block w-full p-2.5 placeholder-[#E6DDC4] truncate'
                            placeholder={game?.gameName}
                            {...register("gameName", { required: true})}  
                          
                            
                        />
                        <span className='font-semibold text-[#E6DDC4]'>Game categorie</span>
                        <input
                            type="text"
                            className='bg-slate-600 border-0 focus:border-t-transparent focus:ring-[#E6DDC4] rounded-md text-[#E6DDC4] text-sm rounde block w-full p-2.5 placeholder-[#E6DDC4] truncate'
                            placeholder={game?.categorie}
                            {...register("categorie", { required: true})} 
                            
                        />
                    </div>
                    <div className='h-10'>
                        <button type="submit" className="bg-[#467686] p-2 rounded-lg w-full font-semibold hover:border-2 hover:border-[#E6DDC4] text-center text-[#E6DDC4]">
                            Update gif title
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal >
    )
}
