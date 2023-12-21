"use client";
import React, { FC, useEffect, useState } from "react";
import PostCategoryFilter from "./PostCategoryFilter";
import PostList from "./PostList";
import { Category, Post } from "../lib/interface";

interface PostPageProps {
  posts: Post[];
  categories: Category[];
}

const PostPage: FC<PostPageProps> = ({ posts, categories }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    // Filter posts when selected categories change
    const filtered =
      selectedCategories.length === 0
        ? posts
        : posts?.filter(
            (post) =>
              post.category && selectedCategories.includes(post.category.title)
          ) || [];

    setFilteredPosts(filtered);
  }, [selectedCategories, posts]);

  const handleCategoryChange = (category: string) => {
    // Toggle the selected category
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((selected) => selected !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
  };

  return (
    <>
      {console.log(filteredPosts)}
      <PostCategoryFilter
        categories={categories.map((category) => category.title)}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />
      <PostList posts={filteredPosts} />
    </>
  );
};

export default PostPage;
