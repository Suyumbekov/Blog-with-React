import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import imgUrl from "../assets/heart.svg";
import like from "../assets/like.svg";
import Tags from "./Tags";
import { format } from "date-fns";

export default function Article({ article, handleLike }) {
  return (
    <div className="w-[500px] md:w-[800px] lg:w-[930px]  mb-[26px] bg-white pl-[19px] py-[15px] pr-[14px] rounded-md shadow-md">
      <div className="flex justify-between">
        <div>
          <div className="flex flex-row">
            <h2 className="max-w-[500px] text-xl text-primary m-0">
              <Link to={"articles/" + article.slug}>{article.title}</Link>
            </h2>
            <div className="flex flex-row self-start pt-[7px]">
              <span className="inline-block mr-1 ml-3">
                {article.favorited ? (
                  <img
                    className="cursor-pointer"
                    src={like}
                    onClick={() => handleLike(article.slug, "DELETE")}
                  />
                ) : (
                  <img
                    className="cursor-pointer"
                    src={imgUrl}
                    onClick={() => handleLike(article.slug, "POST")}
                  />
                )}
              </span>
              <span className="inline-block text-counter text-xs">
                {article.favoritesCount}
              </span>
            </div>
          </div>
          <Tags tags={article.tagList} />
        </div>

        <div>
          <div className="bio flex justify-between items-center">
            <div className="mr-3">
              <div className="name text-name text-lg">
                {article.author.username}
              </div>
              <div className="date text-tag text-xs">
                {format(new Date(article.updatedAt), "MMMM d, yyyy")}
              </div>
            </div>

            <div className="avatar">
              <img
                src={article.author.image}
                className="rounded-full w-[46px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="description md:w-[682px] w-full text-xs text-counter mt-[7px] leading-6 font-normal">
        {article.description}
      </div>
    </div>
  );
}

Article.propTypes = {
  article: PropTypes.object,
  handleLike: PropTypes.func,
};
