import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    visible : true
}

const visibleSlice = createSlice({
    name : 'visible',
    initialState ,
    reducers : {
        toggleVisiblity : (state ) => {
            state.visible = !state.visible
        }
       
    }
})


export const {toggleVisiblity} = visibleSlice.actions

export default visibleSlice.reducer