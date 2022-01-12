import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import NewBlog from "../pages/NewBlog";
import UpdateBlog from "../pages/UpdateBlog";
import Details from "../pages/Details";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/detail/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new-blog" element={<NewBlog />} />
        <Route path="/update-blog" element={<UpdateBlog />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
