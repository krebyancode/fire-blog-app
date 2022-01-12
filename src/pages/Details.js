import React, { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import { useParams } from "react-router-dom";
import BlogForm from "../components/BlogForm";

const Details = () => {
  const { id } = useParams();
  const { blogsInfo } = useContext(BlogContext);

  const [blogDetail] = blogsInfo.filter((blog) => blog.id === id);

  return (
    <div className="main">
      <h2>Details</h2>
      <BlogForm blogDetail={blogDetail} />
    </div>
  );
};

export default Details;
