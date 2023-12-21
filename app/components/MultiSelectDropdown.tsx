"use client";

import { FC, useState } from "react";
import Checkbox from "./ui/Checkbox";

interface MultiSelectDropdownProps {
  options: string[];
  onSelect: (selectedOptions: string[]) => void;
}

const MultiSelectDropdown: FC<MultiSelectDropdownProps> = ({
  options,
  onSelect,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    onSelect(updatedOptions);
  };

  return (
    <div className="mt-3 flex justify-between">
      {options.map((option) => (
        <div className="flex items-center mb-4" key={option}>
          <input
            id="default-checkbox"
            type="checkbox"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={() => handleCheckboxChange(option)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default MultiSelectDropdown;
