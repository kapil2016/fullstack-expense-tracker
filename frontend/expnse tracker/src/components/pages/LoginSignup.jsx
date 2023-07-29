import React, { useRef, useState } from "react";
import styles from "./LoginSignup.module.css";
import axios from "axios";

function loginSignupHandler(login, details) {
  let url = "http://localhost:3000/login";
  if (!login) {
    url = "http://localhost:3000/signup";
  }
  return axios.post(url, {
    data: details,
  });
}

function SignupForm(props) {
  const [isLogIn, setIsLogin] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!isLogIn) {
      const confirmPassword = confirmPasswordRef.current.value;
      if (!isLogIn && password !== confirmPassword) {
        alert("password missmatch");
        return;
      }
    }

    const details = {
      email: email,
      password: password,
    };
    loginSignupHandler(isLogIn, details)
      .then((res) => {
        console.log(res);
        if(res.data.registerd){
          alert('user login succesfully')
        }
        setIsLogin(true);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        alert(error.response.data.error)
      });
  };

  const handleLoginClick = () => {
    setIsLogin((preState) => !preState);
  };

  return (
    <div className={styles["signup-card"]}>
      <h2>{`${isLogIn ? "Login" : "Sign Up"}`}</h2>
      <form onSubmit={handleSubmit} className={styles["signup-form"]}>
        <label>
          Email:
          <input id="email-input" type="email" ref={emailRef} required />
        </label>
        <label>
          Password:
          <input type="password" ref={passwordRef} required />
        </label>
        {!isLogIn && (
          <label>
            Confirm Password:
            <input type="password" ref={confirmPasswordRef} required />
          </label>
        )}
        <button type="submit">{`${isLogIn ? "Login" : "Sign Up"}`}</button>
      </form>
      {isLogIn ? (
        <p className={styles["forgot-password"]}>
          <a href="/forgot-password">Forgot password?</a>
        </p>
      ) : (
        ""
      )}
      <button className={styles["login-card"]} onClick={handleLoginClick}>
        <p className="login-text">{`${
          isLogIn ? "Create New Account" : "Already Have An Account ? Login"
        }`}</p>
      </button>
    </div>
  );
}

export default SignupForm;
