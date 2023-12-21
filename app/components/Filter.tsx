"use client";

import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import DropDown from "./DropDown";

import { Post } from "../lib/interface";

interface filterProps {
  posts: Post[];
  categories: Category[];
}

const Filter: FC<filterProps> = ({ posts, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

  useEffect(() => {
    filterPosts();
  }, [selectedCategory, posts]);

  const handleCategoryChange = (category: string) => {
    console.log(category);

    setSelectedCategory(category);
  };

  const filterPosts = () => {
    const filtered = selectedCategory
      ? posts.filter((post) => post.category?.title === selectedCategory)
      : posts;

    setFilteredPosts(filtered);
  };

  return (
    <div>
      <div>
        <DropDown
          options={[
            ...categories.map((category: { title: string }) => category.title),
          ]}
          onSelect={handleCategoryChange}
        />
      </div>
      <ul>
        {filteredPosts.map(
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

export default Filter;
