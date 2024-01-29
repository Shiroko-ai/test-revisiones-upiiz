'use client'
import { useState } from "react";
import IPNLogo from "../../../../public/Logo_IPN.png"
import Image from "next/image"
type FormProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  url: string;
};


export default function Form({ title, subtitle, children, url }: FormProps): JSX.Element {
  const [message, setMessage] = useState("");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    })
    const data = await response.json()
    console.log(data)
    setMessage(data.message)
  }
  return (
    <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border
 text-gray-700 shadow-lg px-52 py-16 justify-center items-center content-center ">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <h4 className="block font-sans text-2xl font-semibold 
      leading-snug tracking-normal text-blue-gray-900 antialiased">
            {title}
          </h4>
          {subtitle && (
            <h3 className="block font-sans text-xl  leading-snug tracking-normal 
            text-blue-gray-300 antialiased">
              {subtitle}
            </h3>
          )}

        </div>
        <div className="col-span-1">
          <Image src={IPNLogo} className="mx-auto block max-w-md" alt="VIGORE Logo" height='100' />
        </div>
      </div>
      <form className="mt-4 mb-2 w-full" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col">
          {children}
        </div>
        {message && (<p>{message}</p>)}
      </form>
    </div>
  )
}