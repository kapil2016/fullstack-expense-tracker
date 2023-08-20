import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import PremiumComponent from "../BuyPremium";
import { useEffect, useState } from "react";
import axios from "axios";

async function fetchLeaderboard(idToken , page) {
  const response = await axios.get(`http://localhost:3000/leaderboard/`, {
    headers: {
      Authorization: idToken,
    },
    params:{
      page:page,
      size:10
    }
  });
  const expenses = response.data;
  return expenses;
}

const LeaderBoardList = () => {
  const [expensesData, setExpensesData] = useState([]);
  const isPremium = useSelector((state) => state.auth.isPremium);
  const idToken = useSelector((state) => state.auth.idToken);
  const [pageCount , setPageCount] = useState(1)
  useEffect(() => {
    if (isPremium) {
      fetchLeaderboard(idToken).then((data) => {
        setExpensesData(data.users);
        setPageCount(data.maxPageCount)
      });
    }
  }, [isPremium]);

  function pageChangeHandler(event, page) {
    fetchExpenses(idToken, page)
      .then((data) => {
        setExpensesData(data.users);
      })
      .catch(console.log);
  }

  return (
    <div>
      <div style={{ height: "60vh", overflow: "auto" }}>
        {!isPremium ? (
          <PremiumComponent />
        ) : (
          <List>
            {expensesData.map((expense, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: "#f5f5f5",
                  marginBottom: "0.5rem",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                  borderRadius: "5px",
                }}
              >
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

export default LeaderBoardList;
