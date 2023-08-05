import { createSlice } from "@reduxjs/toolkit";
const useridToken = localStorage.getItem("idToken")
const isPremium = localStorage.getItem('isPremium')

const initialState = {isLoggedIn:!!useridToken , idToken:useridToken, userID : null, isPremium : isPremium}
const authSlice = createSlice({
    name:'auth' ,
    initialState ,
    reducers:{
        setIdToken(state ,action){
            state.idToken = action.payload ;
        },
        setPremium(state,action){
            state.isPremium = action.payload;
        }

    }
})

const authReducer = authSlice.reducer ;
export const {setLogin,setIdToken,setUserID,setPremium} = authSlice.actions;
export default authReducer ;