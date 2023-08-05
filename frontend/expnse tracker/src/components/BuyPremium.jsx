import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPremium } from "../states/reducers/auth-reducer";

async function createOrder(idToken) {
  const res = await axios("http://localhost:3000/create-order", {
    method: "POST",
    headers:{Authorization:idToken},
    data: {},
  });
  return res.data.order;
}
const PremiumComponent = () => {
  const idToken = useSelector((state) => state.auth.idToken);
  const dispatch = useDispatch();
  function buyPremiumHandler() {
    createOrder(idToken).then((order) => {
      console.log(order);
      const { id, currency, amount } = order;
      const razorpayOptions = {
        key: "rzp_test_8r8KzW3gOUvR8E",
        amount: amount, // Amount in paise (e.g., 10000 paise = Rs 100)
        currency: currency,
        image:
          "https://w7.pngwing.com/pngs/993/618/png-transparent-money-money-logo-grass-product-thumbnail.png",
        order_id: id, // You'll get this from the server after creating an order
        handler: async function (response) {
          // This function will be called after a successful payment
          const res = await axios("http://localhost:3000/verify-payment", {
            method: "POST",
            headers: { Authorization: idToken },
            data: response,
          });
          const isPremium  = res.data.isPremium
          dispatch(setPremium(isPremium));
          console.log(isPremium);
        },
        theme: {
          color: "#F37254",
        },
      };
      const rzp = new window.Razorpay(razorpayOptions);
      rzp.open();
    });
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="50vh"
      width="100%"
    >
      <Button variant="contained" color="primary" onClick={buyPremiumHandler}>
        Buy Premium
      </Button>
      <Typography variant="body1" color="textSecondary">
        Leaderboard only visible to premium users.
      </Typography>
    </Box>
  );
};

export default PremiumComponent;
