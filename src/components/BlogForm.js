import React, { useContext, useState } from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import { db } from "../helpers/firebase";
import {
  collection,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { successNote } from "../helpers/toastNotify";
import { useLocation } from "react-router-dom";
import Comments from "../components/Comments";

const BlogForm = ({ blogDetail }) => {
  const location = useLocation();
  const count = location.state.countLikes;

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const { id, content, email, imageUrl, title, createdAt } = blogDetail;

  const [countLikes, setCountLikes] = useState(count);
  const [countComments, setCountComments] = useState(
    blogDetail.comments.length
  );

  const date = new Date(createdAt.seconds * 1000).toDateString();

  const deleteCard = async (id) => {
    const docRef = doc(db, "bloggers", id);
    deleteDoc(docRef).then(() => {
      navigate("/");
      successNote("Deleted succesfully...");
    });
  };

  const handleUpdate = () => {
    navigate("/update-blog", { state: { blogDetail } });
  };

  const colRef = collection(db, "bloggers");

  const q = query(colRef, orderBy("createdAt"));

  const updateLikes = (id) => {
    console.log(countLikes);
    const docRef = doc(db, "bloggers", id);
    updateDoc(docRef, {
      ...blogDetail,
      likes: countLikes + 1,
    });
  };

  const handleLikes = () => {
    setCountLikes(countLikes + 1);
    updateLikes(id);
  };

  return (
    <>
      <Card.Group itemsPerRow={1} style={{ margin: "auto", width: "40%" }}>
        <Card>
          <Image src={imageUrl} ui={false} style={{ height: "700px" }} />
          <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>{date.substring(4)}</Card.Meta>
            <Card.Description>{content}</Card.Description>
          </Card.Content>
          <Card.Content extra>
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
            <Icon style={{ marginLeft: "10px" }} name="comment" />
            {countComments}
          </Card.Content>
        </Card>
      </Card.Group>
      {currentUser.email === email && (
        <Button.Group style={{ marginBottom: "1rem" }}>
          <Button positive onClick={handleUpdate}>
            Update
          </Button>
          <Button
            negative
            onClick={() => deleteCard(id)}
            style={{ marginLeft: "1rem" }}
          >
            Delete
          </Button>
        </Button.Group>
      )}
      <Comments
        blogDetail={blogDetail}
        setCountComments={setCountComments}
        countComments={countComments}
      />
    </>
  );
};

export default BlogForm;
