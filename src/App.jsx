import PropTypes from "prop-types";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import ArticlesList from "./components/ArticlesList";
import Nav from "./components/Nav";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DetailsPage from "./pages/DetailsPage";
import { useEffect, useState } from "react";
import Profile from "./pages/Profile";
import CreateArticle from "./pages/CreateArticle";
import EditArticle, { articleEditLoader } from "./pages/EditArticle";

function NavLayout({ user, logout }) {
  return (
    <>
      <Nav user={user} logout={logout} />
      <Outlet />
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [like, setLike] = useState(false);

  useEffect(() => {
    // Load user from local storage or make an API call to get user data
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleLike = async (slug, method) => {
    try {
      const res = await fetch(
        `https://api.realworld.io/api/articles/${slug}/favorite`,
        {
          method,
          headers: {
            Authorization: `Token ${user.token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      setLike(!like);
    } catch (error) {
      console.error("Error liking article:", error);
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavLayout user={user} logout={logout} />}>
        <Route
          index
          element={
            <ArticlesList user={user} handleLike={handleLike} like={like} />
          }
        />
        <Route
          path="articles/:slug"
          element={
            <DetailsPage user={user} handleLike={handleLike} like={like} />
          }
        />
        <Route
          path="articles/:slug/edit"
          element={<EditArticle user={user} />}
          loader={articleEditLoader}
        />
        <Route path="sign-in" element={<SignIn login={login} />} />
        <Route path="sign-up" element={<SignUp login={login} />} />
        <Route path="profile" element={<Profile user={user} login={login} />} />
        <Route path="new-article" element={<CreateArticle user={user} />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;

NavLayout.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};
