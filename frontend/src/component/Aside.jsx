import React, { useEffect, useState } from 'react'
import { Flame , History , GalleryVerticalEnd ,Clock9, ArrowLeft } from 'lucide-react'
import ChannelCard from './ChannelCard'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleVisiblity } from '../redux/auth/auth';
function Aside() {

   const [subscribedCh , setSubscribedCh] = useState();


  const visible = useSelector(state => state.auth.visible)

  useEffect(()=>{
     const getSubCh = async ()=>{
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/subscription/u/666be4be8b1ff98efaa556ef`,{
          headers :{
            Authorization : "Bearer" + localStorage.getItem("accessToken")
          }   
        })
        setSubscribedCh(res.data.channelList)
      } catch (error) {
        console.log(error , "error when user getSubscribed channel list")
      }
     }

     getSubCh()
   },[])

  return (
    <div className={`h-screen bg-black pt-20 `}>
      {/* <div className='absolute top-10 left-10' onClick={()=> dispatch(toggleVisiblity())}>
        <ArrowLeft/>
      </div> */}
      <div className='border-b pb-3 border-gray-600 px-2'>
        <div className='px-4 py-4 font-medium text-md flex hover:bg-gray-200 rounded-lg hover:text-black gap-4'> 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        <span className={`${visible ? "" : "hidden"}`}>Home</span>
        </div>
        <div className='px-4 py-4 font-medium text-md flex gap-4 bg-black hover:bg-gray-200 rounded-lg hover:text-black '><Flame/><span className={`${visible ? "" : "hidden"}`}>tranding</span></div>
      </div>
      <div className='border-b border-gray-600 px-2 py-3'>
        <div className='px-4 py-4 font-medium text-md flex gap-4 hover:bg-gray-200 rounded-lg hover:text-black'><History /><span className={`${visible ? "" : "hidden"} `}> History</span></div>
        <div className='px-4 py-4 font-medium text-md flex gap-4 hover:bg-gray-200 rounded-lg hover:text-black'><GalleryVerticalEnd /><span className={`${visible ? "" : "hidden"}`}>Playlist</span></div>
        <div className='px-4 py-4 font-medium text-md flex gap-4 hover:bg-gray-200 rounded-lg hover:text-black '><Clock9 /><p className={`${visible ? "" : "hidden"} cursor-pointer`}>watch later</p></div>
      </div>
      <div className={` border-gray-600 ${visible ? "" : "hidden"} px-4 py-3` }>
        <div className='px-2'>
          subscribed
        </div>
        <div className='pt-3'>
          {
            subscribedCh && subscribedCh.map((item)=> (
              <ChannelCard key={item._id} item={item}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Aside
