import React from 'react'

const baseInput = 'px-3 py-1.5 border w-ful rounded-xl transition duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed'

const InputText = ({
  type = 'text',
  name,
  disabled = false,
  placeholder = '',
  value = '',
  onChange,
  className,
}) => {
  return (
    <input
      type={type}
      name={name}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${className} ${baseInput}`}
    />
  )
}

export default InputText