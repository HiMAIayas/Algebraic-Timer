"use client"
import { DateToDeg } from '@/libs/time-function';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'

// const clkLabelRot = Array.from(Array(12).keys()).map((i) => {
//     return `rotate-[${180 + 30 * i}deg]`;
// })
const clkLabelRot = ["rotate-[180deg]","rotate-[210deg]","rotate-[240deg]","rotate-[270deg]","rotate-[300deg]","rotate-[330deg]"
                    ,"rotate-[0deg]","rotate-[30deg]","rotate-[60deg]","rotate-[90deg]","rotate-[120deg]","rotate-[150deg]"]


export default function AnalogClock() {

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
            //Debug
            console.log("Sec:"+date.getSeconds()+" => "+DateToDeg(date,"second"))
            console.log("Min:"+date.getMinutes()+" => "+DateToDeg(date,"minute"))
            console.log("Hr:"+date.getHours()+" => "+DateToDeg(date,"hour"))
            console.log('\n');
            

        }, 1000)

        return () => clearInterval(interval);
    })

    return (
        <div>
            <div className="relative rounded-full size-48 ring-[3px] ring-gray-400"


            >
                {clkLabelRot.map((deg) => (
                    <div className={`origin-top w-1 h-24 absolute top-[96px] left-[94px] pt-[80px] ${deg} bg-lime-100`}
                    key={deg}
                    >
                        <div className='bg-gray-400 w-1 h-full'></div>
                    </div>
                ))}


                


                <motion.div className='origin-top w-[2px] h-20 absolute top-24 left-[94px] bg-black rounded-full'
                    animate={{ rotate: `${180+DateToDeg(date, "second")}deg` }}>
                </motion.div>
                <motion.div className='origin-top w-[3px] h-12 absolute top-24 left-[93px] bg-blue-500 rounded-full'
                    initial={{ rotate: "180deg" }}
                    animate={{ rotate: `${180+DateToDeg(date, "minute")}deg` }}>
                </motion.div>
                <motion.div className='origin-top w-1 h-8 absolute top-24 left-[92px] bg-red-500 rounded-full'
                    initial={{ rotate: "180deg" }}
                    animate={{ rotate: `${180+DateToDeg(date, "hour")}deg` }}>
                </motion.div>


            </div>

            <div className='relative bg-slate-200 size-[192px] mt-10 ring-1 ring-black border-black'>
                <div className='bg-blue-300 h-[96px]'></div>
                <div className='absolute top-[96px] left-[96px] w-[4px] h-[96px] bg-red-500 z-50'></div>
            </div>
        </div>
    )
}
