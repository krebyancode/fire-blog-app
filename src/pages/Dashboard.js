import React, { useContext, useEffect } from "react";
import { BlogContext } from "../context/BlogContext";
import BlogCard from "../components/BlogCard";
import { Card, Dimmer, Loader } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  const { blogsInfo, getBlogs, isLoading } = useContext(BlogContext);

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="main">
      <h2>Dashboard</h2>
      {isLoading ? (
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
      ) : (
        <Card.Group itemsPerRow={4}>
          {blogsInfo.map((card) => (
            <BlogCard card={card} key={card.id} />
          ))}
        </Card.Group>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Dashboard;
