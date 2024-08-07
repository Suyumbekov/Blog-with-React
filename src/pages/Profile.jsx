import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Profile({ user, login }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      password: "",
      image: "",
    },
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = (data) => {
    fetch("https://api.realworld.io/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user.token}`,
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
          if (errorMessages.image) {
            setError("image", {
              type: "server",
              message: errorMessages.image[0],
            });
          }
          throw new Error("Error in form submission");
        }
        return res.json();
      })
      .then((res) => {
        console.log("success", res);
        login(res.user);

        navigate("/");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="flex justify-center mb-4">
      <div className="w-full max-w-[384px] bg-white px-9 py-12 shadow-md font-roboto rounded-md">
        <h3 className="text-xl font-medium font-roboto text-account text-center">
          Edit Profile
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
                required: "Username must not be empty",
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
              New password
            </label>
            <input
              {...register("password", {
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
              placeholder="New password"
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
              htmlFor="image"
            >
              Avatar image
            </label>
            <input
              {...register("image", {
                pattern: {
                  value:
                    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
                  message: "Url is not valid",
                },
              })}
              className="appearance-none border rounded w-full text-base placeholder:text-placeholder py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="url"
              placeholder="Avatar image"
            />
            {errors.image && (
              <p className="text-highlight text-sm">{errors.image.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func,
};
