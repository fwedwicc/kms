import React from 'react'

const Badge = ({ children, styles, variant }) => {

  const baseStyles = 'inline-flex items-center gap-1.5 md:text-base text-sm px-2.5 py-1.5 rounded-full border leading-none'
  const defaultStyles = 'bg-neutral-100 text-neutral-800 border-neutral-300'
  const successStyles = 'bg-green-400/5 text-green-600 border-green-500/30'
  const infoyStyles = 'bg-blue-100 text-blue-800 border-blue-200'

  return (
    <div className={`${styles} ${baseStyles} ${variant === 'default' ? defaultStyles : variant === 'success' ? successStyles : variant === 'info' ? infoyStyles : ''}`}>
      {children}
    </div>
  )
}

export default Badge
