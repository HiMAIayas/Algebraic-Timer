"use client"
import React from 'react'

export default function Footer() {
  return (
    <div className='bg-gray-800 w-full p-6 flex flex-col items-center text-gray-300'>
        <div onClick={() => window.open("https://github.com/HiMAIayas/Algebraic-Timer")} className='hover:text-gray-50 cursor-pointer'>-Github Repo-</div>
        <div>Copyright © 2024</div>
    </div>
  )
}
