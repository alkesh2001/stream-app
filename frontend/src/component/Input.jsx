import React from 'react'
import { forwardRef } from 'react'

const Input = forwardRef(function Input({
     type = "text",
     className = '',
     ...props
} , ref ){
    return (
        <div>
           <input ref={ref} type={type} {...props} className={`${className} text-black rounded-lg px-3 h-10 text-md w-full outline-none `} />
        </div>
      )
})

export default Input
