import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../helpers/firebase";
import { useNavigate } from "react-router-dom";
import { Form, Grid, Segment, Button } from "semantic-ui-react";
import { successNote } from "../helpers/toastNotify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(auth.currentUser);
      navigate("/");
      successNote("Logged in succesfully...");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="main">
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ width: 300 }}>
          <h2 className="contact-header" style={{ color: "black" }}>
            Login Menu
          </h2>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Name"
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
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Login;
