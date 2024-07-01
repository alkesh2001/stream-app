import React from 'react'
import { Flame , History , GalleryVerticalEnd ,Clock9 } from 'lucide-react'
function Aside({visible}) {
  return (
    <div className='px-2  pt-4'>
      <div className='px-4 py-4 font-medium text-md flex gap-4'> 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
       <span className={`${visible ? "" : "hidden"}`}>Home</span>
       </div>
      <div className='px-4 py-4 font-medium text-md flex gap-4'><Flame/><span className={`${visible ? "" : "hidden"}`}>tranding</span></div>
      <div className='px-4 py-4 font-medium text-md flex gap-4'><History /><span className={`${visible ? "" : "hidden"}`}>watch History</span></div>
      <div className='px-4 py-4 font-medium text-md flex gap-4'><GalleryVerticalEnd /><span className={`${visible ? "" : "hidden"}`}>Playlist</span></div>
      <div className='px-4 py-4 font-medium text-md flex gap-4'><Clock9 /><span className={`${visible ? "" : "hidden"}`}>watch later</span></div>
    </div>
  )
}

export default Aside
