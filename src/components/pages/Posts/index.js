import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
  <div className="flex flex-wrap m-3">
    {
    Object.keys(posts).length ? posts.map((post) => {
    // const html = post.content.rendered;
    return (
    <div className="w-full sm:w-1/2 md:w-1/3 flex flex-col p-3">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
        <Link to={`/posts/${post.id}`}>
        <div className="bg-cover h-48" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523978591478-c753949ff840?w=900)' }}></div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="mb-4 text-2xl" key={post.id}>{post.title.rendered}</h3>
          <div className="mb-4 text-grey-darker text-sm flex-1">
            <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
          </div>
        </div>
        </Link>
      </div>
    </div>
    );
    }) : ('Loading....')
    }
  </div>
</>
);
};

export default Posts;