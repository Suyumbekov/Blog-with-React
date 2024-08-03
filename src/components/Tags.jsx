import PropTypes from "prop-types";

export default function Tags({ tags }) {
  return (
    <>
      {tags.map((tag, index) => (
        <div
          className="inline-block p-1 mr-3 text-black text-xs border-[1px] border-solid rounded-sm border-counter"
          key={index}
        >
          {tag}
        </div>
      ))}
    </>
  );
}

Tags.propTypes = {
  tags: PropTypes.array,
};
