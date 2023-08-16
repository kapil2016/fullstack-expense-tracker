import SignupForm from "./components/pages/LoginSignup"
// import ExpenseForm from "./components/pages/Home/ExpenseForm"
import HomePage from "./components/pages/Home/HomePage"
import ForgotPassword from "./components/pages/ForgotPassword"
import ResetPassword from "./components/pages/ResetPassword"
import CustomizedSnackbars from "./components/Alert"
import { Routes , Route } from "react-router"
function App() {

  return (
    <>
    <div>
      <CustomizedSnackbars></CustomizedSnackbars>
      <Routes>
        <Route path="/" element={<SignupForm></SignupForm>}></Route>
        <Route path="/home" element={<HomePage/>} ></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>} ></Route>
        <Route path="/reset-password/:uuid" element={<ResetPassword/>} ></Route>
      </Routes>
    </div>
    </>
  )
}

export default App
