import React from "react";
import Posts from "./Posts";
import Home from "./Home";
import { Routes, Route } from 'react-router-dom';
import Navigation from "../common/Navbar";
import Single from "./Single";

const Pages = () => {
    return (
        <>
        <Navigation/>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/posts" element={<Posts />}/>
            <Route path="/posts/:id" element={<Single/>}/>
        </Routes>
        </>
    )
}

export default Pages;