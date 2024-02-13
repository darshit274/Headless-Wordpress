import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Movies = () => {
const [movies, setmovies] = useState([]);
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
  movieslist();
 // Call the fetchData function
}, []); // Empty dependency array to run the effect only once

return (

  <>
  <div className="flex flex-wrap m-3">
    {(Object.keys(movies).length) ? (
      <>
        {movies.map((movie) => (
          <div className="w-full sm:w-1/2 md:w-1/3 flex flex-col p-3" key={movie.id}>
            {/* ... rest of your movie JSX ... */}
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
        ))}
      </>
    ) : (
      'Loading....' 
    )}
  </div>
  {/* pagination */}
  <div class="flex items- justify-between mt-6 border-b border-gray-200 pb-2">
    <button class="text-gray-600 hover:text-gray-900 font-medium py-2 px-4 rounded-md">
      Previous
    </button>
    <div class="flex space-x-2">
      <button class="text-gray-600 hover:text-gray-900 font-medium py-2 px-4 rounded-md">1</button>
      <button class="text-gray-600 hover:text-gray-900 font-medium py-2 px-4 rounded-md bg-gray-100">2</button>
      <button class="text-gray-600 hover:text-gray-900 font-medium py-2 px-4 rounded-md">3</button>
    </div>
    <button class="text-gray-600 hover:text-gray-900 font-medium py-2 px-4 rounded-md">
      Next
    </button>
  </div>

</>
);
};

export default Movies;
