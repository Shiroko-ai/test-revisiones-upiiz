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
            <div>
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
              {placeholder}
            </label>
            <div className="mt-2">
              <input
                id={name}
                name={name}
                type={type}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary
                sm:text-sm sm:leading-6"
                onBlur={handleBlur}
                onChange={handleChange}
                value={value}
                {...rest}
              />
            </div>
          </div>
  )
}
