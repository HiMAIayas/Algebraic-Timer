"use client"
import React, { useEffect, useRef, useState } from 'react'
import data from '@/libs/output.json';
import AnalogClock from './AnalogClock';
import { getMatching } from '@/libs/regex';
import { get } from 'http';

export default function TimezoneClockGrid() {
    const [cityArr, setCityArr] = useState([
        "America/New_York",
        "Europe/Paris",
        "Asia/Tokyo"
    ]);
    const [showOption, setShowOption] = useState(false);
    const [query, setQuery] = useState("");
    const boxRef = useRef<any>(null);

    function handleCityClick(timezone: string) {
        setCityArr([...cityArr, timezone]);
        setShowOption(false);
    }


    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!boxRef.current.contains(event.target)) {
                setShowOption(false);
            }
        }
        window.addEventListener('click', handleOutsideClick);


        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    })

    return (
        <div className='flex flex-col items-center'>
            <div className='relative group' ref={boxRef}>
                <div className="relative mt-2 rounded-md shadow-sm flex w-[300px] sm:w-[400px]">

                    {/* Search */}
                    <input className="w-full rounded-md border-0 py-1.5 pl-2 pr-14 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type="text" name="search" id="search"
                        placeholder="Search"
                        autoComplete='off'
                        onFocus={() => setShowOption(true)}
                        onChange={(event) => setQuery(event.target.value)}

                    >
                    </input>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <img src="./images/search-gray.png" className='size-4 group-focus-within:hidden'></img>
                        <img src="./images/search-indigo.png" className='size-4 group-focus-within:block hidden'></img>
                    </div>

                    {/* Option Select */}
                    {showOption && (

                        <div className='absolute top-full inset-x-0 mt-2 overflow-y-scroll max-h-60 bg-gray-50 rounded-xl shadow-md py-2 z-40'>
                            {getMatching(query).map((element,index) => (

                                (
                                    <div className='w-full flex flex-col p-2 hover:bg-gray-200 cursor-pointer'
                                        key={index}
                                        onClick={() => handleCityClick(element.timezone)}
                                    >
                                        <span className='text-lg tracking-wide'>{element.name}</span>
                                        <span className='text-sm text-gray-800'>{element.country}</span>
                                    </div>
                                )

                            ))}
                        </div>
                    )}

                </div>
            </div>
            <br /><br />

            {/* Display timezones clock */}
            <div className='flex flex-wrap justify-center items-start gap-16'>
                {cityArr.map((timezone) => (
                    <AnalogClock timezone={timezone} key={timezone}></AnalogClock>
                ))}
            </div>

        </div>
    )
}
