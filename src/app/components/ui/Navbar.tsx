'use client'
import { useState } from 'react'
import IPNSvg from './logos/IPNSvg'
import { usePathname } from 'next/navigation'
interface Props {
  links: Record<string, string>
  profilePage: string
  editPage: string
}
export default function Navbar ({ links, profilePage, editPage }: Props): JSX.Element {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMainOpen, setIsMainOpen] = useState(false)
  const handleDropdown = (): void => {
    setIsOpen(!isOpen)
  }
  const handleMainDropdown = (): void => {
    setIsMainOpen(!isMainOpen)
  }
  return (
        <nav className="bg-primary">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
                        {/* <!-- Mobile menu button--> */}
                        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-hover hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" onClick={handleMainDropdown}>
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Abrir menú principal</span>

                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>

                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <IPNSvg className="h-8 w-auto" stroke='#fff' fill='#6c1458'/>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {
                                   links !== undefined && Object.keys(links).map((key, index) => {
                                     return (
                                            <a key={index} href={links[key]} className={`${pathname === links[key] ? 'bg-hover text-white rounded-md px-3 py-2 text-sm font-medium' : 'text-gray-300 hover:bg-hover hover:text-white rounded-md px-3 py-2 text-sm font-medium'}`} aria-current="page">{key}</a>
                                     )
                                   })

                                }

                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* <!-- Profile dropdown --> */}
                        <div className="relative ml-3">
                            <div>
                                <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none  focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={handleDropdown}>
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-8 w-8 rounded-full" src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" alt="" />
                                </button>
                            </div>

                            {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}

                            <div className={`absolute right-0 z-10 mt-2 w-48 origin-top-right
                            rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5
                            focus:outline-none ${isOpen ? 'transform opacity-100 scale-100 transition ease-out duration-300' : 'transform opacity-0 scale-95 transition ease-in duration-75'}`}

                             role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" >
                            {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                            <a href={profilePage} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-0">Tu cuenta</a>
                            <a href={editPage} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-0">Editar información</a>
                            <a href="/logout" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2">Cerrar sesión</a>
                        </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Mobile menu, show/hide based on menu state. --> */}
            <div className={`sm:hidden ${isMainOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                    {
                        links !== undefined && Object.keys(links).map((key, index) => {
                          return (
                                    <a key={index} href={links[key]} className={`${pathname === links[key] ? 'bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'}`} aria-current="page">{key}</a>
                          )
                        })
                    }

                </div>
            </div>
        </nav>
  )
}
