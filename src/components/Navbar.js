import React, { useContext, useState, useEffect } from "react";
import githubLogoSvg from "../assets/githublogo.svg";
import { Dropdown } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../helpers/firebase";
import { signOut } from "firebase/auth";
import { successNote } from "../helpers/toastNotify";
import { ToastContainer } from "react-toastify";

const option_signout = ["Login", "Register"];
const option_signin = ["New", "Profile", "Logout"];

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [options, setOptions] = useState(option_signout);

  useEffect(() => {
    if (currentUser) {
      setOptions(option_signin);
    } else {
      setOptions(option_signout);
    }
  }, [currentUser]);

  const userSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      successNote("Logged out succesfully...");
    } catch (err) {
      alert(err.message);
    }
  };

  const navigateToPage = (path) => {
    if (path === "login") {
      return navigate("/login");
    } else if (path === "register") {
      return navigate("/register");
    } else if (path === "profile") {
      return navigate("/profile");
    } else if (path === "new") {
      return navigate("/new-blog");
    } else if (path === "logout") {
      userSignOut();
      return navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <div className="icons">
        <a href="https://github.com/krebyancode" style={{ color: "white" }}>
          <img
            src={githubLogoSvg}
            alt="logo"
            style={{ height: "20px", display: "block" }}
          ></img>
        </a>
        <a className="link" href="/">
          <code>{"<Krebyancode /> "}</code>
        </a>
        <Dropdown icon="user" style={{ cursor: "pointer" }}>
          <Dropdown.Menu>
            {options.map((option, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => navigateToPage(option.toLowerCase())}
              >
                {option}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
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
    </nav>
  );
};

export default Navbar;
