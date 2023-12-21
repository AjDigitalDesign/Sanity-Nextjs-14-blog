"use client";
import React, { FC, useState } from "react";
import ThemeButton from "./ThemeButton";
import MultiSelectDropdown from "./MultiSelectDropdown";
import Link from "next/link";
import { Category, Post } from "../lib/interface";

interface MultiSelectProps {
  posts: Post[];
  categories: Category[];
}

const MultiSelect: FC<MultiSelectProps> = ({ posts, categories }) => {
  const [selectedOptions, setSelectedOptions] = useState<Post[]>(posts);

  const handleSelect = (options: string[]) => {
    // setSelectedOptions(options);
  };

  return (
    <div>
      <div>
        <MultiSelectDropdown
          options={[
            ...categories.map((category: { title: string }) => category.title),
          ]}
          onSelect={handleSelect}
        />
      </div>
      <ul>
        {selectedOptions.map(
          (post: {
            _id: string;
            _createdAt: string;
            slug: any;
            title: string;
            overview: string;
          }) => (
            <li key={post._id} className="py-4">
              <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                <div>
                  <p className="text-base font-medium leading-6 text-teal-500">
                    {new Date(post._createdAt).toISOString().split("T")[0]}
                  </p>
                </div>
                <Link
                  href={`/post/${post.slug.current}`}
                  prefetch
                  className="space-y-3 xl:col-span-3"
                >
                  <div>
                    <h3 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
                      {post.title}
                    </h3>
                  </div>
                  <p className="prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-2">
                    {post.overview}
                  </p>
                </Link>
              </article>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default MultiSelect;
