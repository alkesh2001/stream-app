import { Outlet } from "react-router-dom"
import Navbar from "./component/Navbar"
import { useState , useEffect  } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginUser } from "./redux/auth/auth"
import Aside from "./component/Aside"
import BottomBar from "./component/BottomBar"
import { useSelector } from 'react-redux'
function App() {

  const location = useLocation()
  // const [currentUser , setCurrentUser] = useState(null)

  const visible = useSelector(state => state.auth.visible)

  const dispatch = useDispatch()

  useEffect(()=>{
     const getData = async() =>{
        try {
            const res = await axios.get("http://localhost:8000/api/v1/user/getCurrentUser" ,{
              headers : {
                Authorization : 'Bearer' + localStorage.getItem('accessToken')
              }
            })
            if(res){
              dispatch(loginUser(res.data.user))
            }
        } catch (error) {
            console.log(error , "error when get current user")
        }
     }
     getData()
  },[])

  return (
    <div>
      {
        location.pathname !== "/" && (
          <div className="fixed z-10 w-full">
                <Navbar/>
          </div>
        )
      }
      <div className='relative h-svh  text-white'>
        <div className='grid '>
          <div className={`hidden sm:block h-full ${visible? 'w-[210px]' : ' w-[80px] '} fixed `}>
          {
              location.pathname !== "/" && (
                <div className="">
                      <Aside visible={visible}/>
                </div>
              )
          } 
          </div>
          <div>
             <Outlet/>
          </div>
        </div>
        <div className=" sm:hidden fixed bottom-0 left-0 w-full">
           <BottomBar/>
        </div>
        </div>
    </div>
  )
}

export default App
