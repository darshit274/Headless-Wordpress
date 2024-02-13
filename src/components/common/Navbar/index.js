import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/slice/authSlice";

const Navigation = () => {
    // const auth = localStorage.getItem('token');
    const dispatch = useDispatch()
    const authUser = useSelector((state) => state.auth.user);
    console.log("auth", authUser);
    return (
        <>
        <div className="p-5">
            <ul className="flex justify-end gap-5">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/posts">Posts</Link></li>
                {!authUser?.token ? (
                    <li><Link to="/Login">Login</Link></li>
                    
                ):(
                    <>
                    <li><Link to="/AddPost">Add Post</Link></li>
                    <li><Link to="/Profiles">HI {authUser.user_display_name}</Link></li>
                    <li><button onClick={()=>dispatch(logout())}>Log-Out</button></li>
                    </>
                )}
                
            </ul>
        </div>
        </>
    )
}

export default Navigation;