import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import PremiumComponent from "../BuyPremium";
import {useEffect , useState} from 'react' ;
import axios from "axios";


async function fetchLeaderboard(idToken) {
  const response = await axios.get(
    `http://localhost:3000/leaderboard/`,{
        headers:{
            Authorization:idToken,
        }
    }
  );
  const expenses = response.data;
  return expenses;
}



const LeaderBoardList = () => {
  const [expensesData , setExpensesData] = useState([])
  const isPremium = useSelector((state) => state.auth.isPremium);
  const idToken = useSelector((state) => state.auth.idToken);

  useEffect(()=>{
    if(isPremium){
      fetchLeaderboard(idToken).then(expenses=>{
        console.log(expenses);
        setExpensesData(expenses)
      })
    }
  },[isPremium])

  return (
    <div style={{height:'68vh', overflow:"auto"}}>
      {!isPremium ? (
        <PremiumComponent />
      ) : (
        <List>
          {expensesData.map((expense, index) => (
            <ListItem key={index} sx={{backgroundColor:'#f5f5f5',marginBottom:'0.5rem',boxShadow:'2px 2px 5px rgba(0, 0, 0, 0.3)',borderRadius:'5px'}}>
              <ListItemText
                primary={expense.email}
                secondary={
                  <Typography variant="body2" color="textSecondary">
                    Total Expense: {expense.totalamount}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default LeaderBoardList;
