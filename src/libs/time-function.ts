import React from 'react'

type DisplayTimerType = {
    ms:number,
    sec:number,
    min:number,
    hour:number,
    day:number   
}


export function displayTime(num:number, digit:number){
    let numstr = num.toString();
    if (numstr.length>digit) numstr = numstr.substring(0,digit);
  return (
    numstr.padStart(digit,"0")
  )
}

export function displayYear(num:number){
    return 0
}


export function displayToSec({ms,sec,min,hour,day}:DisplayTimerType){
    // 1 day = 60*60*24 = 86400 sec
    return (day*86400 + hour*3600 + min*60 + sec + ms/1000)
}

export function secToDisplay(time:number){
    let isPositive = true
    if (time<0){
        time = Math.abs(time);
        isPositive = false;
    }
    //Based on 1 year = 365 days && 1 day = 24 hours exactly
    const year = Math.floor(time/31536000);
    time = time%31536000;

    const day = Math.floor(time/86400);
    time = time%86400;

    const hour = Math.floor(time/3600);
    time = time%3600;

    const min = Math.floor(time/60);
    time = time%60;

    const sec = Math.floor(time);
    const ms = (time-sec)*1000;

    return ({
        isPositive:isPositive,
        ms:ms,
        sec:sec,
        min:min,
        hour:hour,
        day:day,
        year:year
    });
}

