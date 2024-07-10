import React from 'react'

function ChannelCard({item}) {
  return (
    <div className='flex items-center gap-4 my-2'>
       <div className='border flex justify-center items-center font-medium h-8 w-8 rounded-full'>
       {item.channelFullName[0]}
       </div>
       <div className='font-medium'>
          {item.channelFullName}
       </div>
    </div>
  )
}

export default ChannelCard
