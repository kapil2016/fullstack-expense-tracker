import { createSlice } from "@reduxjs/toolkit";

const initialState = {expenseList :[]}
const expenseSlice = createSlice({
    name:'expense' ,
    initialState ,
    reducers:{
        addNewExpense(state, action){
           state.expenseList.push(action.payload)
        },
        setExpenseList(state , action){
            state.expenseList = action.payload
        },
        deleteExpense(state , action){
           const filterdList = state.expenseList.filter(item=>item.id !== action.payload) ;
           state.expenseList = filterdList ;
        },
        editExpense(state , action){
            const index = state.expenseList.findIndex(item=>item.id === action.payload.id);
            state.expenseList[index] = action.payload.details ;
        }

    }
})

const expenseReducer = expenseSlice.reducer ;
export const {addNewExpense,setExpenseList,deleteExpense,editExpense} = expenseSlice.actions;
export default expenseReducer ;