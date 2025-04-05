import React from 'react'

const baseButton = 'flex items-center justify-center md:text-base text-sm gap-2 px-3 py-1.5 rounded-[9px] cursor-pointer transition duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed'
const primaryButton = 'bg-neutral-900 hover:bg-neutral-950 disabled:hover:bg-neutral-900 text-white'
const secondaryButton = 'bg-neutral-200 hover:bg-neutral-300 disabled:hover:bg-neutral-200 text-neutral-950' // temporary
const ghostButton = 'hover:bg-neutral-100 disabled:hover:bg-neutral-200 text-neutral-950'
const successButton = 'bg-neutral-900 hover:bg-neutral-950 disabled:hover:bg-neutral-900 text-white' // temporary
const infoButton = 'bg-neutral-900 hover:bg-neutral-950 disabled:hover:bg-neutral-900 text-white' // temporary
const dangerButton = 'bg-red-500/5 hover:bg-red-500/10 disabled:hover:bg-neutral-500/5 text-red-500'

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
      className={`${baseButton} ${className} ${variant === 'primary' ? primaryButton : variant === 'secondary' ? secondaryButton : variant === 'ghost' ? ghostButton : variant === 'success' ? successButton : variant === 'info' ? infoButton : variant === 'danger' ? dangerButton : ''}`}
    >
      {children}
    </button>
  )
}

export default Button