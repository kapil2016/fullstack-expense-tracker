import React from "react";
import ExpenseCard from "./ExpenseCard";
import { useSelector } from "react-redux";

const ExpenseList = () => {
  const expenses = useSelector((state) => state.expense.expenseList);

  return (
    <>
      {expenses.map((item) => {
        const date = new Date(item.date);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "long" });
        const year = date.getFullYear();
        return (
          <ExpenseCard
            id={item.id}
            date={item.date}
            key={item.id}
            description={item.title}
            amount={item.amount}
            day={day}
            month={month}
            year={year}
            category={item.category}
          />
        );
      })}
    </>
  );
};

export default ExpenseList;
