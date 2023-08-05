import axios from "axios";
import ResponsiveAppBar from "../../Header";
import ExpenseForm from "./ExpenseForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpenseList } from "../../../states/reducers/expense-reducer";
import FullWidthTabs from "../../tabs/TabsContainer";


async function fetchExpenses(idToken) {
  const response = await axios.get(
    `http://localhost:3000/expenses/`,{
        headers:{
            Authorization:idToken,
        }
    }
  );
  const expenses = response.data;
  return expenses;
}


const HomePage = () => {
  const idToken = useSelector(state=>state.auth.idToken) ;
  const dispatch = useDispatch();
  console.log(idToken);
  useEffect(() => {
    fetchExpenses(idToken)
      .then((data) => {
        dispatch(setExpenseList(data))
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <div style={{ display: "flex" }}>
        <ExpenseForm></ExpenseForm>
        <FullWidthTabs></FullWidthTabs>
      </div>
    </>
  );
};

export default HomePage;
