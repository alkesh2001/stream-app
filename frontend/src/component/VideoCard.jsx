import React from 'react'
import { Ellipsis } from 'lucide-react';
import { Link } from 'react-router-dom';

function VideoCard({item}) {
  return (
    <div className='px-2 mt-10'>
       <div className='grid gap-3'>
         <Link to="/PlayVideo" state={{ item }}>
           <div className='h-[160px] w-full bg-blue-500 rounded-3xl'>
                <img src={item.thumbnail} alt="" className='h-full w-full rounded-3xl'/>
           </div>
           <div className='flex gap-4 px-3 pt-3'>
               <div className='pt-1'>
                  <div className='bg-gray-200 font-medium text-md h-10 w-10 flex justify-center items-center rounded-2xl'>
                     {item.username[0]}
                  </div>
               </div>
               <div className='w-full'>
               <div className='flex justify-between'>
                  <div>{item.title}</div>
                  <div><Ellipsis/></div>
               </div>
               <div className=' flex gap-2 text-sm'>
                  <div>
                        {item.username}
                  </div>
                  <div className='text-sm'>{item.views} views</div>
                  <div>12 dec</div>
               </div>
               </div>
           </div>
         </Link>
       </div>
    </div>
  )
}

export default VideoCard
