import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import ArticlesList from "./components/ArticlesList";
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import DetailsPage, { articleDetailLoader } from "./components/DetailsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavLayout />}>
      <Route index element={<ArticlesList />} />
      <Route
        path="articles/:slug"
        element={<DetailsPage />}
        loader={articleDetailLoader}
      />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
    </Route>
  )
);

function NavLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
