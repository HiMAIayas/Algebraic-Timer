"use client"
import AnalogClock from '@/components/AnalogClock'
import React from 'react'
import data from '@/libs/output.json';

export default function test() {
    
  return (
    <div className='py-24 px-10 md:px-24 flex flex-col'>
        <AnalogClock timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}></AnalogClock>
        <div onClick={()=>console.log(data)}>tttt</div>

    </div>
  )
}
