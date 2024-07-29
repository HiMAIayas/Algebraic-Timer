import React from 'react'

export function displayTime(num:number, digit:number){
  return (
    num.toString().padStart(digit,"0")
  )
}
