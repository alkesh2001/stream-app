import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
function Stream() {

    const visible = useSelector(state => state.auth.visible)
  return (
    <div className='h-full w-full py-5'>
        <div className={`sm:absolute flex justify-between ${visible? "left-[220px]" : "left-[80px]"} pt-20  w-5/6 h-full col-span-12 px-6 `}>
            <div className='w-1/2 h-1/2 p-4 rounded-xl border border-white'>
                stream view 
            </div>
            <div className='h-4/5	 w-2/6  border border-white rounded-xl'>
                <div className='text-sm font-medium py-3 px-3'>hello this msg from user </div>
            </div>
        </div>
       </div>
  )
}

export default Stream
