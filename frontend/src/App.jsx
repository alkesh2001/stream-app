import { Outlet } from "react-router-dom"
import Navbar from "./component/Navbar"
import { useState , useEffect  } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"

function App() {

  const location = useLocation()
  const [currentUser , setCurrentUser] = useState(null)

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
     getData()
  },[])

  return (
    <div>
      {
        location.pathname !== "/" && (
          <div className="fixed z-10 w-full">
                <Navbar  userData={currentUser}/>
          </div>
        )
      }
     <Outlet/>
    </div>
  )
}

export default App
