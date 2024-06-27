import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import BottomBar from '../component/BottomBar'
import axios from 'axios'
import VideoCard from '../component/VideoCard'
function Home() {
  
  const [currentUser , setCurrentUser] = useState(null)
  const [allvideo , setAllvideo] = useState(null)
  useEffect(()=>{
     const getData = async() =>{
        try {
            const res = await axios.get("http://localhost:8000/api/v1/user/getCurrentUser" ,{
              headers : {
                Authorization : 'Bearer' + localStorage.getItem('accessToken')
              }
            })
            if(res){
              setCurrentUser(res.data.user)
            }
        } catch (error) {
            console.log(error , "error when get current user")
        }
     }
     
     const getAllvideos = async () =>{
       try {
           const res  = await axios.get('http://localhost:8000/api/v1/videos/getAllVideos',{
            headers : {
              Authorization : 'Bearer' + localStorage.getItem('accessToken')
            }
          })
          if(res){
            console.log(res.data.allvideo)
            setAllvideo(res.data.allvideo)
          }
       } catch (error) {
        
       }
     }
     getAllvideos()
     getData()
  },[])

  console.log(currentUser)
  console.log(allvideo)




  return (
    <div className='relative'>
        <div className="pb-10">
            <Navbar userData={currentUser}/>
        </div>
        <div className="fixed bottom-0 left-0 w-full">
           <BottomBar/>
        </div>
        <div>
          {
            allvideo && allvideo.map((item , id)=>(
              <VideoCard item={item} key={id}/>
            ))
          }
        </div>
  </div>
  )
}

export default Home

/* <div className="pb-10">
    <Navbar/>
    <VideoCard/>
    <VideoCard/>
    <VideoCard/>
    <VideoCard/>
    <VideoCard/>
    <VideoCard/>
    <VideoCard/>
</div>
  <div className="fixed bottom-0 left-0 w-full">
    <BottomBar/>
  </div> */
  /* <SignUp/> */
  /* <Login/> */