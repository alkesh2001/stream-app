import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UploadVideo from './UploadVideo'
function Channel() {

  const visible = useSelector(state => state.auth.visible)
  const userData = useSelector(state=> state.auth.userData)
  const navigate = useNavigate()

  return (
    <div className={`text-white font-medium pt-20 relative  ${visible? "ps-[150px]" : "px-[80px]"}`}>
        <div className='flex gap-5 py-5 border-b border-gray-700 px-32 '>
           <div className='bg-orange-600 h-32 w-32 rounded-full flex justify-center items-center font-semibold text-5xl'>{userData && userData.username[0]}</div>
            <div className='flex items-center  gap-3'>
                <div className=''>
                    <div className='font-medium text-lg'>{userData && userData.username}</div>
                    <div className='font-medium text-sm'>{userData && userData.email}</div>
                    <div className='bg-gray-700  text-sm font-medium rounded-2xl   px-1 py-1 mt-4'>
                        Manage Video
                        <div className='absolute top-32 left-52 w-4/6 h-3/4	   '>
                            <UploadVideo /> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='h-44 border-b py-4 border-gray-700 px-40'>
             PlayList
        </div>
        <div className='h-44 px-40 py-4'>
            user subscription
        </div>
    </div>      
  )
}

export default Channel