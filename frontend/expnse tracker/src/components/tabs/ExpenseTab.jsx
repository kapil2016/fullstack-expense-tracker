import { Typography } from "@mui/material";
import ExpenseList from "../pages/Home/Expenses/ExpenseList";
import { useSelector } from "react-redux";
const ExpenseTab = () => {
  const expenses = useSelector((state) => state.expense.expenseList);
  return (
    <div style={{ height: "65vh", overflow: "auto" }}>
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
  );
};

export default ExpenseTab;
