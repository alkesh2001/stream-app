import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protect ({children , authentication = true}) {
    
    const navigate = useNavigate()
    const authStatus = useSelector(state=> state.auth.authStatus)

    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate('/')
        }else if(!authentication && authStatus !== authentication){
            navigate('/Home')
        }
    },[])

    return <>{children}</>
}
