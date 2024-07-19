import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./component/Navbar"
import { useState , useEffect  } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { currentUser } from "./redux/auth/auth"
import Aside from "./component/Aside"
import BottomBar from "./component/BottomBar"
import { useSelector } from 'react-redux'
function App() {

  const location = useLocation()
  const navigate = useNavigate()

  const visible = useSelector(state => state.auth.visible)

  const dispatch = useDispatch()

  // useEffect(()=>{
  //    const getData = async() =>{
  //       try {
  //           const res = await axios.get("http://localhost:8000/api/v1/user/getCurrentUser" ,{
  //             headers : {
  //               Authorization : 'Bearer' + localStorage.getItem('accessToken')
  //             }
  //           })
  //           if(res){
  //             dispatch(currentUser(res.data.user))
  //           }
  //       } catch (error) {
  //           console.log(error , "error when get current user")
  //       }
  //    }
  //    getData()
  // },[])
 
  return (
    <div className="h-screen w-full">
    
      {
        location.pathname !== "/" && (
          <div className="fixed z-20 w-full h-24" >
                <Navbar/>
          </div>
        )
      }
          <div className='flex  text-white h-screen w-full'> 
              {location.pathname !== "/" && (
                    <div className={`fixed z-10 sm:block ${visible? 'w-[220px]' : ''} `}>
                      <div className="w-full">
                            <Aside visible={visible}/>
                      </div>
                    </div>
                  )
                  }
                <div>
                    <div className="w-full h-screen">
                      <Outlet/>
                    </div>
              </div>
          </div>

        <div className=" sm:hidden fixed bottom-0 left-0 w-full">
           <BottomBar/>
        </div>
    </div>
  )
}

export default App
