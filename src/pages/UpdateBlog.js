import React, { useState, useContext, useEffect } from "react";
import { db } from "../helpers/firebase";
import { collection, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Form, Grid, Segment, Button, Image } from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import { successNote } from "../helpers/toastNotify";
import { BlogContext } from "../context/BlogContext";

const UpdateBlog = () => {
  const { getBlogs, blogsInfo } = useContext(BlogContext);

  const location = useLocation();
  const updatedBlog = location.state.blogDetail;

  const [title, setTitle] = useState(updatedBlog.title);
  const [imageUrl, setImageUrl] = useState(updatedBlog.imageUrl);
  const [content, setContent] = useState(updatedBlog.content);

  const navigate = useNavigate();

  const colRef = collection(db, "bloggers");

  const q = query(colRef, orderBy("createdAt"));

  const [blogDetail] = blogsInfo.filter((blog) => blog.id === updatedBlog.id);

  useEffect(() => {
    getBlogs();
  }, []);

  const updateBlog = () => {
    const docRef = doc(db, "bloggers", blogDetail.id);
    updateDoc(docRef, {
      ...blogDetail,
      title,
      imageUrl,
      content,
    }).then(() => {
      navigate("/");
      successNote("Updated succesfully...");
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    updateBlog();
    setTitle("");
    setImageUrl("");
    setContent("");
  };

  return (
    <div className="main">
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ width: 300 }}>
          <h2 className="contact-header" style={{ color: "black" }}>
            Update Blog
          </h2>
          <Form size="large" onSubmit={handleEdit}>
            <Image
              src={imageUrl}
              ui={false}
              style={{ width: "100%", height: "400px" }}
            />
            <Segment stacked>
              <Form.Input
                fluid
                name="title"
                icon="user"
                iconPosition="left"
                placeholder="Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Form.Input
                fluid
                name="imageurl"
                icon="image"
                iconPosition="left"
                placeholder="Image URL"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
              <Form.TextArea
                fluid
                name="content"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />

              <Button color="teal" fluid size="large">
                Update
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default UpdateBlog;
