import React from 'react'
import { useLocation } from 'react-router-dom'
import { ThumbsUp ,ThumbsDown } from 'lucide-react';
function PlayVideo() {

   const location = useLocation()
   const {item} = location.state || {} ; 

    console.log(item)

  return (
    <div className='h-full w-full px-7 pt-24'>
      <div className='w-3/4 grid justify-left'>
        <div className='h-full w-11/12 px-5  flex justify-center'>
            <video width="full" height="full" className='rounded-2xl'controls >
                  <source src={item.videoFile} type="video/mp4"/>
            </video>
        </div>
        <div className='flex  w-11/12 justify-between'>
          <div className='px-6 '>
              <div className='px-3 pt-2'>{item.title}</div>
              <div className='px-3  text-sm text-gray-500 '>{item.views} views </div>
          </div>
          <div className='flex justify-center gap-4 pt-3 px-10'>
             <div className='bg-gray-300 h-10 w-12 rounded-2xl flex items-center justify-center'><ThumbsUp height={'20px'}/></div>
             <div className='pt-1 bg-gray-300 h-10 w-12 rounded-2xl flex items-center justify-center' > <ThumbsDown height={'20px'} /></div>
          </div>
        </div>
        <div className='ps-7  w-11/12 items-center flex justify-between'>
          <div className='mt-4 flex gap-4 items-center'>
            <div className='text-md rounded-2xl font-medium bg-gray-300 h-10 w-10 flex justify-center items-center '>
                {item.username[0]}
            </div>
            <div className='text-md font-medium'>
              {item.username}
            </div>
          </div>
          <div className='me-8  pt-3'>
             <span className='rounded-full border border-gray-500 px-3 py-1 font-medium text-sm'>
                subscribe
             </span>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default PlayVideo

// import React, { useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';

// function PlayVideo() {
//   const location = useLocation();
//   const { item } = location.state || {};
//   const videoRef = useRef(null);
//   const playerRef = useRef(null);

//   useEffect(() => {
//     if (!playerRef.current) {
//       playerRef.current = videojs(videoRef.current, {
//         controls: true,
//         responsive: true,
//         fluid: true,
//       });
//     } else {
//       playerRef.current.src({ src: item.videoFile, type: 'video/mp4' });
//     }

//     return () => {
//       if (playerRef.current) {
//         playerRef.current.dispose();
//         playerRef.current = null;
//       }
//     };
//   }, [item]);

//   return (
//     <div className='h-full w-full pt-6'>
//       <div className='h-1/4 w-full flex justify-center'>
//         <div data-vjs-player>
//           <video ref={videoRef} className='video-js vjs-big-play-centered' />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PlayVideo;
