import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ThumbsUp ,ThumbsDown ,ChevronDown, Rss } from 'lucide-react';
import axios from "axios"
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';

function PlayVideo() {
   const location = useLocation()
   const {item} = location.state || {} ; 
   
   const [subscribe ,setSubscribe] = useState('')
   const [checkSub , setCheckSub] = useState()

  const visible = useSelector(state => state.auth.visible)

   const subs = async () =>{
     try {
       const res = await axios.post(`https://stream-app-1.onrender.com/api/v1/subscription/c/${item.owner}` , {},{
         headers : {
           Authorization : 'Bearer' + localStorage.getItem("accessToken")
          }
        })
        if(res){
          console.log(res)
          setSubscribe(prevSub => !prevSub)
         
        }
      } catch (error) {
        console.log(error, "error when user subscribe btn hit ")
      }
    }
    
    
    useEffect(()=>{
         const resdata = async () =>{
          try {
            const res = await axios.get(`https://stream-app-1.onrender.com/api/v1/user/c/${item.username}` ,{
              headers : {
                Authorization : 'Bearer' + localStorage.getItem("accessToken")
              }
            })

            if(res){
              console.log(res.data.res.isSubscribed)
              setCheckSub(res.data.res.isSubscribed)
            }
          } catch (error) {
             console.log(error , " error when user get susbcribed or not ")
          }
         }
         resdata()
    },[subscribe])

  return (
    <div className={`mb-24 ${visible? "md:ps-[200px]" : "sm:ps-[80px]"} `}>
      <div className=' h-full md:w-8/12 sm:px-7 pt-24  text-white'>
        <div className=' grid justify-left '>
          <div className='h-full  px-5  flex justify-center'>
          <ReactPlayer
              url={item.videoFile}
              controls={true}
              width="100%"
              height="100%"
            />
          </div>
          <div className='flex  w-full justify-between'>
            <div className='px-6 '>
                <div className='px-3 pt-2'>{item.title}</div>
                <div className='px-3  text-xs text-gray-500 '>{item.views} views </div>
            </div>
            <div className='flex justify-center gap-4 pt-3 px-10'>
              <div className='bg-black border border-gray-500 sm:h-10 sm:w-12 h-8 w-10 rounded-xl flex items-center justify-center'><ThumbsUp width={"18"}  stroke-width={"1"}/></div>
              <div className='pt-1 bg-black border border-gray-500 sm:h-10 md:w-12 h-8 w-10 rounded-xl flex items-center justify-center' > <ThumbsDown width={"18"} stroke-width={"1"}/></div>
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
              <span onClick={subs}  className='cursor-pointer rounded-full border border-gray-500 px-3 py-2 font-medium text-md'>
                  {checkSub ? "subscribed" : "susbcribe"}
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
    </div>
  )
}

export default PlayVideo
