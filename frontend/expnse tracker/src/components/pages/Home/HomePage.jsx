import axios from "axios";
import ResponsiveAppBar from "../../Header";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./Expenses/ExpenseList";
import { useEffect, useState } from "react";

// const expenses=[{description:'this is a test description' , amount:20 , date:'12-20-2000',category:'food'}]

async function fetchExpenses(idToken) {
  const response = await axios(
    `http://localhost:3000/expenses/?auth=${idToken}`
  );
  const expenses = response.data;
  // console.log(expenses)
  return expenses;
}

async function addExpense(data) {
  const response = await axios(`http://localhost:3000/expenses/`, {
    method: "POST",
    data: data,
  });
  const expense = response.data;
  console.log(expense);
  return expense;
}

async function deletExpense(id) {
  const response = await axios(`http://localhost:3000/expenses/${id}`, {
    method: "DELETE",
  });
  const res = response.data;
  console.log(res);
  return res;
}

async function editExpense(id, details) {
  const response = await axios(`http://localhost:3000/expenses/${id}`, {
    method: "PUT",
    data: details,
  });
  const expense = response.data;
  console.log(expense);
  return expense;
}
const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    fetchExpenses("1")
      .then((data) => {
        setExpenses(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function formSubmitHandler(data) {
    addExpense(data)
      .then((res) => {
        setExpenses((pre) => {
          return [...pre, res];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editExpenseHandler(id, details) {
    editExpense(id, details)
      .then((res) => {
        const index = expenses.findIndex((item) => item.id === id);
        setExpenses((expenses) => {
          expenses[index] = res;
          return [...expenses];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteExpenseHandler(id) {
    deletExpense(id)
      .then(() => {
        const filterdExpenses = expenses.filter((item) => item.id !== id);
        setExpenses([...filterdExpenses]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <div style={{ display: "flex" }}>
        <ExpenseForm onSubmit={formSubmitHandler}></ExpenseForm>
        <ExpenseList
          data={expenses}
          onEdit={editExpenseHandler}
          onDelete={deleteExpenseHandler}
        ></ExpenseList>
      </div>
    </>
  );
};

export default HomePage;
