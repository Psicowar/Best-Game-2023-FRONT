/* eslint-disable react/prop-types */
import { Button, Modal } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import { MdPlaylistAdd } from 'react-icons/md';
import { useState } from 'react';
import { Puff } from 'react-loader-spinner';
import { SubmitGameData } from '../../../utils/index';

export const AddGameModal = ({ open, setOpen }) => {
    const { sendUserData } = SubmitGameData() 
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const submitData = (data) => {
        sendUserData(data, setLoading, setOpen, reset)
    }
    return (
        <Modal show={open} onClose={() => setOpen(false)} size={"xl"} dismissible>
            <Modal.Body className='bg-zinc-900 rounded'>
                <div className='flex justify-center flex-col items-center'>
                    <span className='text-white md:text-2xl'>Add new game</span>
                    <div className=" flex flex-col gap-5">
                        <form onSubmit={handleSubmit(submitData)} className=' m-auto flex flex-col items-center'>
                            <label className="text-gray-500 dark:text-gray-400" htmlFor="fileUpload">
                                <MdPlaylistAdd className="m-auto my-2 cursor-pointer" size={70} />
                            </label>
                            <input type="file" className='bg-zinc-600 rounded mb-5 md:w-80'
                                {...register("image", { required: true })}
                            />
                            {errors.image?.type === "required" && <p className="text-red-700 text-xs text-center rounded-lg mb-5">Select a image before uploading.</p>}
                            <input type="text" placeholder='Title' className='bg-zinc-600 rounded mb-5 md:w-80'
                                {...register("title", { required: true })}
                            />
                            {errors.title?.type === "required" && <p className="text-red-700 text-xs text-center rounded-lg mb-5">Select a title before uploading.</p>}
                            <input type="text" placeholder='Categorie' className='bg-zinc-600 rounded mb-5 md:w-80'
                                {...register("categorie", { required: true })}
                            />
                            {errors.categorie?.type === "required" && <p className="text-red-700 text-xs text-center rounded-lg mb-5">Indicate a category before uploading.</p>}
                            <Button
                                type='submit'
                                className='bg-deezer my-5'
                            >
                                {
                                    loading ?
                                        <div className="flex justify-center items-center">
                                            <Puff
                                                height="24"
                                                width="24"
                                                radius={1}
                                                color="#E6DDC4"
                                                ariaLabel="puff-loading"
                                                wrapperClass="m-auto"
                                                visible={true}
                                            />
                                        </div>
                                        :
                                        "Upload"
                                }

                            </Button>
                        </form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
