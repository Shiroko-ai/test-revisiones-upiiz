'use client'
import { useState } from 'react'
import IPNSvg from './logos/IPNSvg'
interface FormProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  url: string
}

export default function Form ({ title, subtitle, children, url }: FormProps): JSX.Element {
  const [message, setMessage] = useState('')
  async function handleSubmit (e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    console.log(data)
    setMessage(data.message as string)
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <IPNSvg
        className="mx-auto h-20 w-auto"
        stroke='#6c1458'
        fill='#fff'
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {title}
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit as any}>
    {children}
    <p className="mt-10 text-center text-sm text-gray-500">
    {message}
      </p>
      </form>

    </div>
  </div>

  )
}
