import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../helpers/firebase";
import { useNavigate } from "react-router-dom";
import { Form, Grid, Segment, Button } from "semantic-ui-react";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const displayName = firstName + " " + lastName;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: displayName });
      console.log(auth.currentUser);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="main">
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ width: 300 }}>
          <h2 className="contact-header" style={{ color: "black" }}>
            Signup Menu
          </h2>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="firstname"
                icon="user"
                iconPosition="left"
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <Form.Input
                fluid
                name="lastname"
                icon="user"
                iconPosition="left"
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="User name"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Input
                fluid
                name="password"
                icon="key"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button color="teal" fluid size="large">
                Signup
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Register;
