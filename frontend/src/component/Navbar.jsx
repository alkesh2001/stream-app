import React from 'react'
import {Search} from "lucide-react"

function Navbar({userData}) {
  return (
    <div className='w-full flex justify-center'>
       <div className=' max-w-screen-lg min-w-80	w-full'>
           <div className='bg-blue-500 w-full '>
              <div className='flex justify-between px-5 py-4'>
                <div className='bg-gray-200 rounded-2xl h-12 w-12 flex justify-center items-center'>
                     <Search/>
                </div>
                <div className='bg-gray-200 text-xl font-medium rounded-2xl h-12 w-12 flex justify-center items-center'>
                    {userData && userData.username[0]}
                </div>
              </div>
           </div>
       </div>
    </div>
  )
}

export default Navbar
