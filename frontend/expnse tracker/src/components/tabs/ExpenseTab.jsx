import { Typography } from "@mui/material";
import ExpenseList from "../pages/Home/Expenses/ExpenseList";
import { Pagination } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setExpenseList } from "../../states/reducers/expense-reducer";
import axios from "axios";

async function fetchExpenses(idToken, page) {
  const response = await axios.get(`http://localhost:3000/expenses/`, {
    headers: {
      Authorization: idToken,
    },
    params:{
      page:page , 
      size:3
    }
  });
  const data = response.data;
  return data;
}

const ExpenseTab = () => {
  const expenses = useSelector((state) => state.expense.expenseList);
  const idToken = useSelector((state) => state.auth.idToken);
  const [pageCount, setPageCount] = useState(0);
  const dispatch = useDispatch();
  console.log(idToken);
  useEffect(() => {
    fetchExpenses(idToken, 1)
      .then((data) => {
        setPageCount(data.maxPageCount);
        dispatch(setExpenseList(data.expenses));
      })
      .catch((err) => console.log(err));
  }, []);

  function pageChangeHandler(event, page) {
    fetchExpenses(idToken, page)
      .then((data) => {
        dispatch(setExpenseList(data.expenses));
      })
      .catch(console.log);
  }
  return (
    <div>
      <div style={{ height: "60vh", overflow: "auto" }}>
        <ExpenseList></ExpenseList>
        {expenses.length === 0 && (
          <div
            style={{
              height: "65vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography> Add Expense </Typography>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Pagination
          count={pageCount}
          onChange={pageChangeHandler}
          color="primary"
        />
      </div>
    </div>
  );
};

export default ExpenseTab;
