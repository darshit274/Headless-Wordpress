import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({authUser}) {

    if(!authUser?.token){
        return <Navigate to={"/login"} />;
    }
    else{
        return (
            // <div>{authUser ? <Outlet/> : <h1>Please Login</h1>}</div>
            <div><Outlet/></div>
        )
    }
}

export default ProtectedRoute;