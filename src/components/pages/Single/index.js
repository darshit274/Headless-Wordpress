import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Single = () => {
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use the correct environment variable and construct the URL properly
                let url = `${process.env.REACT_APP_API_URL}/posts/${id}`;
                
                const response = await axios.get(url);
                console.log("Single", response);
            } catch (error) {
                console.error('Error', error.message);
            }
        };
            fetchData(); // Call the fetchData function only if id is defined
    }, [id]); // Include id in the dependency array to re-run the effect when id changes

    return (
        <>
            single Post {id}
        </>
    )
}

export default Single;
