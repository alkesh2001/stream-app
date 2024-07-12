import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

createAsyncThunk

const initialState ={
    visible : true , 
    userData : null ,
    status : false , 
    accessToken : null
};

const authSlice = createSlice({
    name : 'auth',
    initialState ,
    reducers : {
        toggleVisiblity : (state ) => {
            state.visible = !state.visible;
        },
        loginUser : (state , action) =>{
            state.status = true ,
            state.userData = action.payload;
        },
        userAccessToken : (state , action) =>{
            state.status = true ,
            state.accessToken = action.payload
        } ,
        logoutUser : (state)=>{
            state.status = false ,
            state.userData = null
        }
    }
})

export const {toggleVisiblity, loginUser , logoutUser , userAccessToken} = authSlice.actions;
export default authSlice.reducer;