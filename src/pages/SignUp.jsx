import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

export default function SignUp({ login }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    fetch("https://api.realworld.io/api/users", {
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
          if (errorMessages.email) {
            setError("email", {
              type: "server",
              message: errorMessages.email[0],
            });
          }
          if (errorMessages.username) {
            setError("username", {
              type: "server",
              message: errorMessages.username[0],
            });
          }
          if (errorMessages.password) {
            setError("password", {
              type: "server",
              message: errorMessages.password[0],
            });
          }
          throw new Error("Error in form submission");
        }
        return res.json();
      })
      .then((res) => {
        console.log("success", res);
        localStorage.setItem("user", JSON.stringify(res.user));
        login(res.user);
        navigate("/");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const password = watch("password", "");

  return (
    <div className="flex justify-center mb-4">
      <div className="w-full max-w-[384px] bg-white px-9 py-12 shadow-md font-roboto rounded-md">
        <h3 className="text-xl font-medium font-roboto text-account text-center">
          Create new account
        </h3>
        <form
          className="bg-white rounded pt-6 pb-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <label
              className="block font-roboto text-account text-sm mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              {...register("username", {
                required: true,
                minLength: {
                  value: 3,
                  message: "Your username needs to be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Your username must not be over 20 characters",
                },
              })}
              className="appearance-none border rounded w-full text-base placeholder:text-placeholder py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-highlight text-sm">
                {errors.username.message}
              </p>
            )}
          </div>
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
                required: true,
                minLength: {
                  value: 6,
                  message: "Your password needs to be at least 6 characters.",
                },
                maxLength: {
                  value: 40,
                  message: "Your password must not be over 40 characters",
                },
              })}
              className="appearance-none border rounded w-full text-base placeholder:text-placeholder py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-highlight text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block font-roboto text-account text-sm mb-2"
              htmlFor="repassword"
            >
              Repeat password
            </label>
            <input
              {...register("repassword", {
                required: true,
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="appearance-none border rounded w-full text-base placeholder:text-placeholder py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="repassword"
              type="password"
              placeholder="Password"
            />
            {errors.repassword && (
              <p className="text-highlight text-sm">
                {errors.repassword.message}
              </p>
            )}
          </div>
          <div className="mb-3 mt-5 flex justify-start flex-col border-t-[1px] pt-2">
            <div>
              <label className="font-roboto text-sm text-check flex justify-start">
                <input
                  {...register("checkbox", {
                    required: "You must check the agreement",
                  })}
                  type="checkbox"
                  className="w-4 h-[22px] mr-2"
                />
                I agree to the processing of my personal information
              </label>
            </div>

            {errors.checkbox && (
              <p className="text-highlight text-sm">
                {errors.checkbox.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs mt-2">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-primary">
            Sign In.
          </Link>
        </p>
      </div>
    </div>
  );
}

SignUp.propTypes = {
  login: PropTypes.func,
};
