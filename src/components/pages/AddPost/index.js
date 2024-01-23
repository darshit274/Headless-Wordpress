import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddPost = () => {
    const user = localStorage.getItem('token');
    // console.log("user", user);  
    const formik = useFormik({
       initialValues: {
         title: "",
         description: "",
       },

       validationSchema: Yup.object({
         title: Yup.string().required("Required"),
         description: Yup.string().required("Required"),
       }),

       onSubmit: (values) => {
        const {token} = JSON.parse(user);
        axios.post(`${process.env.REACT_APP_API_URL}/posts`, {
            title : values.title,
            content : values.description,
            status : 'publish'
        },{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if(response.status === 200 && response.statusText === "OK"){
                alert('Successfully added post');
            }
            console.log('response', response);
        }).catch(err => {
            console.log('err:', err.message)
        });
         console.log(JSON.stringify(values, null, 2));
       },
    });
   
    return (
       <div className="w-full max-w-sm mx-auto mt-6">
         <form onSubmit={formik.handleSubmit}>
           <div className="mb-4">
             <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
               Title
             </label>
             <input
               type="text"
               id="title"
               name="title"
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               value={formik.values.title}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
             />
             {formik.touched.title && formik.errors.title ? (
               <div className="text-red-500">{formik.errors.title}</div>
             ) : null}
           </div>
           <div className="mb-4">
             <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
               Description
             </label>
             <textarea
               id="description"
               name="description"
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               value={formik.values.description}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
             />
             {formik.touched.description && formik.errors.description ? (
               <div className="text-red-500">{formik.errors.description}</div>
             ) : null}
           </div>
           <div className="flex items-center justify-between">
             <button
               type="submit"
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
             >
               Add Post
             </button>
           </div>
         </form>
       </div>
    );
   };

export default AddPost;