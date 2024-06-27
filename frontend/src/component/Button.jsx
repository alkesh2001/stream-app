import React from 'react'
import { forwardRef } from 'react'

const Button = forwardRef(function Button({
    className = "" ,
    value='',
    ...props
} , ref){
    return (
        <div> 
          <button ref={ref} {...props} className={`${className} text-black text-md`}>
            {value}
          </button>
        </div>
      )
})

export default Button
