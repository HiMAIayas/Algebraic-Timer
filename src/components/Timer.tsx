"use client"

import React, { useState } from 'react'
import { displayTime } from '@/libs/time-function';


export default function Timer() {
    const [millisec, setMillisec] = useState(0);
    const [sec, setSec] = useState(0);
    const [min, setMin] = useState(0);
    const [hour, setHour] = useState(0);
    const [day, setDay] = useState(0);

    const [input, setInput] = useState("t");
    

    return (
        <div>
            {/* Function input */}
            <div className='px-24'>
                <label htmlFor="equation" className="text-sm font-medium leading-6 text-gray-900">Enter Equation</label>
                <div className="relative mt-2 rounded-md shadow-sm flex">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm italic">	&fnof;(t) = </span>
                    </div>
                    <input type="text" name="equation" id="equation" className="w-full rounded-md border-0 py-1.5 pl-14 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    placeholder="t">
                    </input>
                    <button className='ml-1 p-1.5 rounded-md bg-indigo-300 text-sm text-nowrap'>Check Availability</button>
                </div>
            </div>

            {/* Timer */}
            <div className='flex text-5xl w-full justify-center mt-10 gap-3 font-digital'>
                
                <div className='flex flex-col items-center'>
                    <span>{displayTime(day,3)}</span>
                    <span className='text-sm'>day</span>
                </div>

                <span>:</span>

                <div className='flex flex-col items-center'>
                    <span>{displayTime(hour,2)}</span>
                    <span className='text-sm'>hr</span>
                </div>

                <span>:</span>

                <div className='flex flex-col items-center'>
                    <span>{displayTime(min,2)}</span>
                    <span className='text-sm'>min</span>
                </div>

                <span>:</span>

                <div className='flex flex-col items-center'>
                    <span>{displayTime(sec,2)}</span>
                    <span className='text-sm'>sec</span>
                </div>

                <span className='text-sm'>.{displayTime(millisec,2)}</span>
            </div>




        </div>
    )
}
