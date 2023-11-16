import React, {useEffect, useState} from "react";
import axios from "axios";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        let url = process.env.REACT_APP_API_URL + "/posts";
        // let url = "http://localhost/headless/server/wp-json/wp/v2/posts";
        // console.log("API URL:", url);
        axios.get(url).then((res) => {
        // console.log(res.data);
        setPosts(res.data);
       },[]);
        
    });
    

    return (
    <>
     {
        posts.map((post) => { 
            // const html = post.content.rendered;
            return (
                <div key={post._id}>
                    <h2  key={post.id}>{post.title.rendered}</h2>
                    
                    <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
                </div>
            )
        })
     }   
    </>
    );

      
};

export default Posts;