import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/slice/authSlice";

const Navigation = ({authUser}) => {
    // const auth = localStorage.getItem('token');
    const dispatch = useDispatch()
    
    // console.log("auth", authUser);
    return (
        <>
        <div className="p-5">
            <ul className="flex justify-end gap-5">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/posts">Posts</Link></li>
                <li><Link to="/movies">Movies</Link></li>
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