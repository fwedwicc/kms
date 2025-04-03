import React from 'react'
// import { Spinner } from './index'

const baseButton = 'flex items-center justify-center md:text-base text-sm gap-2 px-3 py-1.5 border rounded-xl cursor-pointer transition duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed'
const primaryButton = 'bg-neutral-900 hover:bg-neutral-950 disabled:hover:bg-neutral-900 text-white'
const secondaryButton = 'bg-neutral-900 hover:bg-neutral-950 disabled:hover:bg-neutral-900 text-white' // temporary
const ghostButton = 'bg-neutral-900 hover:bg-neutral-950 disabled:hover:bg-neutral-900 text-white' // temporary

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