import Image from "next/image";
import React from "react";

const NewsDetails = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await res.json();
  const news = data.data;

  return (
    <main className="container mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="md:text-5xl font-bold leading-tight">
        {news.title}
      </h1>

      {/* Published date + Author */}
      <div className="mt-5 flex flex-col gap-2 text-sm text-gray-500">
        <p>
          Published:{" "}
          {new Date(news.firstPublished).toLocaleDateString("bn-BD", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {news.byline?.map(
          (author: { name: string; role: string }, index: number) => (
            <p key={index}>
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {author.name}
              </span>{" "}
              — {author.role}
            </p>
          )
        )}
      </div>

      {/* Main Image */}
      <div className="mt-8 overflow-hidden rounded-xl">
        <Image
          src={news.imageUrl}
          width={1024}
          height={600}
          alt={news.title}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Article Content */}
      <article className="mt-8 space-y-6">
        {news.body.map(
          (
            item: {
              type: string;
              text?: string;
              url?: string;
              width?: number;
              height?: number;
              caption?: string;
              altText?: string;
            },
            index: number
          ) => {
            // Text
            if (item.type === "text") {
              return (
                <p
                  key={index}
                  className="text-lg leading-8 text-gray-700 dark:text-gray-300"
                >
                  {item.text}
                </p>
              );
            }

            // Subheading
            if (item.type === "subheading") {
              return (
                <h2
                  key={index}
                  className="pt-6 text-2xl md:text-3xl font-bold"
                >
                  {item.text}
                </h2>
              );
            }

            // Image (Updated to prevent duplicate)
            if (item.type === "image") {
              // Check if this image has the same URL as the main image
              if (item.url === news.imageUrl) {
                // Skip rendering this item to avoid the duplicate
                return null;
              }

              return (
                <figure key={index} className="my-8">
                  <Image
                    src={item.url!}
                    width={item.width || 1024}
                    height={item.height || 600}
                    alt={item.altText || news.title}
                    className="w-full h-auto rounded-xl"
                  />

                  {item.caption && (
                    <figcaption className="mt-2 text-sm text-gray-500">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            return null;
          }
        )}
      </article>

      {/* Tags */}
      <div className="mt-10 flex flex-wrap gap-2">
        {news.tags?.map((tag: string, index: number) => (
          <span
            key={index}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Source */}
      <div className="mt-8 border-t pt-5 text-sm text-gray-500">
        <p>
          Source: <span className="font-semibold">{news.source}</span>
        </p>
      </div>
    </main>
  );
};

export default NewsDetails;