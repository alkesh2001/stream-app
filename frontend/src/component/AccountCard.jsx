import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../redux/auth/auth'
function AccountCard() {
 
   const userData = useSelector(state=> state.auth.userData)
   const navigate = useNavigate()
   const dispatch = useDispatch()
  return (
    <div className='bg-gray-800 rounded-lg pt-2 pb-4 px-3'>
      <div className='flex items-center gap-4'>
          <div className='bg-gray-400 h-9 w-9 rounded-full flex items-center justify-center'>{userData && userData.username[0]}</div>
        <div className=''>
             <div className='font-medium text-md'>{userData && userData.username}</div>
             <div className='font-medium text-xs '>{userData && userData.email}</div>
             <div className='cursor-pointer underline text-blue-600 text-sm font-medium'>
               Account Details
             </div>
        </div>
      </div>
      <div onClick={ async ()=>{
               await axios.post("http://localhost:8000/api/v1/user/logout",{},{
                  headers :{
                    Authorization : "Bearer" + localStorage.getItem("accessToken")
                  }
                })
                dispatch(logoutUser())
                navigate('/')
            }
      }
      className='text-md font-medium flex pt-5 justify-center cursor-pointer'>
        Logout
      </div>
    </div>
  )
}

export default AccountCard
