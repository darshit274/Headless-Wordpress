import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initalState = {
    user: null,
    isLoading : false,
    isError : false,
};

export const login = createAsyncThunk( 'auth/login' ,async ({email, password}) => {
    const data = {username: email, password: password}
    const res = await axios.post(process.env.REACT_APP_API_TOKEN, data);
    return res.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: initalState,
    reducers: {
        logout : (state) =>{
            state.user = null;
        }
    },
    extraReducers : (builder) =>{
        builder.addCase(login.pending , (state)=>{
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled , (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.user = action.payload;
        });
        builder.addCase(login.rejected , (state)=>{
            state.isLoading = false;
            state.isError = true;
        });
    }
});


export const {logout} = authSlice.actions;
export default  authSlice.reducer;