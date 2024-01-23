import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required("Required"),
    });
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Implement API call or local login validation here
            const {email, password} = values;
            axios.post(`${process.env.REACT_APP_API_TOKEN}`, {
                "username": email,
                "password": password
            }).then(response => {
                if(response.status === 200 && response.statusText === "OK"){
                    localStorage.setItem("token", JSON.stringify(response.data));
                    //alert(response.data.user_nicename);
                    // console.log('Login Successful');
                }
                console.log('response', response);
            }).catch(err => {
                console.log('err:', err.message)
            });
            console.log(values);
        },
    });
    
    return (
        <div>
            <h1 className='font-bold text-6xl text-center mb-5'>Login</h1>
            <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto my-8">
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.errors.email ? <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div> : null}
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.errors.password ? <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div> : null}
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Login
            </button>
        </form>
        </div>
    );



    // return (
    //     <div>Login</div>
    // )
}

export default Login;