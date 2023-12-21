"use client";

import React, { useState, ChangeEvent } from "react";

interface DropdownProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const DropDown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <>
      <select
        value={selectedOption}
        onChange={handleChange}
        className="bg-gray-900 border border-gray-100 
        text-white rounded-lg text-sm 
        focus:ring-blue-500 focus:border-blue-500 block  px-3 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
        "
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default DropDown;
