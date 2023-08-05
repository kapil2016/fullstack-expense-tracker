import SignupForm from "./components/pages/LoginSignup"
// import ExpenseForm from "./components/pages/Home/ExpenseForm"
import HomePage from "./components/pages/Home/HomePage"
import { Routes , Route } from "react-router"
function App() {

  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<SignupForm></SignupForm>}></Route>
        <Route path="/home" element={<HomePage/>} ></Route>
      </Routes>
    </div>
    </>
  )
}

export default App
