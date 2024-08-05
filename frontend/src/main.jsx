import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider , createBrowserRouter} from "react-router-dom"
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import UploadVideo from './pages/UploadVideo.jsx'
import PlayVideo from './pages/PlayVideo.jsx'
import store from './redux/store/store.js'
import { Provider} from 'react-redux'
import Protect from './component/ProtectCompo.jsx'
import AccountCard from './component/AccountCard.jsx'
import Channel from './pages/Channel.jsx'
import Stream from './pages/Stream.jsx'


const router = createBrowserRouter([
  {
     path : '/',
     element :(
         <Protect authentication>
           <App/>
         </Protect>
     ) ,
     children : [
       {
         path : '/',
         element : (
           <Protect authentication={false}>
                <Login/>
           </Protect>
           ) 
       },
      {
        path : "/Home" ,
        element :(
          <Protect authentication>
               {''}
               <Home/>
          </Protect>
          ) 
      } ,
      {
        path : "/Upload",
        element : <UploadVideo/>
      },
      {
        path : "/Channel" ,
        element : (
          <Protect authentication>
            {''}
            <Channel/>
          </Protect>
        )
      },
      {
        path : "/AccountCard" ,
        element : <AccountCard/>
      },
      {
        path : "/PlayVideo" ,
        element :(
          <Protect authentication>
            {''}
            <PlayVideo/>
          </Protect>
          ) 
      },
      {
        path : "/Stream" ,
        element :(
          <Protect authentication>
            {''}
            <Stream/>
          </Protect>
          ) 
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
