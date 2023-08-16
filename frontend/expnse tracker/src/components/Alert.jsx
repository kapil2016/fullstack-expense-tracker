import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAlertVisibility } from "../states/reducers/alert-reducer";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const alertStates = useSelector((state) => state.alert);
  const { visibilty, message, alertType } = alertStates;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setAlertVisibility(false));
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={visibilty} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
