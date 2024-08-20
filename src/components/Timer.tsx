"use client"

import React, { useEffect, useRef, useState } from 'react'
import { displayTime, displayToSec, secToDisplay } from '@/libs/time-function';
import { evaluate, parser } from 'mathjs';
import YearTimer from './YearTimer';
import { motion } from 'framer-motion';
import EquationGraph from './EquationGraph';


//Note: text-wdith = 0.45*font-size(text height)

export default function Timer() {
    const [timer, setTimer] = useState({
        isPositive: true,
        ms: 0,
        sec: 0,
        min: 0,
        hour: 0,
        day: 0,
        year: 0
    });
    const previousTimer = useRef({
        hour:0,
        min:0,
        sec:0
    })
    const [phase, setPhase] = useState("default"); //default stop running end

    const time_n = useRef(0); // end point | n in f(n)
    const time_t = useRef(0);

    const equation = useRef("t");
    const [datapoint, setDatapoint] = useState({
        x: new Float64Array(),
        y1: new Float64Array(),
        y2: new Float64Array(),
    })





    function checkAvalability(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();
        console.log("Check");
        const formData = new FormData(event.currentTarget)

        equation.current = formData.get("equation") as string;
        if (equation.current === "") equation.current = "t";
        time_n.current = displayToSec(timer);

        const pars = parser();
        let isReady = true;

        let xArr = new Float64Array(100);
        let y1Arr = new Float64Array(100);
        let y2Arr = new Float64Array(100);

        let fn=0;
        previousTimer.current = {hour:timer.hour, min:timer.min, sec:timer.sec}
        try {
            pars.evaluate(`f(t)=${equation.current}`);
            fn = pars.evaluate(`f(${time_n.current})`);
            setTimer(secToDisplay(fn - pars.evaluate(`f(0)`)));

            
        } catch (error) {
            isReady = false;
            console.log(error);
        }

        if (isReady) {
            let x_val:number;
            let y1_val:number;

            for (let i=0; i<101; i++){

                try {
                    x_val = i*time_n.current/100;
                    y1_val = pars.evaluate(`f(${x_val})`);

                    xArr[i] = x_val;
                    y1Arr[i] = y1_val;
                    y2Arr[i] = fn-y1_val;

                } catch (error) {
                    
                }



            }

            setDatapoint({x:xArr, y1:y1Arr, y2:y2Arr})
            time_t.current = 0;
            setPhase("stop");
        }
    }

    function handleOnChange(value: string, segment: string) { //We not accept day input. Who the fuck are gonna set timer for days?
        if (Number(value) > 99) value = value.substring(0, 2);
        else if (Number(value) > 59 && segment != "hour") value = "59";
        else if (Number(value) > 23 && segment === "hour") value = "23";

        switch (segment) {
            case "hour": setTimer({ ...timer, hour: Number(value) }); break;
            case "min": setTimer({ ...timer, min: Number(value) }); break;
            case "sec": setTimer({ ...timer, sec: Number(value) }); break;
            case "ms": setTimer({ ...timer, ms: Number(value) }); break;
            default: break;

        }
    }

    function toggleTimer() {
        if (phase === "stop") setPhase('running');
        else if (phase === "running") setPhase("stop");
    }

    function reset() {
        
        setTimer({ isPositive: true, ms: 0, sec: previousTimer.current.sec, min: previousTimer.current.min, hour: previousTimer.current.hour, day: 0, year: 0 });
        setPhase('default');
    }


    useEffect(() => { //TODO: use Date.now() to track time instead of manual timer. 
        const pars = parser();
        let interval: NodeJS.Timeout | undefined = undefined;
        let fn: number;
        let time_at_start = Date.now();
        let time_elapsed = time_t.current;


        if (phase === "running") {
            pars.evaluate("f(t)=" + equation.current);
            fn = pars.evaluate(`f(${time_n.current})`);

            interval = setInterval(() => {
                if (time_t.current >= time_n.current) {
                    setTimer({ isPositive: true, ms: 0, sec: 0, min: 0, hour: 0, day: 0, year: 0 });
                    setPhase("end");
                }
                else {
                    time_t.current = (Date.now()-time_at_start)/1000 + time_elapsed;

                    try {
                        setTimer(secToDisplay(fn - pars.evaluate(`f(${time_t.current})`)));
                    } catch (error) {
                        setTimer({isPositive:true, ms:0, sec:0, min:0, hour:0, day:0, year:0});
                    }
                    
                    
                }
            }, 50);
        }
        else if (interval != undefined) {
            clearInterval(interval);

        }

        return () => clearInterval(interval);
    }, [phase])



    return (
        <div>
            <form onSubmit={checkAvalability}>
                {/* Function input */}
                <div className='sm:px-12 md:px-24 lg:px-48'>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="equation" className="text-sm font-medium leading-6 text-gray-900">Enter Equation</label>
                        <div className='relative group'>
                            <img src="./images/question.png" className='size-[20px]'></img>
                            <div className='absolute top-0 -right-48 w-48 px-2 z-40'>
                            <div className='p-3 rounded-lg bg-[#eceee1] hidden group-hover:block text-sm'>
                                Function f(t) determines display of time.
                                Keywords: sin, cos, tan, cosec, sec, cot, log, e, sqrt, pi, abs.
                            </div>
                            </div>
                        </div>
                        

                    </div>
                    
                    {/* Equation Input tag*/}
                    <div className="relative mt-2 rounded-md shadow-sm flex">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm italic">	&fnof;(t) = </span>
                        </div>
                        <input className="w-full rounded-md border-0 py-1.5 pl-14 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            type="text" name="equation" id="equation"
                            placeholder="t">
                        </input>

                    </div>
                </div>

                {/* Timer */}
                <div className='flex text-5xl sm:text-7xl w-full justify-center items-center pt-28 pb-16 font-digital-mono'>



                    <motion.div className='relative flex flex-col gap-10 items-center' layout
                    >
                        {!timer.isPositive && (
                            <span className='absolute -left-10'>-</span>
                        )}


                        {/* year */}
                        {timer.year != 0 && (
                            <div className='flex'>
                                <div className='flex flex-col items-center ml-2'>
                                    <YearTimer year={timer.year}></YearTimer>
                                    <span className='text-lg'>year</span>
                                </div>
                            </div>
                        )}

                        {/* day */}
                        {(timer.day != 0) && (
                            <div className='flex'>
                                <div className='flex flex-col items-center ml-2'>
                                    <div className='bg-transparent p-1'>{displayTime(timer.day, 3)}</div>
                                    <span className='text-lg'>day</span>
                                </div>
                            </div>
                        )}



                        {/* hr/min/sec */}
                        {timer.year === 0 && (
                            <div className='flex'>

                                <div className='flex flex-col items-center'>
                                    <input className={`placeholder:text-black bg-transparent p-1 w-[55px] sm:w-[75px] border-transparent border-[1px] ${phase==="default"? "hover:border-black rounded-md":""}`}
                                        type='number' max={23} min={0}
                                        onChange={(event) => handleOnChange(event.target.value, "hour")}
                                        value={displayTime(timer.hour, 2)}
                                        disabled={phase==="default"? false:true}
                                    ></input>
                                        
                                    <span className='text-lg'>hr</span>
                                </div>

                                <span>:</span>

                                <div className='flex flex-col items-center'>
                                    <input className={`placeholder:text-black bg-transparent p-1 w-[55px] sm:w-[75px] border-transparent border-[1px] ${phase==="default"? "hover:border-black rounded-md":""}`}
                                        type='number' max={59} min={0}
                                        onChange={(event) => handleOnChange(event.target.value, "min")}
                                        value={displayTime(timer.min, 2)}
                                        disabled={phase==="default"? false:true}
                                    ></input>
                                    <span className='text-lg'>min</span>
                                </div>

                                <span>:</span>

                                <div className='flex flex-col items-center'>
                                    <input className={`placeholder:text-black bg-transparent p-1 w-[55px] sm:w-[75px] border-transparent border-[1px] ${phase==="default"? "hover:border-black rounded-md":""}`}
                                        type='number' max={59} min={0}
                                        onChange={(event) => handleOnChange(event.target.value, "sec")}
                                        value={displayTime(timer.sec, 2)}
                                        disabled={phase==="default"? false:true}    
                                    ></input>
                                    <span className='text-lg'>sec</span>
                                </div>

                                <span className='absolute -right-10 text-xl sm:text-3xl'>.{displayTime(timer.ms, 2, true)}</span>

                            </div>

                        )}
                    </motion.div>


                </div>

                {/* Button */}
                <div className='flex justify-center w-full'>
                    {phase === "default" ? (
                        <button type="submit" className='ml-1 p-1.5 rounded-md bg-indigo-300 text-sm text-nowrap hover:bg-indigo-400'>Check Availability</button>
                    ) : (
                        <div className='flex gap-2'>
                            {phase != "end" && (
                                <div className='p-3 rounded-full bg-indigo-300 hover:bg-indigo-400 text-sm'
                                    onClick={() => toggleTimer()}>
                                    <img className='w-[20px]' src={phase === "running" ? "./images/pause-btn.png" : "./images/play-btn.png"}></img>
                                </div>
                            )}
                            <div className='p-3 rounded-full bg-red-300 text-sm hover:bg-red-400'
                                onClick={() => reset()}>
                                <img className='w-[20px]' src="./images/reset-btn.png"></img>
                            </div>


                        </div>
                    )}

                </div>

            </form>

            <div className='w-full flex flex-col justify-center items-center mt-16'>
            <EquationGraph datapoint={datapoint}></EquationGraph>
            </div>


        </div>
    )
}
