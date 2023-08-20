import ResponsiveAppBar from "../../Header";
import ExpenseForm from "./ExpenseForm";
import FullWidthTabs from "../../tabs/TabsContainer";

const HomePage = () => {
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
