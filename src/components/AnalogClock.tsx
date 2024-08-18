"use client"
import { DateToDeg, displayTime } from '@/libs/time-function';
import { findCity } from '@/libs/timezone-function';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'

// const clkLabelRot = Array.from(Array(12).keys()).map((i) => {
//     return `rotate-[${180 + 30 * i}deg]`;
// })
const clkLabelRot = ["rotate-[180deg]","rotate-[210deg]","rotate-[240deg]","rotate-[270deg]","rotate-[300deg]","rotate-[330deg]"
                    ,"rotate-[0deg]","rotate-[30deg]","rotate-[60deg]","rotate-[90deg]","rotate-[120deg]","rotate-[150deg]"]


interface Prop{
    timezone:string;
}


export default function AnalogClock({timezone}:Prop) {
    const startTime = new Date().toLocaleTimeString("en-US",{timeZone: timezone,hour:"2-digit",minute:"2-digit",second:"2-digit"});
    const [country,city] = findCity(timezone);

    const [date, setDate] = useState(new Date());
    const [hh, setHH] = useState(startTime.substring(0,2));
    const [mm, setMM] = useState(startTime.substring(3,5));
    const [ss, setSS] = useState(startTime.substring(6,8));
    const [isDay,setIsDay] = useState(startTime.substring(9)=="AM");

    useEffect(() => {
        let curTime:string;
        const interval = setInterval(() => {
            curTime = new Date().toLocaleTimeString("en-US",{
                timeZone: timezone, 
                hour:"2-digit",
                minute:"2-digit",
                second:"2-digit"
            });
            setDate(new Date());
            setHH(curTime.substring(0,2));
            setMM(curTime.substring(3,5));
            setSS(curTime.substring(6,8));
            setIsDay(curTime.substring(9)=="AM");



            //Debug

            

        }, 1000)

        return () => clearInterval(interval);
    })

    return (
        <div className='flex flex-col items-center gap-4 w-[200px]'>
            <div className="relative rounded-full size-48 bg-slate-50 ring-[3px] ring-black flex justify-center items-center"


            >
                {clkLabelRot.map((deg) => (
                    <div className={`origin-top w-1 h-24 absolute top-[96px] left-[94px] pt-[80px] ${deg}`}
                    key={deg}
                    >
                        <div className='bg-black w-1 h-full rounded-full'></div>
                    </div>
                ))}


                <div className='rounded-full bg-black size-6'></div>

                <motion.div className='origin-top w-[1px] h-20 absolute top-24 left-[95.5px] bg-red-500 rounded-full'
                    initial={{ rotate: "180deg"}}
                    animate={{ rotate: `${180+DateToDeg(hh,mm,ss, "second")}deg` }}>
                </motion.div>
                <motion.div className='origin-top w-[2px] h-16 absolute top-24 left-[95px] bg-black rounded-full'
                    initial={{ rotate: "180deg" }}
                    animate={{ rotate: `${180+DateToDeg(hh,mm,ss, "minute")}deg` }}>
                </motion.div>
                <motion.div className='origin-top w-[6px] h-8 absolute top-24 left-[93px] bg-black rounded-full'
                    initial={{ rotate: "180deg" }}
                    animate={{ rotate: `${180+DateToDeg(hh,mm,ss, "hour")}deg` }}>
                </motion.div>


            </div>



            <div className='flex gap-[1px] text-white text-3xl'>
                <div className='w-12 py-2 px-1 bg-gradient-to-b from-gray-900 to-gray-600 rounded-l-md text-center'>{hh}</div>
                <div className='w-12 py-2 px-1 bg-gradient-to-b from-gray-900 to-gray-600 rounded-r-md text-center'>{mm}</div>
                <div className='w-12 py-2 px-1 bg-gradient-to-b from-gray-900 to-gray-600 rounded-md flex items-center justify-center ml-1 text-xl'>
                    {`${isDay?"AM":"PM"}`}
                </div>
            </div>
            <span className='text-center text-wrap font-bold'>{city}, {country}</span>
        </div>
    )
}
