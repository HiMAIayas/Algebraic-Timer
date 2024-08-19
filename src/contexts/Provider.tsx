"use client"

import React from 'react'
import { ThemeProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export default function AppThemeProvider({children}:{children:React.ReactNode}) {
  return (
    <ThemeProvider>{children}</ThemeProvider>
  )
}
