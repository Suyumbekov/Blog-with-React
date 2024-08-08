import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import { format } from "date-fns";
import PropTypes from "prop-types";

import imgUrl from "../assets/heart.svg";
import exclamation from "../assets/exclamation.svg";
import Tags from "../components/Tags";
import { useState } from "react";

export default function DetailsPage({ user }) {
  const [open, setOpen] = useState(false);
  const article = useLoaderData();

  const navigate = useNavigate();
  const markdown = article.article.body;

  const deleteArticle = () => {
    fetch("https://api.realworld.io/api/articles/" + article.article.slug, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user.token}`,
      },
    })
      .then((res) => {
        console.log("article successfully deleted", res);
        navigate("/");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
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
                <div className="date text-tag text-xs">
                  {format(new Date(article.article.updatedAt), "MMMM d, yyyy")}
                </div>
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
        <div className="flex flex-row justify-between items-center">
          <div className="description md:w-[682px] w-full text-xs text-counter mt-[7px] leading-6 font-normal">
            {article.article.description}
          </div>
          {article.article.author.username === user?.username && (
            <div className="relative">
              <button
                className="font-roboto text-sm text-highlight border border-highlight rounded-[4px] px-[17px] py-[6px]"
                onClick={() => setOpen(true)}
              >
                Delete
              </button>
              <Link
                to="edit"
                className="font-roboto text-sm text-primary border border-primary rounded-[4px] px-[17px] py-[6px] ml-3"
              >
                Edit
              </Link>
              {open && (
                <div className="w-[246px] absolute left-[69px] top-0 flex flex-row ">
                  <div className="w-[6px] h-3 top-3 left-0 relative border-white border-[6px] border-y-transparent border-l-transparent"></div>
                  <div className="bg-white shadow-md px-4 py-3">
                    <p className="flex flex-row justify-start items-start">
                      <img className="pt-1 mr-2" src={exclamation} />
                      <span className="text-sm text-check font-roboto">
                        Are you sure to delete this article?
                      </span>
                    </p>
                    <div className="flex justify-end">
                      <button
                        className="font-roboto text-sm px-2 py-[1px] border border-confirm rounded-[4px]"
                        onClick={() => setOpen(false)}
                      >
                        No
                      </button>
                      <button
                        className="font-roboto text-sm text-white px-2 py-[1px] bg-primary rounded-[4px] ml-4"
                        onClick={deleteArticle}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
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

DetailsPage.propTypes = {
  user: PropTypes.object,
};
