"use client"

import React, { useEffect, useRef, useState } from 'react'
import { displayTime, displayToSec, secToDisplay } from '@/libs/time-function';
import { evaluate, parser } from 'mathjs';




export default function Timer() {
    const [timer, setTimer] = useState({
        ms: 0,
        sec: 0,
        min: 0,
        hour: 0,
        day: 0
    });
    const [phase, setPhase] = useState("default"); //default stop running end

    const time_n = useRef(0); // end point | n in f(n)
    const time_t = useRef(0); // iterator  | t in f(t)

    const time_elapsed = useRef(0);
    const time_at_start = useRef(Date.now());

    const equation = useRef("t");





    function checkAvalability(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();
        console.log("Check");
        const formData = new FormData(event.currentTarget)

        equation.current = formData.get("equation") as string;
        if (equation.current === "") equation.current = "t";
        time_n.current = displayToSec(timer);

        const pars = parser();
        let isReady = true;
        try {
            pars.evaluate(`f(t)=${equation.current}`);
            pars.evaluate(`f(${time_n.current})`);
        } catch (error) {
            isReady = false;
            console.log(error);
        }

        if (isReady) {
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


    useEffect(() => { //TODO: use Date.now() to track time instead of manual timer. 
        const pars = parser();
        let interval: NodeJS.Timeout | undefined = undefined;
        let fn: number;
        if (phase === "running") {
            pars.evaluate("f(t)=" + equation.current);
            fn = pars.evaluate(`f(${time_n.current})`);

            interval = setInterval(() => {
                if (time_t.current >= time_n.current) setPhase("end");
                else {
                    time_t.current += 0.05;
                    setTimer(secToDisplay(fn - pars.evaluate(`f(${time_t.current})`)));
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
                <div className='px-48'>
                    <label htmlFor="equation" className="text-sm font-medium leading-6 text-gray-900">Enter Equation</label>
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
                <div className='flex text-7xl w-full justify-center my-32 font-digital'>

                    <div className='flex flex-col items-center ml-2'>
                        <input className='placeholder:text-black bg-transparent p-1 w-[125px]'
                            type='number' max={59} min={0}
                            onChange={(event) => handleOnChange(event.target.value, "day")}
                            value={displayTime(timer.day, 3)}></input>
                        <span className='text-sm'>day</span>
                    </div>

                    <span>:</span>

                    <div className='flex flex-col items-center ml-2'>
                        <input className='placeholder:text-black bg-transparent p-1 w-[95px]'
                            type='number' max={23} min={0}
                            onChange={(event) => handleOnChange(event.target.value, "hour")}
                            value={displayTime(timer.hour, 2)}></input>
                        <span className='text-sm'>hr</span>
                    </div>

                    <span>:</span>

                    <div className='flex flex-col items-center ml-2'>
                        <input className='placeholder:text-black bg-transparent p-1 w-[95px]'
                            type='number' max={59} min={0}
                            onChange={(event) => handleOnChange(event.target.value, "min")}
                            value={displayTime(timer.min, 2)}></input>
                        <span className='text-sm'>min</span>
                    </div>

                    <span>:</span>

                    <div className='flex flex-col items-center ml-2'>
                        <input className='placeholder:text-black bg-transparent p-1 w-[95px]'
                            type='number' max={59} min={0}
                            onChange={(event) => handleOnChange(event.target.value, "sec")}
                            value={displayTime(timer.sec, 2)}></input>
                        <span className='text-sm'>sec</span>
                    </div>

                    <span className='text-3xl'>.{displayTime(timer.ms, 2)}</span>
                </div>

                {/* Button */}
                <div className='flex justify-center w-full'>
                    {phase === "default" ? (
                        <button type="submit" className='ml-1 p-1.5 rounded-md bg-indigo-300 text-sm text-nowrap hover:bg-indigo-400'>Check Availability</button>
                    ) : (
                        <div className='flex gap-2'>
                            {phase != "end" && (
                                <button type="button" className='py-1.5 rounded-md bg-indigo-300 hover:bg-indigo-400 text-sm'
                                    onClick={() => toggleTimer()}>{phase === "running" ? "Stop" : "Start"}</button>
                            )}
                            <button type="button" className='py-1.5 rounded-md bg-red-300 text-sm hover:bg-red-400'
                                onClick={() => setPhase('default')}>Reset</button>


                        </div>
                    )}

                </div>
            </form>


        </div>
    )
}
