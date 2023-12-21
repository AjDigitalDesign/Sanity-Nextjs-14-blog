// "use client";

import { client } from "./lib/sanity";
import { Post, categories, Category } from "./lib/interface";
import Link from "next/link";
import { resolve } from "path";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";
import DropDown from "./components/DropDown";
import { handleClientScriptLoad } from "next/script";
import Filter from "./components/Filter";
import next from "next";
import { revalidate } from "./post/[slug]/page";
import MultiSelect from "./components/MultiSelect";
import PostPage from "./components/PostPage";

async function getData() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const query = `*[_type == 'post' ] | order(_createdAt desc){
    _createdAt,
      _id,
      featured_image,
      content,
      overview,
      slug,
      title,
      _updatedAt,
      category-> {title}
    
  }`;

  const data = await client.fetch(query, { next: { revalidate: 10 } });

  return data;
}

async function getCategoryData() {
  const query = `*[_type == 'category' ] | order(_createdAt desc){
    _id,
      title,
  
  }`;

  const data = await client.fetch(query, { next: { revalidate: 10 } });

  return data;
}

export default async function Home() {
  const posts = (await getData()) as Post[];
  const allCategories = (await getCategoryData()) as categories[];

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tighter text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl">
          All Posts
        </h1>

        {/* <Filter posts={posts} categories={allCategories} /> */}
        <PostPage categories={allCategories} posts={posts} />
      </div>
    </div>
  );
}
