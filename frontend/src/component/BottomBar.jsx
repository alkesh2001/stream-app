import { Home , Flame , GalleryVerticalEnd , Folder } from 'lucide-react'
import React from 'react'

function BottomBar() {
  return (
    <div className='bg-white py-5 border-t rounded-tr-3xl rounded-t-3xl border-gray-200'>
       <div className='flex justify-center gap-14'>
        <div><Home/></div>
        <div> <Flame /></div>
        <div> <GalleryVerticalEnd /></div>
        <div> <Folder /></div>
       </div>
    </div>
  )
}

export default BottomBar
