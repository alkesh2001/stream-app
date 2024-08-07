import React, { useState , useEffect } from 'react'
import {Search, Airplay , Menu, Pointer , X} from "lucide-react"
import Input from './Input'
import { useDispatch, useSelector } from 'react-redux'
import { toggleVisiblity } from '../redux/auth/auth'
import AccountCard from './AccountCard'
import { Link, useNavigate } from 'react-router-dom'


function Navbar() {
  
  const dispatch = useDispatch();
  const userData = useSelector(state=> state.auth.userData)
  const navigate = useNavigate()
  const [show , setShow] = useState(false)

  const showAccount = () =>{
    setShow(!show)
  }

  return (
          <div className='w-full  bg-black text-white z-40'>
            <div className='flex flex-row sm:gap-5  px-5 py-3'>
                <div className='flex basis-1/4 sm:basis-2/5 md:basis-2/6 justify-start  md:gap-10  gap-3'>
                  <div className=' hidden  sm:flex justify-center items-center sm:ps-4'>
                    <Menu onClick={()=> dispatch(toggleVisiblity())} cursor={Pointer}/>
                  </div>
                  <div className=' flex gap-3 justify-center items-center cursor-pointer' onClick={()=> navigate('/Home')}>
                    <Airplay  height={'36px'} width={'36px'} />
                    <span className='hidden text-sm md:text-lg sm:block'>Stream-App</span>
                  </div>
                </div>
                <div className='md:basis-2/4  basis-4/5	flex justify-center' >
                  <div className='w-full flex items-center '>
                    <div className='bg-red-400 w-full relative h-10 flex rounded-2xl me-4 '> 
                      <div className='w-full flex-wrap'>
                        <Input className=' bg-black border w-full rounded-2xl border-gray-300 text-white h-10'/>
                      </div>
                      <div className='absolute top-0 -right-2 border  border-gray-300 h-10 w-12 bg-black rounded-br-2xl rounded-tr-2xl flex justify-center items-center'>
                        <Search />
                      </div>
                    </div>
                  </div>
                </div>
                    <div className='md:basis-1/6 relative basis-1/5 flex justify-end'>
                      <div onClick={showAccount} className='cursor-pointer bg-black border border-gray-500  text-xl  font-medium rounded-2xl h-10 w-10 flex justify-center items-center'>
                          { show ? (<X/>) :  (userData && userData.username[0])}
                      </div>
                      <div className={`absolute top-14 w-[230px] ${show? "" : "hidden"}`}>
                        <Link to={'/Channel'}>
                          <AccountCard/>
                        </Link>
                      </div>
                    </div>
              </div>
          </div>
  )
}

export default Navbar
