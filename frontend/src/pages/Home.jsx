import React, { useEffect, useState } from 'react'
import BottomBar from '../component/BottomBar'
import axios from 'axios'
import VideoCard from '../component/VideoCard'
import Aside from '../component/Aside'
import { useSelector } from 'react-redux'


function Home() {
  
  const [allvideo , setAllvideo] = useState(null)
  useEffect(()=>{
     
     const getAllvideos = async () =>{
       try {
           const res  = await axios.get('http://localhost:8000/api/v1/videos/getAllVideos',{
            headers : {
              Authorization : 'Bearer' + localStorage.getItem('accessToken')
            }
          })
          if(res){
            setAllvideo(res.data.allvideo)
          }
       } catch (error) {
        console.log(error , "error when getall videos")
       }
     }
     getAllvideos()
  },[])

  const visible = useSelector(state => state.visibility.visible)

  return (
    <div className='relative h-svh  text-white'>
        <div className='grid  pt-16'>
          <div className={`hidden sm:block h-full ${visible? 'w-[210px]' : ' w-[80px] '} fixed bg-black `}>
             <Aside visible={visible}/>
          </div>
           <div className={`sm:absolute  ${visible? "" : "left-[145px]"}  top-20 left-52 h-full col-span-12 px-6 `}>
              <div className={`grid grid-cols-1    lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 `}>
                {
                  allvideo && allvideo.map((item , id)=>(
                    <VideoCard item={item} key={id}/>
                  ))
                }
              </div>
           </div>
        </div>

        <div className=" sm:hidden fixed bottom-0 left-0 w-full">
           <BottomBar/>
        </div>
        <div className='pb-20'>
        </div>
  </div>
  )
}

export default Home