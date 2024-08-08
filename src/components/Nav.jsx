import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Nav({ user, logout }) {
  return (
    <>
      <div className="flex justify-between items-center bg-white h-20 mb-[26px] px-5 pt-2.5 pb-3.5">
        <div>
          <Link to="/">Realworld Blog</Link>
        </div>
        <div>
          {user ? (
            <div className="flex flex-row items-center">
              <Link
                to="new-article"
                className="text-article text-sm px-[10px] py-[6px] border-[1px] border-article rounded-md mr-7"
              >
                Create article
              </Link>
              <Link to="profile" className="flex flex-row items-center mr-7">
                <h3>{user.username}</h3>
                <img src={user.image} className="w-11 h-11 rounded-full ml-3" />
              </Link>
              <button
                className="border-[1px] border-counter rounded-md px-[18px] py-[6px]"
                type="button"
                onClick={logout}
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <Link to="sign-in">Sign In</Link>
              <Link to="sign-up" className="text-green-500 ml-5">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

Nav.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};
