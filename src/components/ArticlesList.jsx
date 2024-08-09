import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Article from "./Article";
import Pagination from "./Pagination";

import img from "../assets/spinner.svg";

export default function ArticlesList({ user, handleLike, like }) {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);

  useEffect(() => {
    const headers = user ? { Authorization: `Token ${user.token}` } : {};
    fetch(`https://api.realworld.io/api/articles?limit=5&offset=${page * 5}`, {
      headers,
    })
      .then((res) => res.json())
      .then((res) => {
        setArticlesCount(res.articlesCount);
        setArticles(res.articles);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [page, like, user]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <img src={img} />
      </div>
    );
  }

  if (error) {
    return <div>Error loading articles: {error.message}</div>;
  }
  return (
    <div className="container mx-auto">
      <main className="flex flex-col justify-center items-center">
        {articles.map((article, index) => (
          <Article article={article} key={index} handleLike={handleLike} />
        ))}

        <Pagination
          articlesCount={articlesCount}
          handlePage={(newPage) => setPage(newPage)}
        />
      </main>
    </div>
  );
}

ArticlesList.propTypes = {
  user: PropTypes.object,
  handleLike: PropTypes.func,
  like: PropTypes.bool,
};
