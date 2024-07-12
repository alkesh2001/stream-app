import React from 'react'
import Input from "../component/Input"
import Button from "../component/Button"
import {useForm} from 'react-hook-form'
import axios from  "axios"
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const {register ,handleSubmit  } = useForm() 

   const navigate = useNavigate()


const login =  async (userData) =>{
    try {
        const res = await axios.post('http://localhost:8000/api/v1/user/login' ,userData)
        if(res){
            console.log(res)
        }
        // dispatch(userAccessToken(res.data.accessToken))
        localStorage.setItem("accessToken" , res.data.accessToken)
        navigate('/Home')

    } catch (error) {
        console.log(error , "error when user login")
    }
}

  return (
    <div className='h-screen w-full px-5 flex justify-center items-center bg-gray-200'>
       <div className='w-[400px]  py-5 rounded-2xl text-white bg-gray-800'>
            <div className='text-lg font-medium text-center pt-5'>
                    welcome to Stream-App
            </div>
            <form onSubmit={handleSubmit(login)}>
                <div className='mt-5  grid gap-4'>
                    <div className='px-6 '>
                        <Input type="email" className="rounded-lg" placeholder='Email' {...register("email",{
                            required : true , validate : { matchPartern: (value) =>
                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be valid address",}
                            })}/>
                    </div>
                    <div className='px-6 '>
                        <Input type="password" className="rounded-lg" placeholder='Password' {...register("password" ,{
                            required : true
                        })}/>
                    </div>
                    <div className='px-10 mt-5'>
                        <Button type="submit" className="bg-blue-500 text-white font-medium text-lg rounded-lg py-1 w-full"   value={'Login'}/>
                    </div>
                </div>
            </form>
             <div className='text-sm font-medium text-center mt-3'>
                Create Account <span className='text-blue-500'>SignUp</span>
             </div>
       </div>
    </div>
  )
}

export default Login
