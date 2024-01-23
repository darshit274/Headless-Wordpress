import React from "react";
import Posts from "./Posts";
import Login from "./Login";
import Home from "./Home";
import { Routes, Route } from 'react-router-dom';
import Navigation from "../common/Navbar";
import Single from "./Single";
import AddPost from "./AddPost";

const Pages = () => {
    return (
        <>
        <Navigation/>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/posts" element={<Posts />}/>
            <Route path="/posts/:id" element={<Single/>}/>
            <Route path="/Login" element={<Login />}/>
            <Route path="/AddPost" element={<AddPost />}/>
        </Routes>
        </>
    )
}

export default Pages;