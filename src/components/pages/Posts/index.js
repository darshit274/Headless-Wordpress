import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllPosts = () => {
const [posts, setPosts] = useState([]);
const [totalpages, setTotalPages] = useState(1);
const [currentpage, setCurrentpage] = useState(1);

const postslist = useCallback(async () => {
  try {
  let url = process.env.REACT_APP_API_URL + `/posts?per_page=5&page=${currentpage}`;
  // let url = "http://localhost/headless/server/wp-json/wp/v2/posts";
  // console.log("API URL:", url);
  const response = await axios.get(url);
  // console.log(response.data);
  setTotalPages(Number(response.headers['x-wp-totalpages']))
  setPosts(response.data);
  } catch (error) {
  console.error("Error fetching data:", error);
  }
  },[currentpage]);
  
useEffect(() => {
  postslist();
 // Call the fetchData function
}, [postslist]); // Empty dependency array to run the effect only once

return (

  <>
  <div className="flex flex-wrap m-3">
    {(Object.keys(posts).length ) ? (
      <>
        {posts.map((post) => (
          <div className="w-full sm:w-1/2 md:w-1/3 flex flex-col p-3" key={post.id}>
            {/* ... rest of your post JSX ... */}
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
        ))}
      </>
    ) : (
      'Loading....' 
    )}
  </div>
  {/* pagination */}
  {/* <div className="flex items- justify-between mt-6 border-b border-gray-200 pb-2">
    <button className="text-gray-600 hover:text-gray-900 font-medium py-2 px-4 rounded-md" 
      disabled={currentpage === 1}
      onClick={() => setCurrentpage(currentpage-1)}>
      Previous
    </button>
    <div className="flex space-x-2">
      <button className="text-gray-600 hover:text-gray-900 font-medium py-2 px-4 rounded-md">{currentpage}</button>
      <button className="text-gray-600 hover:text-gray-900 font-medium py-2 px-4 rounded-md">{totalpages}</button>
    </div>
    <button className="text-gray-600 hover:text-gray-900 font-medium py-2 px-4 rounded-md" 
      disabled={currentpage === totalpages}
      onClick={() => setCurrentpage(currentpage+1)}>
      Next
    </button>
  </div> */}


    <div class="flex items-center  justify-between mt-6 border-b border-gray-20 pb-2">
      <button class="text-gray-60 hover:text-gray900 font-medium py- px-4 roundedmd disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentpage === 1}
        onClick={() => setCurrentpage(currentpage - 1)}>
        Previous
      </button>
      <div class="flex space-x-2">
        <button class="text-gray-600 hover:text-gray-900 font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentpage === 1}>
          {currentpage}
        </button>
        <span class="text-gray-400">/</span>
        <button class="text-gray-600 hover:text-gray-900 font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentpage === totalpages}>
          {totalpages}
        </button>
      </div>
      <button class="text-gray-600 hover:text-gray-900 font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentpage === totalpages}
        onClick={() => setCurrentpage(currentpage + 1)}>
        Next
      </button>
    </div>

</>
);
};

export default AllPosts;