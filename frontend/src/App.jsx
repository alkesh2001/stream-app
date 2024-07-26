import { Outlet} from "react-router-dom"
import Navbar from "./component/Navbar"
import { useLocation } from "react-router-dom"
import Aside from "./component/Aside"
import BottomBar from "./component/BottomBar"
import { useSelector } from 'react-redux'
function App() {

  const location = useLocation()

  const visible = useSelector(state => state.auth.visible)
 
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
                    <div className={`fixed z-10 sm:block hidden ${visible? 'w-[220px]' : ''} `}>
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

        {
          location.pathname !== '/' && (
            <div className=" sm:hidden fixed bottom-0 left-0 w-full">
              <BottomBar/>
            </div>
          )
        }
    </div>
  )
}

export default App

