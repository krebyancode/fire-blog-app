import React, { useState, useContext } from "react";
import { db } from "../helpers/firebase";
import {
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Form, Grid, Segment, Button } from "semantic-ui-react";
import { successNote } from "../helpers/toastNotify";

const NewBlog = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  const colRef = collection(db, "bloggers");

  const q = query(colRef, orderBy("createdAt"));

  const addBlog = () => {
    addDoc(colRef, {
      email: currentUser.email,
      title,
      imageUrl,
      content,
      createdAt: serverTimestamp(),
      likes: 0,
      comments: [],
    }).then(() => {
      navigate("/");
      successNote("Added succesfully...");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBlog();
    setTitle("");
    setImageUrl("");
    setContent("");
  };

  return (
    <div className="main">
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ width: 300 }}>
          <h2 className="contact-header" style={{ color: "black" }}>
            New Blog
          </h2>
          <Form size="large" onSubmit={handleSubmit}>
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
                Submit
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default NewBlog;
