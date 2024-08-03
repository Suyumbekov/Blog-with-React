import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <div className="flex justify-between items-center bg-white h-20 mb-[26px] px-5 pt-2.5 pb-3.5">
        <div>
          <Link to="/">Realworld Blog</Link>
        </div>
        <div>
          <Link to="signin">Sign In</Link>
          <Link to="signup" className="text-green-500 ml-5">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
