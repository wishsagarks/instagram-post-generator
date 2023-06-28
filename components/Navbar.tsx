import React from 'react'
import { Router, useRouter } from 'next/router'

interface NavbarProps {
    activeLink: string;
}

const Navbar: React.FC<NavbarProps> = ({activeLink}) => {
    const router = useRouter()
  return (
    <div>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 mr-3"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                WishCodes
              </span>
            </a>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <div
                    onClick={()=>{router.push('/')}}
                    className={`block py-2 cursor-pointer pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:p-0 ${activeLink==='Home' ? 'text-blue-400' : 'text-white'}`}
                    aria-current="page"
                  >
                    Home
                  </div>
                </li>
                <li>
                  <div
                    onClick={()=>{router.push('/linkedin')}}
                    className={`block py-2 cursor-pointer pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:p-0 ${activeLink==='LinkedIn' ? 'text-blue-400' : 'text-white'}`}
                  >
                    LinkedIn
                  </div>
                </li>
                <li>
                  <div
                    onClick={()=>{router.push('/instagram')}}
                    className={`block py-2 cursor-pointer pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:p-0 ${activeLink==='Instagram' ? 'text-blue-400' : 'text-white'}`}
                  >
                    Instagram
                  </div>
                </li>
                <li>
                  <div
                    onClick={()=>{router.push('/stories')}}
                    className={`block py-2 cursor-pointer pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:p-0 ${activeLink==='Stories' ? 'text-blue-400' : 'text-white'}`}
                  >
                    Stories
                  </div>
                </li>
                <li>
                  <div
                    onClick={()=>{router.push('/contributors')}}
                    className={`block py-2 cursor-pointer pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:p-0 ${activeLink==='Contributors' ? 'text-blue-400' : 'text-white'}`}
                  >
                    Contributors
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </div>
  )
}

export default Navbar