import React, { useState, useContext } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import defaultUser from "../assets/defaultUser.png";
import { AuthContext } from "../context/AuthContext";
import { db } from "../helpers/firebase";
import { doc, updateDoc } from "firebase/firestore";

const Comments = ({ blogDetail, setCountComments, countComments }) => {
  const { currentUser } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(blogDetail.comments);

  const date = new Date().toLocaleString();

  const addComment = () => {
    const docRef = doc(db, "bloggers", blogDetail.id);
    updateDoc(docRef, {
      ...blogDetail,
      comments: [
        ...comments,
        {
          comment,
          date,
          user: currentUser.email,
        },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, { comment, date, user: currentUser.email }]);
    setCountComments(countComments + 1);
    addComment();
    setComment("");
  };

  return (
    <div className="main">
      <Comment.Group style={{ margin: "auto" }}>
        <Header as="h3" dividing>
          Comments
        </Header>

        {comments.map((comment, index) => (
          <Comment key={index}>
            <Comment.Avatar src={defaultUser} />
            <Comment.Content>
              <Comment.Author as="a">{comment.user}</Comment.Author>
              <Comment.Metadata>
                <div>{`at ${comment.date}`}</div>
              </Comment.Metadata>
              <Comment.Text>{comment.comment}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}

        <Form onSubmit={handleSubmit}>
          <Form.TextArea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            autoFocus
          />
          <Button
            style={{ marginBottom: "1rem" }}
            content="Add Comment"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Comment.Group>
    </div>
  );
};

export default Comments;
