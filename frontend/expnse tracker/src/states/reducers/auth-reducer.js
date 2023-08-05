import { createSlice } from "@reduxjs/toolkit";
const useridToken = localStorage.getItem("idToken")

const initialState = {isLoggedIn:!!useridToken , idToken:useridToken, userID : null, isPremium : false}
const authSlice = createSlice({
    name:'auth' ,
    initialState ,
    reducers:{
        setLogin(state , action){
            state.isLoggedIn = action.payload ;
        },
        setIdToken(state ,action){
            state.idToken = action.payload ;
        },
        setUserID(state , action){
            state.userID = action.payload ;
        },
        setPremium(state,action){
            state.isPremium = action.payload;
        }

    }
})

const authReducer = authSlice.reducer ;
export const {setLogin,setIdToken,setUserID,setPremium} = authSlice.actions;
export default authReducer ;