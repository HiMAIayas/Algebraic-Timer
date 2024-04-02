"use client"
// components/Dropdown.tsx
import { useState } from 'react';
import React, { ReactElement, ReactNode } from "react";

interface ChildComponentProps {
    children: ReactElement;
  }

const Dropdown = ({ children }:ChildComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        Dropdown
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
        </svg>
      </button>

      
        <div className={`z-10 absolute mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg ${
            isOpen ? 'transition-all duration-300 ease-in-out opacity-100 scale-y-100' : 'transition-all duration-300 ease-in-out opacity-0 scale-y-0'
          }`}>
          {React.cloneElement(children, {
                onClick: () => console.log("click"),
              })}
        </div>
      
    </div>
  );
};

export default Dropdown;