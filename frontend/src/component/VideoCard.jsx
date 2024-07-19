import React, { useState } from 'react'
import { Ellipsis } from 'lucide-react';
import { Link } from 'react-router-dom';

function VideoCard({item}) {

   const [showCard , setShowCard] = useState(false);
  return (
    <div className='px-2 mt-10' >
       <div className='grid '>
         <Link to="/PlayVideo" state={{ item }}>
           <div className='h-[160px] w-full rounded-3xl'>
                <img src={item.thumbnail} alt="" className='h-full w-full rounded-3xl'/>
           </div>
         </Link>
           <div className='flex gap-4 px-3 pt-3'>
               <div className='pt-1'>
                  <div className='bg-black border font-medium text-md h-10 w-10 flex justify-center items-center rounded-2xl'>
                     {item.username[0]}
                  </div>
               </div>
               <div className='w-full'>
               <div className='flex relative justify-between'>
                  <div>{item.title.length > 22 ? `${item.title.substring(0 , 22)} ... ` : `${item.title}`}</div>
                  <div onClick={()=> setShowCard(!showCard)}> <Ellipsis/> </div>
                  <div className={`bg-gray-400 py-2 px-2 rounded-lg text-black font-medium text-sm absolute top-7 right-0 ${showCard ? "" : "hidden"}`}>
                     add to playList
                  </div>
               </div>
               <div className=' flex gap-2 text-sm text-gray-400'>
                  <div>
                     {item.username}
                  </div>
                  <div className='text-xs flex items-center'>{item.views} views</div>
                  <div className='text-xs flex items-center'>12 dec</div>
               </div>
               </div>
           </div>
       </div>
    </div>
  )
}

export default VideoCard
