import { createContext, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../helpers/firebase";

export const BlogContext = createContext();

const BlogContextProvider = (props) => {
  const [blogsInfo, setBlogsInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const colRef = collection(db, "bloggers");

  const q = query(colRef, orderBy("createdAt"));

  const getBlogs = () => {
    setIsLoading(true);
    getDocs(q)
      .then((snapshot) => {
        let blogs = [];
        snapshot.docs.forEach((doc) => {
          blogs.push({ ...doc.data(), id: doc.id });
        });
        console.log(blogs);
        setBlogsInfo(blogs);
        setIsLoading(false);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <BlogContext.Provider value={{ blogsInfo, getBlogs, isLoading }}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;
