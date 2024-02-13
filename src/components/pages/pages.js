import React from "react";
import AllPosts from "./Posts";
import Movies from "./movies";
import Login from "./Login";
import Home from "./Home";
import { Routes, Route } from 'react-router-dom';
import Navigation from "../common/Navbar";
import Single from "./Single";
import AddPost from "./AddPost";
import { useSelector } from "react-redux";
import ProtectedRoute from "./protectedRoutes";

const Pages = () => {
    const authUser = useSelector((state) => state.auth.user);
    return (
        <>
        <Navigation authUser={authUser} /> 
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/posts" element={<AllPosts />}/>
            <Route path="/movies" element={<Movies />}/>
            <Route path="/posts/:id" element={<Single/>}/>
            <Route path="/Login" element={<Login />}/>
            {/* <Route path="/AddPost" element={<ProtectedRoute authUser={authUser}><AddPost /></ProtectedRoute>}/> */}
            <Route element={<ProtectedRoute authUser={authUser}/>}>
                <Route path="/AddPost" element={<AddPost />}/>
            </Route>
        </Routes>
        </>
    )
}

export default Pages;