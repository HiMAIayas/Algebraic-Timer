"use client"
// components/Dropdown.tsx
import { useState } from 'react';

interface DropdownProps {
  items: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ items }) => {
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
          <path
            fillRule="evenodd"
            d="M10.293 14.95a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L10 12.586l-4.293-4.293a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
            >
              <span className="text-sm text-gray-800">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;