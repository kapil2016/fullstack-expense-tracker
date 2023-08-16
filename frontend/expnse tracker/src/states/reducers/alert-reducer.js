import { createSlice } from "@reduxjs/toolkit";
const initialState = {visibilty:false , message:'test' , alertType:'success'}
const alertSlice = createSlice({
    name:'alert',
    initialState,
    reducers:{
        setAlertVisibility(state , action){
            state.visibilty=action.payload
        },
        setAlertMessage(state , action){
            state.message = action.payload ;
        },
        setAlertType(state , action){
            state.alertType = action.payload
        }
    }
})
 const alertReducer = alertSlice.reducer ;
 export const {setAlertVisibility , setAlertMessage , setAlertType} = alertSlice.actions ;
 export default alertReducer ;
 
