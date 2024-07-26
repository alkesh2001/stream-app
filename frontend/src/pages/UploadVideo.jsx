import React, { useState } from 'react'
import Input from '../component/Input'
import axios from 'axios'
import { Upload , X } from 'lucide-react'
import Button from '../component/Button'
function UploadVideo({show , handleHide}) {


  const [title , setTitle ] = useState()
  const [description , setDescription] = useState(null)
  const [imageFile , setImageFile ] = useState(null)
  const [videoFile , setVideoFile] = useState(null)
  const [image , setImage ] = useState(null)
  const [isUploading, setIsUploading] = useState(false) 
  const [successfull , setSuccessfull] = useState(false)

  const uploadThumbnail = (e)=>{
      const file = e.target.files[0]
      const image = URL.createObjectURL(file)
      setImage(image)
      setImageFile(file)
  }
  
  const uploadVideo = async () =>{
    setIsUploading(true)
    if(!title , !description , !imageFile , !videoFile){
      setIsUploading(false)
    }
     try {
          const formData = new FormData();
          formData.append('title', title);
          formData.append('description', description);
          formData.append('thumbnail', imageFile);
          formData.append('videoFile', videoFile);

       const res = await axios.post("http://localhost:8000/api/v1/videos/uploadVideo",formData,
          {
            headers : {
              Authorization : "Bearer" + localStorage.getItem("accessToken")
            },
          })
            if(res){
              console.log(res)
            }
            setIsUploading(false)
            setSuccessfull(true)
     } catch (error) {
          console.log(error , "error when user upload a video")
          setIsUploading(false)
     }

  }

  return (

    <div className='h-full w-full relative pb-20'>
      <div className={` bg-gray-800 py-8 rounded-xl ${show ? "" : "hidden"}`}>
            <div onClick={handleHide} className='hover:bg-gray-600 h-10 w-10 rounded-full absolute top-4 right-4 flex justify-center items-center'>
              <X/>
            </div>
        {successfull ? ( 
          <div className=' w-full grid justify-center items-center'>
            <div className='text-center  '> 
              <div className='text-blue-400 text-xl mb-5'>
                video upload 
              </div>
              <div>return Home</div>
            </div>
          </div>
        ) : (
          <div className='bg-gray-800 h-full w-full rounded-xl '>
            <div className='px-10  py-4 left-0 flex justify-between'> 
              <div className='font-medium py text-lg'>
                  Details
              </div>
            </div>
            <div className={`h-full  w-full  px-6 sm:flex gap-2 `}>
              <div className='sm:w-3/5 w-full'>
                  <div className='w-full'>
                      <Input onChange={(e)=> setTitle(e.target.value)} className="text-white rounded-lg h-16 bg-gray-800  border-gray-400 border hover:border-white flex flex-row" placeholder="Title"/>
                  </div> 
                  <div className='w-full my-6'>
                    <textarea name="" onChange={(e)=> setDescription(e.target.value)} className="rounded-lg outline-none p-3 text-md font-medium  h-28 w-full bg-gray-800 border-gray-400 border hover:border-white " placeholder='Description'></textarea>
                  </div> 
                <div className=''>
                      <div className='h-32 flex justify-center my-5 sm:my-0 items-center rounded-md w-full sm:w-40 border-dashed border border-gray-500 '  style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <Input type="file" onChange={uploadThumbnail}   accept="image/png, image/jpg, image/jpeg, image/gif" id="thumbnail" className="hidden"/>
                        <label htmlFor="thumbnail">   
                          <Upload id='thumbnail'/>
                      </label>
                    </div>
                </div>
            </div>
            <div className='sm:w-2/5 w-full h-1/2  '>
              <div className='flex justify-center h-full w-full ' >
                <div className='h-44 sm:w-3/5 w-full rounded-xl bg-green-500 flex justify-center items-center'>
                  <Input type="file" onChange={(e)=> setVideoFile(e.target.files[0])} accept="video/mp4, video/webm, video/ogg" id="video" className="hidden"/>
                  <label htmlFor="video">   
                      <Upload id='video'/>
                  </label>
                </div>
              </div>
              <div className='flex justify-center sm:justify-end px-20 pt-5 sm:py-5 sm:pt-40'>
                <Button onClick={uploadVideo} value={'Uplaod'} className="bg-gray-600 hover:bg-black hover:text-white px-3 py-2 text-white font-medium rounded-xl"/>
              </div>
            </div>
          </div>
          </div>
        )}
        {isUploading && (
          <div className='bg-gray-700  w-2/5 absolute top-1/3 left-1/3  text-white p-4 rounded-xl text-md grid gap-3 justify-center mt-4'>
            <div className='flex justify-center'>
                <div className='h-6 w-6 rounded-full border-4 border-b-gray-700 animate-spin border-blue-400'> </div>
            </div>
            Please wait, video is uploading...
          </div>
        )}
        </div>
      </div>
  )
}

export default UploadVideo
