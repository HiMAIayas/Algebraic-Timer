"use client"

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react'



const links = [
  { title: "Timer", href: "/", icon: "./timer.png" },
  { title: "Global Time", href: "/globaltime", icon: "./global-time.png" },
  { title: "Time Stat", href: "/timestat", icon: "./stat.png" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='fixed z-10 w-full'>

      {/* Header */}
      <div className='relative z-20 h-10 md:h-14 px-5 md:px-24 flex justify-between items-center bg-white text-black shadow-md'>

        {/* Hamburgur */}
        <div className='flex md:hidden p-1 justify-center items-center'
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className='flex flex-col justify-center items-center gap-1 hover:bg-slate-200 size-7 rounded-md'>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M4 18H10" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
                <path d="M4 12L16 12" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
                <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
              </g>
            </svg>
          </div>
        </div>


        <div className='text-xl font-bold'>Algebraic Timer</div>

        <div className='flex items-center'>
          <div className=' hidden md:flex pr-24 gap-5'>
            {links.map(({ title, href, icon }) => (
              <div className='hover:bg-slate-200 flex justify-center items-center gap-1 p-2 rounded-md'
                key={title}
              >
                <img className="size-[15px]" src={icon}></img>
                <Link href={href}>{title}</Link>
              </div>
            ))}
          </div>
          <div className='rounded-md hover:bg-slate-200'>Theme</div>
        </div>
      </div>


      {/* Sidebar */}
      <AnimatePresence>
      {isOpen && (
        <motion.div className='absolute left-0 top-10 backdrop-blur-sm w-full h-screen flex justify-start'
          onClick={() => setIsOpen(false)}>

          <motion.div className='py-10 w-[200px] bg-white'
          initial={{translateX:"-200px"}}
          animate={{translateX:"0px"}}
          exit={{translateX:"-200px"}}
          transition={{ease:'easeInOut', duration:0.4}}
          >
            <div className='flex flex-col items-center w-full'>

              {links.map(({ title, href, icon }) => (
                <div className='hover:bg-slate-200 flex justify-center gap-1 p-2 w-full'
                  key={title}
                >
                  <div className='flex justify-start w-32 gap-1'>
                    <div className='flex items-center justify-center'>
                      <img className="size-[15px]" src={icon}></img>
                    </div>
                    <Link href={href}>{title}</Link>
                  </div>

                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  )
}
