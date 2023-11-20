import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <>
        <div className="p-5">
            <ul className="flex justify-end gap-5">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/posts">Posts</Link></li>
            </ul>
        </div>
        </>
    )
}

export default Navigation;