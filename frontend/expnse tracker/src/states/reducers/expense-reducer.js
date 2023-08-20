import { createSlice } from "@reduxjs/toolkit";

const initialState = {expenseList :[] , maxPagesCount:0 , curruntPage:1}
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
        },
        setMaxPagesCount(state , action){
            state.maxPagesCount = action.payload ;
        },
        setCurrentPage(state , action){
            state.curruntPage = action.payload ;
        }

    }
})

const expenseReducer = expenseSlice.reducer ;
export const {addNewExpense,setExpenseList,deleteExpense,editExpense} = expenseSlice.actions;
export default expenseReducer ;