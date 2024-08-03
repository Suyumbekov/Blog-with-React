import { useLoaderData } from "react-router-dom";
import Markdown from "react-markdown";

import imgUrl from "../assets/heart.svg";
import Tags from "./Tags";

export default function DetailsPage() {
  const article = useLoaderData();

  const markdown = article.article.body;
  return (
    <div className="container flex justify-center">
      <div className="w-[500px] md:w-[800px] lg:w-[930px]  mb-[26px] bg-white pl-[19px] py-[15px] pr-[14px] rounded-md shadow-md">
        <div className="flex justify-between">
          <div>
            <div className="flex flex-row">
              <h2 className="max-w-[500px] text-xl text-primary m-0">
                {article.article.title}
              </h2>
              <div className="flex flex-row self-start pt-[7px]">
                <span className="inline-block mr-1 ml-3">
                  <img src={imgUrl} />
                </span>
                <span className="inline-block text-counter text-xs">
                  {article.article.favoritesCount}
                </span>
              </div>
            </div>
            <Tags tags={article.article.tagList} />
          </div>

          <div>
            <div className="bio flex justify-between items-center">
              <div className="mr-3">
                <div className="name text-name text-lg">
                  {article.article.author.username}
                </div>
                <div className="date text-tag text-xs">March 5, 2020</div>
              </div>

              <div className="avatar">
                <img
                  src={article.article.author.image}
                  className="rounded-full w-[46px]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="description md:w-[682px] w-full text-xs text-counter mt-[7px] leading-6 font-normal">
          {article.article.description}
        </div>
        <div className="my-6">
          <Markdown>{markdown}</Markdown>
        </div>
      </div>
    </div>
  );
}

export const articleDetailLoader = async ({ params }) => {
  const { slug } = params;

  const res = await fetch("https://api.realworld.io/api/articles/" + slug);

  if (!res.ok) {
    throw Error("Could not find that article");
  }

  return res.json();
};
