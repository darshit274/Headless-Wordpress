import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    const auth = localStorage.getItem('token');
    return (
        <>
        <div className="p-5">
            <ul className="flex justify-end gap-5">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/posts">Posts</Link></li>
                {!auth ? (
                    <li><Link to="/Login">Login</Link></li>
                    
                ):(
                    <>
                    <li><Link to="/AddPost">Add Post</Link></li>
                    <li><Link to="/logout">Log-Out</Link></li>
                    </>
                )}
                
            </ul>
        </div>
        </>
    )
}

export default Navigation;