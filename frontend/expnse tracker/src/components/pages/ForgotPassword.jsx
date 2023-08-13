import { useState } from "react";
import styles from './ForgotPassword.module.css'
import axios from "axios";

async function sendPasswordResetEmail(email) {
 return await axios({
        url:'http://localhost:3000/forgot-password',
        method:"POST" ,
        data:{email:email}
    })
  }
  


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleResetPassword =  (event) => {
    event.preventDefault();
    sendPasswordResetEmail(email).then(res=> {
        setMessage(res.data.message)
        console.log(res.data.message)
    }).catch(err=>{
        console.log(err)
        setMessage("somthing went wrong")
    })
  };

  return (
    <div className={styles['forgot-password-container']}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleResetPassword}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
export default ForgotPassword;