'use client'
import { useState } from 'react'
import { Lato } from 'next/font/google'
type InputType = 'text' | 'password' | 'email' | 'number'

interface InputProps {
  type: InputType
  placeholder: string
  name: string
  [key: string]: any
}
const lato = Lato({ weight: '400', subsets: ['latin'], display: 'swap' })
export default function Input ({ type, placeholder, name, ...rest }: InputProps): JSX.Element {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const handleChange = (e: any): void => {
    const value = e.target.value
    if (value.startsWith(' ') === true) {
      console.log('no se puede')
      return
    }
    setValue(value as string)
  }
  const handleBlur = (e: any): void => {
    if (type === 'email') {
      const emailregex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
      if (!emailregex.test(e.target.value as string) && e.target.value !== '') {
        setError(true)
      } else {
        setError(false)
      }
    }
  }
  return (
    <div className="relative h-11 w-full min-w-[200px] mb-6">
      {error && <p className={`absolute bottom-[-20px] left-0 text-xs text-red-500 ${lato.className}`}>Correo inválido</p>}
      <input
        className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent
     px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0
     transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200
     placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary
     focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        placeholder=" "
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        {...rest}
      />
      <label className={`before:content[' '] after:content[' '] pointer-events-none absolute left-0
  -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400
  transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block
  before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200
  before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block
  after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200
  after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1]
  peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent
  peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight
   peer-focus:text-red-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary
    peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-red-900 peer-disabled:text-transparent
    peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 ${lato.className}`}>
        {placeholder}
      </label>
    </div>
  )
}
