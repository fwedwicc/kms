import React from 'react'

const Badge = ({ children, styles }) => {
  return (
    <div className={`inline-flex items-center gap-1.5 md:text-base text-sm px-2.5 py-1.5 rounded-full border leading-none ${styles}`}>
      {children}
    </div>
  )
}

export default Badge
