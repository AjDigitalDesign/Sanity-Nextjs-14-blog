import { Post } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import { urlFor } from "@/app/lib/sanityImageUrl";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import React from "react";

async function getData(slug: string) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const query = `*[_type == "post" && slug.current == "${slug}"][0]`;

  const data = await client.fetch(query, { next: { revalidate: 10 } });

  return data;
}

export const revalidate = 60; // revalidate this page every 60 seconds

async function SlugPage({ params }: { params: { slug: string } }) {
  const data = (await getData(params.slug)) as Post;

  const featuredImage = data.featured_image.asset._ref;

  const PortableTextComponet = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image
          src={urlFor(value).url()}
          alt="image"
          className="rounded-lg"
          width={800}
          height={800}
        />
      ),
    },
  };

  return (
    <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
      <header className="pt-6 xl:pb-6">
        <div className="space-y-1 text-center">
          <div className="space-10">
            <div>
              <p className="text-base font-medium leading-6 text-teal-300">
                {new Date(data._createdAt).toISOString().split("T")[0]}
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-leading-10 md:text-5xl md:leading-14">
              {data.title}
            </h1>
          </div>
        </div>
      </header>

      {featuredImage === featuredImage ? (
        <div>
          <Image
            src={urlFor(featuredImage).url()}
            placeholder="blur"
            blurDataURL={urlFor(featuredImage)
              .width(24)
              .height(24)
              .blur(10)
              .url()}
            alt="image"
            className="rounded-lg"
            width={800}
            height={400}
          />
        </div>
      ) : (
        ""
      )}

      <div className="divide-y divide-gray-200 pb-7 dark:divide-gray-700 xl:divide-y-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert prose-lg">
            <PortableText
              value={data.content}
              components={PortableTextComponet}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlugPage;
