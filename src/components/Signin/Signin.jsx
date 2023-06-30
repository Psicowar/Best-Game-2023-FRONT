import { Button, Label, TextInput } from 'flowbite-react';
import { SIGNUP } from '../../router/path';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SubmitSigninData } from '../../utils/index'

export const Signin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { sendUserData } = SubmitSigninData()

    const submitData = async (data) => {
        sendUserData(data)
    }
    return (
        <div className='flex justify-center items-center h-[90vh]'>
            <form className="flex w-[20vw] flex-col gap-4" onSubmit={handleSubmit(submitData)}>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="email1"
                            value="Email"
                        />
                    </div>
                    <TextInput
                        placeholder="example@example.com"
                        type="email"
                        {...register("email", { required: true })}
                    />
                    {errors.name?.type === "required" && <p className="text-red-500 text-xs text-center pt-1">The email is required.</p>}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password"
                            value="Password"
                        />
                    </div>
                    <TextInput
                        placeholder="********"
                        type="password"
                        {...register("password", { required: true, })}
                    />
                    {errors.password?.type === "required" && <p className="text-red-500 text-xs text-center pt-1">The password is required. </p>}
                </div>
                <div className="flex items-center gap-2 font-semibold">
                    <span>Alredy have an account?</span>
                    <NavLink to={SIGNUP}>
                        <span className=' text-teal-400 hover:text-teal-500 hover:underline'>Sign up</span>
                    </NavLink>
                </div>
                <Button type="submit">
                    Submit
                </Button>
            </form>
        </div>

    )
}
