import React, { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = process.env.REACT_APP_API_URL + "/posts";
        // let url = "http://localhost/headless/server/wp-json/wp/v2/posts";
        // console.log("API URL:", url);
        const response = await axios.get(url);
        // console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function

  }, []); // Empty dependency array to run the effect only once

  return (
    <>
      {posts.map((post) => {
        // const html = post.content.rendered;
        return (
          <div key={post.id}>
            <h2 key={post.id}>{post.title.rendered}</h2>
            <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
          </div>
        );
      })}
    </>
  );
};

export default Posts;
