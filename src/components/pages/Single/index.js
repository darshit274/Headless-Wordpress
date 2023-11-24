import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Single = () => {
    const { id } = useParams();
    const [singleData, setSingleData] = useState([]); // Rename state variable

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use the correct environment variable and construct the URL properly
                let url = `${process.env.REACT_APP_API_URL}/posts/${id}`;
                
                const response = await axios.get(url);
                // console.log("Single", response);
                setSingleData(response.data);
            } catch (error) {
                console.error('Error', error.message);
            }
        };
            fetchData(); // Call the fetchData function only if id is defined
    }, [id]); // Include id in the dependency array to re-run the effect when id changes

    return (
        <>
            {
                Object.keys(singleData).length ? (
                    <div className="p-5">
                        <div>
                            <img src= {singleData.featured_src}  alt=""/>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {singleData.title.rendered}
                            </h1>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: singleData.content.rendered }}></p>
                    </div>
                ) : ('Loading....')
            }
        </>
    )
}

export default Single;
