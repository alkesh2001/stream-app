import React, { useEffect, useState } from 'react'
import axios from 'axios'
import VideoCard from '../component/VideoCard'
import { useSelector } from 'react-redux'

function Home() {

  
  const [allvideo , setAllvideo] = useState(null)
  useEffect(()=>{
     
     const getAllvideos = async () =>{
       try {
           const res  = await axios.get('http://localhost:8000/api/v1/videos/getAllVideos',{
            headers : {
              Authorization : `Bearer` + localStorage.getItem("accessToken")
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

  const visible = useSelector(state => state.auth.visible)

  return (
    <div className='relative h-svh  text-white'>
           <div className={`sm:absolute  ${visible? "left-[240px]" : "left-[24px]"} pt-16  h-full col-span-12 px-6 `}>
              <div className={`grid grid-cols-1    lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 `}>
                {
                  allvideo && allvideo.map((item , id)=>(
                    <div>

                    <VideoCard item={item} key={id}/>
                    <VideoCard item={item} key={id}/>
                    <VideoCard item={item} key={id}/>
                    <VideoCard item={item} key={id}/>
                    <VideoCard item={item} key={id}/>
                    </div>
                  ))
                }
              </div>
           </div>
        </div>
  
  )
}

export default Home