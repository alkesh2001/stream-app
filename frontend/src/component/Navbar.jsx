import React from 'react'
import {Search, Youtube , Menu, Pointer} from "lucide-react"
import Input from './Input'
import { useDispatch } from 'react-redux'
import { toggleVisiblity } from '../redux/auth/auth'


function Navbar({userData}) {
  
  const dispatch = useDispatch()
  console.log(userData)
  

  return (
    <div className='w-full flex justify-center bg-blue-500 '>
       <div className='w-full '>
           <div className='w-full'>
            <div className='grid grid-cols-12 px-5 py-3'>
                <div className='col-span-2 flex gap-10'>
                  <div className='flex justify-center items-center ps-4'>
                    <Menu onClick={()=> dispatch(toggleVisiblity())} cursor={Pointer}/>
                  </div>
                  <div className='flex gap-2 justify-center items-center'>
                    <Youtube height={'40px'} width={'40px'}/>
                    <span>Stream-App</span>
                  </div>
                </div>
                <div className='col-span-8 flex items-center justify-center'>
                  <div className='bg-gray-200 h-10 flex justify-end rounded-2xl w-3/4 '> 
                    <div className='w-full'>
                      <Input className='w-full bg-gray-200 h-10'/>
                    </div>
                    <div className='border-s border-gray-500 h-10 w-12 bg-gray-200 rounded-br-2xl rounded-tr-2xl flex justify-center items-center'>
                      <Search />
                    </div>
                  </div>
                </div>
                <div className='flex justify-end col-span-2'>
                  <div className='bg-gray-200  text-xl  font-medium rounded-2xl h-10 w-10 flex justify-center items-center'>
                      {userData && userData.username[0]}
                  </div>
                </div>
              </div>
           </div>
       </div>
    </div>
  )
}

export default Navbar
