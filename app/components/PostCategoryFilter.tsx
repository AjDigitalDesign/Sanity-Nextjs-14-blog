"use client";

import { FC } from "react";
import { Category } from "../lib/interface";

interface PostCategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (Category: string) => void;
}

const PostCategoryFilter: FC<PostCategoryFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <div className="mt-5">
      <h3>Filter by Category:</h3>
      <div className="flex justify-between mt-3">
        {categories.map((category) => (
          <div className="flex items-center mb-4" key={category}>
            <input
              id="default-checkbox"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => onCategoryChange(category)}
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCategoryFilter;
