import { useState } from "react";
import styles from './ForgotPassword.module.css'
import axios from "axios";
import { useNavigate, useParams } from "react-router";

async function resetPassword(password , uuid) {
 return await axios({
        url:`http://localhost:3000/reset-password/${uuid}`,
        method:"POST" ,
        data:{password:password}
    })
  }
  


function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const params = useParams();
  const navTo = useNavigate();
  const uuid = params.uuid

  const handleResetPassword =  (event) => {
    event.preventDefault();
    if(password !== confirmPassword){
        alert('password mismatch')
    }
    resetPassword(password,uuid).then(res=> {
        setMessage(res.data.message)
        navTo('/')
        console.log(res)
    }).catch(err=>{
        console.log(err)
        setMessage("somthing went wrong")
    })
  };

  return (
    <div className={styles['forgot-password-container']}>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
         <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
export default ResetPassword;