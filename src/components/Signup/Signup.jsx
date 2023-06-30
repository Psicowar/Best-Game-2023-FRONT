import { Button, Label, TextInput } from 'flowbite-react';
import { NavLink } from 'react-router-dom';
import { SIGNIN } from '../../router/path';
import { useForm } from 'react-hook-form';
import { SubmitSignupData } from '../../utils/index'

export const Signup = () => {
  const { sendUserData } = SubmitSignupData()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitData = async (data) => {
    sendUserData(data)
  }

  return (
    <div className='flex justify-center items-center h-[90vh]'>
      <form className="flex sm:w-[40vw] md:w-[20vw] flex-col gap-4" onSubmit={handleSubmit(submitData)}>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="email1"
              value="Name"
            />
          </div>
          <TextInput
            placeholder="Name"
            type="text"
            {...register("firstName", { required: true, pattern: /^[A-Za-z]+$/i })}
          />
          {errors.name?.type === "required" && <p className="text-red-500 text-xs text-center pt-1">The name is required</p>}
          {errors.name?.type === "pattern" && <p className="text-red-500 text-xs text-center pt-1">The name can only contain letters</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="Your last name"
              value="Last name"
            />
          </div>
          <TextInput
            placeholder="Last name"
            type="text"
            {...register("lastName", { required: true, pattern: /^[A-Za-z]+$/i })}
          />
          {errors.lastName?.type === "required" && <p className="text-red-500 text-xs text-center pt-1">The last name is required.</p>}
          {errors.lastName?.type === "pattern" && <p className="text-red-500 text-xs text-center pt-1">The last name can only contain letters.</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="Your last name"
              value="Email"
            />
          </div>
          <TextInput
            placeholder="example@example.com"
            type="email"
            {...register("email", {
              required: true,
              pattern: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/i
            })}
          />
          {errors.email?.type === "required" && <p className="text-red-500 text-xs text-center pt-1">The email is required. </p>}
          {errors.email?.type === "pattern" && <p className="text-red-500 text-xs text-center pt-1">The email is not valid.</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="Your last name"
              value="Password"
            />
          </div>
          <TextInput
            placeholder="********"
            type="password"
            {...register("password", {
              required: true,
              pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
            })}
          />
          {errors.password?.type === "required" && <p className="text-red-500 text-xs text-center pt-1">The password is required. </p>}
          {errors.password?.type === "pattern" && <p className="text-red-500 text-xs text-center pt-1">Must contain between 8 and 16 characters, at least one uppercase letter, one number and one special character. </p>}
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <span>Alredy have an account?</span>
          <NavLink to={SIGNIN}>
            <span className=' text-teal-400 hover:text-teal-500 hover:underline'>Sign in</span>
          </NavLink>
        </div>
        <Button type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}
