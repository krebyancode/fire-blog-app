import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Card, Image } from "semantic-ui-react";
import defaultUser from "../assets/defaultUser.png";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  const {
    displayName,
    email,
    photoURL,
    metadata: { creationTime },
  } = currentUser;

  // const date = new Date(createdAt.seconds * 1000).toDateString();

  return (
    <div className="profile">
      <Card>
        <Image
          src={photoURL ? photoURL : defaultUser}
          style={{ backgroundSize: "cover" }}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header content={displayName} />
          <Card.Meta content={`joined at ${creationTime.substring(5, 16)}`} />
          <Card.Description content={email} />
        </Card.Content>
      </Card>
    </div>
  );
};

export default Profile;
