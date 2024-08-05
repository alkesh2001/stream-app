import React, { useEffect, useState } from 'react'
import axios, { all } from 'axios'
import VideoCard from '../component/VideoCard'
import { useSelector , useDispatch } from 'react-redux'
import { currentUser } from '../redux/auth/auth'
function Home() {

  
  const [allvideo , setAllvideo] = useState(null)
  const dispatch = useDispatch()
  const [showVideo , setShowVideo] = useState(false)

  useEffect(()=>{
     const getData = async() =>{
        try {
            const res = await axios.get("https://stream-app-1.onrender.com/api/v1/user/getCurrentUser" ,{
              headers : {
                Authorization : 'Bearer' + localStorage.getItem('accessToken')
              }
            })
            if(res){
              dispatch(currentUser(res.data.user))
            }
        } catch (error) {
            console.log(error , "error when get current user")
        }
     }
     getData()
  },[])
 
  useEffect(()=>{
    setShowVideo(true)
     const getAllvideos = async () =>{
       try {
           const res  = await axios.get('https://stream-app-1.onrender.com/api/v1/videos/getAllVideos',{
            headers : {
              Authorization : `Bearer` + localStorage.getItem("accessToken")
            }
          })
          if(res){
            setShowVideo(false)
            setAllvideo(res.data.allvideo)
          }
       } catch (error) {
        console.log(error , "error when getall videos")
       }
     }
     getAllvideos()
  },[])
  console.log(allvideo)

  const visible = useSelector(state => state.auth.visible)

  return (
    <div className=' h-full w-full  text-white'>
          {showVideo ? (
            <div className='bg-gray-700  w-2/5 absolute top-1/3 left-1/3  text-white p-4 rounded-xl text-md grid gap-3 justify-center mt-4'>
              <div className='flex justify-center'>
                  <div className='h-6 w-6 rounded-full border-4 border-b-gray-700 animate-spin border-blue-400'> </div>
              </div>
              Please wait
            </div>
          ) : (
              <div className={`sm:absolute   ${visible? "left-[220px]" : "left-[140px]"} pt-16  h-full col-span-12 px-6 `}>
              <div className={`flex flex-wrap sm:justify-start justify-center`}>
                {
                  allvideo && allvideo.map((item , id)=>(
                    <div className=''>
                        <VideoCard item={item} key={id}/>
                    </div>
                  ))
                }
              </div>
           </div>
            )
          }
          
        </div>
  
  )
}

export default Home