import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ThumbsUp ,ThumbsDown ,ChevronDown, Rss } from 'lucide-react';
import axios from "axios"
// import { useSelector } from 'react-redux';

function PlayVideo() {
   const location = useLocation()
   const {item} = location.state || {} ; 
   
   const subs = async () =>{
     try {
       const res = await axios.post(`http://localhost:8000/api/v1/subscription/c/${item.owner}` , {},{
         headers : {
           Authorization : 'Bearer' + localStorage.getItem("accessToken")
          }
        })
        if(res){
          console.log(res)
        }
      } catch (error) {
        console.log(error, "error when user subscribe btn hit ")
      }
    }
    
    const [subscribe ,setSubscribe] = useState(null)
    
    useEffect(()=>{
         const resdata = async () =>{
          try {
            const res = await axios.get(`http://localhost:8000/api/v1/user/c/${item.username}` ,{
              headers : {
                Authorization : 'Bearer' + localStorage.getItem("accessToken")
              }
            })
            setSubscribe(res.data.res.isSubscribed)
          } catch (error) {
             console.log(error , " error when user get susbcribed or not ")
          }
         }
         resdata()
    },[subscribe])

  return (
    <div className='h-full md:w-3/4 px-7 pt-24 text-white'>
      <div className=' grid justify-left'>
        <div className='h-full  px-5  flex justify-center'>
            <video width="full" height="full" className='rounded-2xl'controls >
                  <source src={item.videoFile} type="video/mp4"/>
            </video>
        </div>
        <div className='flex  w-full justify-between'>
          <div className='px-6 '>
              <div className='px-3 pt-2'>{item.title}</div>
              <div className='px-3  text-xs text-gray-500 '>{item.views} views </div>
          </div>
          <div className='flex justify-center gap-4 pt-3 px-10'>
             <div className='bg-black border border-gray-500 h-10 w-12 rounded-2xl flex items-center justify-center'><ThumbsUp height={'20px'}/></div>
             <div className='pt-1 bg-black border border-gray-500 h-10 w-12 rounded-2xl flex items-center justify-center' > <ThumbsDown height={'20px'} /></div>
          </div>
        </div>
        <div className='ps-7  w-full items-center flex justify-between'>
          <div className='mt-4 flex gap-4 items-center'>
            <div className='text-md rounded-2xl font-medium bg-gray-300 h-10 w-10 flex justify-center items-center '>
                {item.username[0]}
            </div>
            <div className='text-md font-medium'>
              {item.username}
            </div>
          </div>
          <div className='me-8  pt-3'>
             <span onClick={subs}  className='cursor-pointer rounded-full border border-gray-500 px-3 py-1 font-medium text-sm'>
                {/* {subscribe? "subscribed" : "susbcribe"} */}
             </span>
          </div>
        </div>
        <div className='w-full px-5 mt-4'>
          <div className='bg-black rounded-2xl p-4 px-6'>
            <div className='flex justify-between'>
               <div>des</div>
               <div><ChevronDown /></div>
            </div>
          </div>
        </div>
        <div className='font-medium text-lg w-11/12 px-7 m-4'>
          Comments
        </div>
      </div>
    </div>
  )
}

export default PlayVideo
