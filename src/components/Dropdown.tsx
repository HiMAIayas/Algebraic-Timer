"use client"
// components/Dropdown.tsx
import { useState } from 'react';
import React, { ReactElement, ReactNode } from "react";

interface ChildComponentProps {
    dropdownLink:String

  }

const Dropdown = ({ dropdownLink }:ChildComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(!isOpen);
    console.log(event.currentTarget.dataset.dropdowntoggle);
    
    const target = document.getElementById(event.currentTarget.dataset.dropdowntoggle!);
    console.log(target);
    //target!.classList.add(isOpen ? 'hidden' : 'transition-all')
  };

  return (
    <div className="relative md:hidden">
      <button
        onClick={toggleDropdown}
        data-dropdowntoggle={dropdownLink}
        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        Dropdown
      </button>
    </div>
  );
};

export default Dropdown;