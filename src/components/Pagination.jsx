import ReactPaginate from "react-paginate";

import right from "../assets/chevronright.svg";
import left from "../assets/chevronleft.svg";
import "./Pagination.css";

const Pagination = ({ articlesCount, handlePage }) => {
  const handlePageClick = (event) => {
    handlePage(event.selected);
  };

  return (
    <ReactPaginate
      pageClassName=" inline-flex items-center px-4 py-2 text-xs  text-counter  "
      previousClassName=" inline-flex items-center px-4 py-2 text-xs  text-counter"
      nextClassName=" inline-flex items-center px-4 py-2 text-xs  text-counter  "
      previousLabel={<img src={left} />}
      nextLabel={<img src={right} />}
      pageCount={Math.ceil(articlesCount / 5)}
      onPageChange={handlePageClick}
      containerClassName={"isolate inline-flex -space-x-px mb-3"}
      activeClassName={"active bg-primary"}
    />
  );
};

export default Pagination;
