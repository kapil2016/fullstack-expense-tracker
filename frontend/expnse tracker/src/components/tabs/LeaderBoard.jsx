import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import PremiumComponent from "../BuyPremium";

const expensesData = [
  { username: "John Doe", totalExpense: "$500" },
  { username: "Jane Smith", totalExpense: "$750" },
  { username: "Alice Johnson", totalExpense: "$300" },
  // Add more data as needed
];

const LeaderBoardList = () => {
  const isPremium = useSelector((state) => state.auth.isPremium);

  return (
    <div>
      {!isPremium ? (
        <PremiumComponent />
      ) : (
        <List>
          {expensesData.map((expense, index) => (
            <ListItem key={index} sx={{backgroundColor:'#f5f5f5',marginBottom:'0.5rem',boxShadow:'2px 2px 5px rgba(0, 0, 0, 0.3)',borderRadius:'5px'}}>
              <ListItemText
                primary={expense.username}
                secondary={
                  <Typography variant="body2" color="textSecondary">
                    Total Expense: {expense.totalExpense}
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
