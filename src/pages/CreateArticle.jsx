import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function CreateArticle({ user }) {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    const articleData = {
      title: data.title,
      description: data.short,
      body: data.content,
      tagList: tags,
    };

    fetch("https://api.realworld.io/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user.token}`,
      },
      body: JSON.stringify({ article: articleData }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          const errorMessages = errorData.errors;
          if (errorMessages.title) {
            setError("title", {
              type: "server",
              message: errorMessages.title[0],
            });
          }
          if (errorMessages.description) {
            setError("short", {
              type: "server",
              message: errorMessages.description[0],
            });
          }
          if (errorMessages.body) {
            setError("content", {
              type: "server",
              message: errorMessages.body[0],
            });
          }
          throw new Error("Error in form submission");
        }
        return res.json();
      })
      .then((res) => {
        console.log("success", res);
        navigate("/articles/" + res.article.slug);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[938px] bg-white px-9 py-12 shadow-md font-roboto">
        <h3 className="text-xl font-medium font-roboto text-account text-center">
          Create new article
        </h3>
        <form
          className="bg-white rounded pt-6 pb-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <label
              className="block font-roboto text-account text-sm mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              {...register("title", {
                required: "Title is mandatory",
              })}
              className="appearance-none border rounded w-full text-base placeholder:text-placeholder py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Title"
            />
            {errors.title && (
              <p className="text-highlight text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label
              className="block font-roboto text-account text-sm mb-2"
              htmlFor="short"
            >
              Short description
            </label>
            <input
              {...register("short", {
                required: "Description is mandatory",
              })}
              className="appearance-none border rounded w-full text-base placeholder:text-placeholder py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="short"
              type="text"
              placeholder="Title"
            />
            {errors.short && (
              <p className="text-highlight text-sm">{errors.short.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label
              className="block font-roboto text-account text-sm mb-2"
              htmlFor="content"
            >
              Text
            </label>
            <textarea
              {...register("content", {
                required: "Text is mandatory",
              })}
              className="appearance-none border rounded w-full text-base placeholder:text-placeholder py-2 px-3 h-[168px] leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              placeholder="Text"
            />
            {errors.content && (
              <p className="text-highlight text-sm">{errors.content.message}</p>
            )}
          </div>
          <div>
            <h3
              className="block font-roboto text-account text-sm mb-2"
              htmlFor="content"
            >
              Tags
            </h3>
            {tags.map((tag, index) => (
              <div key={index} className="mb-[5px]">
                <span className="inline-block border rounded w-[300px] text-base py-2 px-3">
                  {tag}
                </span>
                <button
                  className="font-roboto text-base text-highlight border border-highlight rounded-[4px] px-9 py-2 mx-[18px]"
                  onClick={() => handleDelete(tag)}
                >
                  Delete
                </button>
              </div>
            ))}

            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="appearance-none border rounded w-[300px] text-base placeholder:text-placeholder py-2 px-3 focus:outline-none focus:shadow-outline"
              placeholder="Tag"
            />
            <button
              className="font-roboto text-base text-primary border border-primary rounded-[4px] px-10 py-2 ml-[18px]"
              type="button"
              onClick={handleAdd}
            >
              Add tag
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-80 mt-[21px] bg-primary hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

CreateArticle.propTypes = {
  user: PropTypes.object,
};
