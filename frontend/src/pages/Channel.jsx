import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UploadVideo from './UploadVideo'
function Channel() {

  const userData = useSelector(state=> state.auth.userData)

  const visible = useSelector(state => state.auth.visible)
  const navigate = useNavigate()

  const [show , setShow] = useState(false)

  const toggleshow = () =>{
    setShow(prevShow => !prevShow)
  }

  const handleHide = ()=>{
    setShow(false)
  }

  return (
    <div className={`text-white font-medium absolute w-full h-full pt-20 ${visible? "ps-[200px]" : "ps-[80px]"} `}>
        <div className='flex gap-5 py-5 border-b border-gray-700 px-24'>
           <div className='bg-orange-600 h-32 w-32 rounded-full flex justify-center items-center font-semibold text-5xl'>{userData && userData.username[0]}</div>
            <div className='flex items-center  gap-3'>
                <div className=''>
                    <div className='font-medium text-lg'>{userData && userData.username}</div>
                    <div className='font-medium text-sm'>{userData && userData.email}</div>
                    <div className='flex gap-5'>
                        <div className='bg-gray-700 flex gap-5 text-sm font-medium rounded-2xl   px-3 py-1 mt-4 cursor-pointer' onClick={toggleshow}>Manage Video</div>
                        <div className='bg-gray-700 flex gap-5 text-sm font-medium rounded-2xl   px-3 py-1 mt-4 cursor-pointer' onClick={()=> navigate('/Stream')}>Stream</div>
                        <div className={`absolute top-32  ${visible? "left-[300px]" : "left-[250px]"} w-4/6 h-3/4 ${show? "" : "hidden"}`}>
                            <UploadVideo show={show} handleHide={handleHide}/> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='h-44 border-b py-4 border-gray-700 px-32'>
             PlayList
        </div>
        <div className='h-44 px-32 py-4'>
            user subscription
        </div>
    </div>      
  )
}

export default Channel
