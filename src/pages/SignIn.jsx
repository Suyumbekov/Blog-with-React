import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

export default function SignIn({ setUser }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    fetch("https://api.realworld.io/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: data }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          const errorMessages = errorData.errors;
          if (errorMessages["email or password"]) {
            setError("email", {
              type: "server",
              message:
                "email or password " + errorMessages["email or password"],
            });
          }
          throw new Error("Error in form submission");
        }
        return res.json();
      })
      .then((res) => {
        console.log("success", res);
        localStorage.setItem("user", JSON.stringify(res.user));
        setUser(res.user);
        navigate("/");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[384px] bg-white px-9 py-12 shadow-md font-roboto">
        <h3 className="text-xl font-medium font-roboto text-account text-center">
          Sign In
        </h3>
        <form
          className="bg-white rounded pt-6 pb-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <label
              className="block font-roboto text-account text-sm mb-2"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Your email address is not valid",
                },
              })}
              className="appearance-none border rounded w-full text-base placeholder:text-placeholder py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-highlight text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label
              className="block font-roboto text-account text-sm mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: { value: true, message: "Please choose a password" },
              })}
              className="appearance-none border rounded w-full text-base placeholder:text-placeholder py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
            {errors.password && <p className="text-highlight text-sm">{}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="text-primary">
            Sign Up.
          </Link>
        </p>
      </div>
    </div>
  );
}

SignIn.propTypes = {
  setUser: PropTypes.func,
};
