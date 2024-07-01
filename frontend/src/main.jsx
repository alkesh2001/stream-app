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


const router = createBrowserRouter([
  {
     path : '/',
     element : <App/>,
     children : [
      {
        path : "/Home" ,
        element : <Home/>
      } ,
      {
        path : '/',
        element : <Login/>
      },
      {
        path : "/upload" ,
        element : <UploadVideo/>
      },
      {
        path : "/PlayVideo" ,
        element : <PlayVideo/>
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
