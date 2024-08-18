"use client"
import AnalogClock from '@/components/AnalogClock'
import React from 'react'
import data from '@/libs/output.json';
import TimezoneClockGrid from '@/components/TimezoneClockGrid';

export default function test() {
    
  return (
    <div className='py-24 px-10 md:px-24 xl:px-48 flex flex-col'>
        <div className='w-full flex justify-center'>
        <AnalogClock timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}></AnalogClock>
        </div>

        <br/><br/>

        <hr/>
               
        <TimezoneClockGrid></TimezoneClockGrid>

    </div>
  )
}
