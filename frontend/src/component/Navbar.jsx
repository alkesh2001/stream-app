import React from 'react'
import {Search, Youtube , Menu, Pointer} from "lucide-react"
import Input from './Input'
import { useDispatch } from 'react-redux'
import { toggleVisiblity } from '../redux/auth/auth'


function Navbar({userData}) {
  console.log(userData)
  
  const dispatch = useDispatch()

  return (
    <div className='w-full flex justify-center bg-blue-500 '>
       <div className='w-full '>
           <div className='w-full '>
            <div className='grid-cols-3 gap-5 flex justify-between px-5 py-3'>
                <div className='justify-start flex md:gap-10  gap-3'>
                  <div className=' hidden  sm:flex justify-center items-center sm:ps-4'>
                    <Menu onClick={()=> dispatch(toggleVisiblity())} cursor={Pointer}/>
                  </div>
                  <div className=' flex gap-2 justify-center items-center'>
                    <Youtube height={'40px'} width={'40px'}/>
                    <span className='hidden sm:block'>Stream-App</span>
                  </div>
                </div>
                <div className='md:w-3/4 w-full  flex justify-end' >
                  <div className='w-full flex items-center justify-between'>
                    <div className='bg-gray-200 h-10 flex justify-end rounded-2xl  w-4/5 '> 
                      <div className='w-full'>
                        <Input className=' bg-gray-200 h-10'/>
                      </div>
                      <div className='border-s border-gray-500 h-10 w-12 bg-gray-200 rounded-br-2xl rounded-tr-2xl flex justify-center items-center'>
                        <Search />
                      </div>
                    </div>

                    <div className='flex justify-end '>
                      <div className='bg-gray-200  text-xl  font-medium rounded-2xl h-10 w-10 flex justify-center items-center'>
                          {userData && userData.username[0]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           </div>
       </div>
    </div>
  )
}

export default Navbar
