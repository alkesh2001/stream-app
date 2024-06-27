import React from 'react'
import { Ellipsis } from 'lucide-react';

function VideoCard({item}) {
   console.log(item)
  return (
    <div className='px-5 mt-10'>
       <div className='grid gap-3'>
           <div className='h-48 w-full bg-blue-500 rounded-3xl'>
                <img src={item.thumbnail} alt="" className='h-full w-full rounded-3xl'/>
           </div>
           <div className='px-5'>
              <div className='flex justify-between'>
                 <div>{item.title}</div>
                 <div><Ellipsis/></div>
              </div>
              <div className='flex gap-5 pt-3'>
                 <div>{item.views}</div>
                 <div>12 dec</div>
              </div>
           </div>
       </div>
    </div>
  )
}

export default VideoCard
