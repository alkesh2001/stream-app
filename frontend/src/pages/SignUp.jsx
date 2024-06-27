import React from 'react'
import Input from "../component/Input"
import Button from "../component/Button"

function SignUp() {
  return (
    <div className='h-screen flex justify-center items-center bg-gray-200'>
       <div className='w-5/6  py-5 rounded-2xl text-white bg-gray-800'>
            <div className='text-lg font-medium text-center pt-5'>
                    welcome to Stream-App
            </div>
             <div className='mt-5  grid gap-4'>
                <div className='px-6 '>
                    <Input  placeholder='Username' />
                </div>
                <div className='px-6 '>
                    <Input  placeholder='FullName' />
                </div>
                <div className='px-6 '>
                    <Input  placeholder='Email' />
                </div>
                <div className='px-6 '>
                    <Input placeholder='Password' />
                </div>
                <div className='px-10 mt-5'>
                    <Button className="bg-blue-500 text-white font-medium text-lg rounded-lg py-1 w-full"   value={'Login'}/>
                </div>
             </div>
             <div className='text-sm font-medium text-center mt-3'>
                Already Account <span className='text-blue-500'>Login</span>
             </div>
       </div>
    </div>
  )
}

export default SignUp
