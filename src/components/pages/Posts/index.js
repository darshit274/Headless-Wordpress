import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllPosts = () => {
const [posts, setPosts] = useState([]);
const [movies, setmovies] = useState([]);

const postslist = async () => {
  try {
  let url = process.env.REACT_APP_API_URL + "/posts?_embed";
  // let url = "http://localhost/headless/server/wp-json/wp/v2/posts";
  // console.log("API URL:", url);
  const response = await axios.get(url);
  // console.log(response.data);
  setPosts(response.data);
  } catch (error) {
  console.error("Error fetching data:", error);
  }
  };
  
  const movieslist = async () => {
    try {
    let url = process.env.REACT_APP_API_URL + "/movies?_embed";
    const response = await axios.get(url);
    // console.log(response.data);
    setmovies(response.data);
    } catch (error) {
    console.error("Error fetching data:", error);
    }
    };


useEffect(() => {
  postslist();
  movieslist();
 // Call the fetchData function
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
        <Link to={`${post.link}`}>
        <div className="bg-cover h-48" style={{  backgroundImage: post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.full?.source_url ??
        'url(https://images.unsplash.com/photo-1523978591478-c753949ff840?w=900)' }}></div>
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

{
    Object.keys(movies).length ? movies.map((movie) => {
    // const html = post.content.rendered;
    return (
    <div className="w-full sm:w-1/2 md:w-1/3 flex flex-col p-3">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
        <Link to={`${movie.link}`}>
        <div className="bg-cover h-48" style={{ backgroundImage: `url(${movie._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url})` }}></div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="mb-4 text-2xl" key={movie.id}>{movie.title.rendered}</h3>
          <div className="mb-4 text-grey-darker text-sm flex-1">
            <p dangerouslySetInnerHTML={{ __html: movie.content.rendered }}></p>
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

export default AllPosts;