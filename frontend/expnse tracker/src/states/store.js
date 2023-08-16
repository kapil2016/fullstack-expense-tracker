import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth-reducer";
import expenseReducer from "./reducers/expense-reducer";
import alertReducer from "./reducers/alert-reducer";
const store = configureStore({
    reducer:{auth: authReducer , expense:expenseReducer , alert:alertReducer}
})

export default store ;