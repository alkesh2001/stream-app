import React, { useState } from 'react'
import Input from '../component/Input'
import axios from 'axios'
import { Upload } from 'lucide-react'
import Button from '../component/Button'
function UploadVideo() {


  const [title , setTitle ] = useState()
  const [des , setDes] = useState(null)
  const [imageFile , setImageFile ] = useState(null)
  const [videoFile , setVideoFile] = useState(null)
  const [image , setImage ] = useState(null)

  const uploadThumbnail = (e)=>{
      const file = e.target.files[0]
      const image = URL.createObjectURL(file)
      setImage(image)
      setImageFile(file)
  }
  
  const uploadVideo = async () =>{
     try {
          
          const formData = new FormData();
          formData.append('title', title);
          formData.append('description', des);
          formData.append('thumbnail', imageFile);
          formData.append('videoFile', videoFile);


       const res = await axios.post("http://localhost:8000/api/v1/videos/uploadVideo",{
        formData
       },{
        headers : {
          Authorization : "Bearer" + localStorage.getItem("accessToken")
        }
       })
       if(res){
        console.log(res)
       }
     } catch (error) {
       console.log(error , "error when user upload a video")
     }
  }

  return (
    <div className='bg-gray-800 h-full  mb-4 w-full rounded-xl overflow-scroll'>
      <div className={` h-full  mb-4 w-full  p-6 flex gap-2 pt-8`}>
        <div className='w-3/5 '>
          <div className='p-2 font-medium text-lg'>
            Details
          </div>
            <div className='w-full '>
                <Input onChange={(e)=> setTitle(e.target.value)} className="text-white rounded-lg h-20 bg-gray-800  border-gray-400 border hover:border-white flex flex-row" placeholder="Title"/>
            </div> 
        
            <div className='w-full my-6'>
              <textarea name="" onChange={(e)=> setDes(e.target.value)} className="rounded-lg outline-none p-3 text-md font-medium  h-28 w-full bg-gray-800 border-gray-400 border hover:border-white " placeholder='Description'></textarea>
                  {/* <Input /> */}
            </div> 
           <div className=''>
                <div className='h-32 flex justify-center items-center rounded-md w-40 border-dashed border border-gray-500 '  style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <Input type="file" onChange={uploadThumbnail}   accept="image/png, image/jpg, image/jpeg, image/gif" id="thumbnail" className="hidden"/>
              <label htmlFor="thumbnail">   
                   <Upload id='thumbnail'/>
              </label>
                </div>
            </div>
        </div>
        <div className='w-2/5 h-full justify-center flex items-center'>
              <div className='h-1/2 w-3/5 rounded-xl bg-green-500 flex justify-center items-center'>
              <Input type="file" onChange={(e)=> setVideoFile(e.target.files[0])} accept="video/mp4, video/webm, video/ogg" id="video" className="hidden"/>
              <label htmlFor="video">   
                   <Upload id='video'/>
              </label>
                
              </div>
        </div>
       
      </div>
      <div className='flex justify-end px-20 pb-10'>
        <Button onClick={uploadVideo} value={'Uplaod'} className="bg-gray-600 px-3 py-2 text-white font-medium rounded-xl"/>
      </div>
      </div>
  )
}

export default UploadVideo
