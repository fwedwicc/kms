import React from 'react'
// import { Spinner } from './index'

const baseButton = 'flex items-center justify-center text-sm gap-2 px-3 py-1.5 border rounded-lg cursor-pointer transition duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed'
const primaryButton = 'bg-green-400 hover:bg-green-400/70 disabled:hover:bg-green-400 text-neutral-900'
const secondaryButton = 'bg-green-50 text-black'
const ghostButton = 'bg-transparent text-black hover:bg-green-50'

const Button = ({
  type = 'button',
  onClick,
  disabled = false,
  children,
  variant,
  className
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseButton} ${className} ${variant === 'primary' ? primaryButton : variant === 'secondary' ? secondaryButton : variant === 'ghost' ? ghostButton : null}`}
    >
      {/* {disabled && <Spinner />} */}
      {children}
    </button>
  )
}

export default Button