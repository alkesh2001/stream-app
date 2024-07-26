import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export  const loginData = createAsyncThunk( "fetchData" , async ({userData})=>{
    // const response = await axios.post('http://localhost:8000/api/v1/user/login' , userData)
    // // if(response.data.accessToken){
    // //     localStorage.setItem("accessToken" , accessToken)
    // // }
    // return response.data
    try {
        const response = await axios.post('http://localhost:8000/api/v1/user/login', userData);
        
        // Save access token to localStorage if available
        if (response.data.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);
        }
        // if(response){
            return response.data;
        // }
        
      } catch (error) {
        // Handle error by rejecting the thunk with an error message
        return rejectWithValue(error.response.data);
      }
      
})


const initialState = {
    visible : true ,
    status : false , 
    accessToken : null ,
    isLoading : false ,
    data : null ,
    isError : false 
};

const authSlice = createSlice({
    name : 'auth',
    initialState ,
    reducers : {
        toggleVisiblity : (state ) => {
            state.visible = !state.visible;
        } , 
        logoutUser : (state)=>{
            state.status = false ,
            state.userData = null
        },
        currentUser : (state , action) =>{
            state.userData = action.payload 
            state.status = true
        }
    } ,
    extraReducers : (builder) =>{
        builder.addCase(loginData.pending , (state , action ) =>{
            state.isLoading = true
        });
        builder.addCase(loginData.fulfilled , (state , action) =>{
            state.isLoading = false ;
            state.status = true
            state.data = action.payload;
        }) ;
        builder.addCase(loginData.rejected , (state , action) =>{
            state.isError = true ;
            console.log('error when user login in auth ' , action.payload)
        });        
    }
})

export const {toggleVisiblity, currentUser , logoutUser} = authSlice.actions;
export default authSlice.reducer;