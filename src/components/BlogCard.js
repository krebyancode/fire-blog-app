import React, { useContext, useState } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { db } from "../helpers/firebase";
import { collection, query, orderBy, doc, updateDoc } from "firebase/firestore";

const BlogCard = ({ card }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { id, content, email, imageUrl, title, createdAt, likes, comments } =
    card;

  const [countLikes, setCountLikes] = useState(likes);

  const date = new Date(createdAt.seconds * 1000).toDateString();

  const handleNavigate = () => {
    if (currentUser) {
      navigate(`/detail/${id}`, { state: { countLikes } });
    } else {
      alert("please sign in to see the blog details.");
      navigate(`/login`);
    }
  };

  const colRef = collection(db, "bloggers");

  const q = query(colRef, orderBy("createdAt"));

  const updateLikes = (id) => {
    const docRef = doc(db, "bloggers", id);
    updateDoc(docRef, {
      ...card,
      likes: countLikes + 1,
    });
  };

  const handleLikes = () => {
    if (currentUser) {
      setCountLikes(countLikes + 1);
      updateLikes(id);
    } else {
      alert("please sign in to like.");
      navigate(`/login`);
    }
  };

  const handleComments = () => {
    if (currentUser) {
      navigate(`/detail/${id}`, { state: { countLikes } });
    } else {
      alert("please sign in to comment.");
      navigate(`/login`);
    }
  };

  return (
    <Card style={{ cursor: "pointer" }}>
      <Image
        src={imageUrl}
        ui={false}
        onClick={handleNavigate}
        style={{ height: "400px" }}
      />
      <Card.Content onClick={handleNavigate}>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{date.substring(4)}</Card.Meta>
        <Card.Description>{`${content.substring(0, 300)}...`}</Card.Description>
      </Card.Content>
      <Card.Content extra onClick={handleNavigate}>
        <Icon name="user" />
        {email}
      </Card.Content>
      <Card.Content
        extra
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Icon name="like" onClick={handleLikes} />
        {countLikes}
        <Icon
          style={{ marginLeft: "10px" }}
          name="comment"
          onClick={handleComments}
        />
        {comments.length}
      </Card.Content>
    </Card>
  );
};

export default BlogCard;
