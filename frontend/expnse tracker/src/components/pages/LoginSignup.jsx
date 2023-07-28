import React, {  useRef, useState } from "react";
import styles from './LoginSignup.module.css'

function SignupForm(props) {
  const[isLogIn,setIsLogin]=useState(false)
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  const handleLoginClick = () => {
    setIsLogin((preState) => !preState);
  };

  return (
    <div className={styles['signup-card']}>
      <h2>{`${isLogIn ? "Login" : "Sign Up"}`}</h2>
      <form onSubmit={handleSubmit} className={styles['signup-form']}>
        <label>
          Email:
          <input
            id="email-input"
            type="email"
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {!isLogIn && (
          <label>
            Confirm Password:
            <input
              type="password"
              ref={confirmPasswordRef}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        )}
        <button type="submit">{`${isLogIn ? "Login" : "Sign Up"}`}</button>
      </form>
      {isLogIn ? (
        <p className={styles['forgot-password']}>
          <a href="/forgot-password">Forgot password?</a>
        </p>
      ) : (
        ""
      )}
      <button className={styles['login-card']} onClick={handleLoginClick}>
        <p className="login-text">{`${
          isLogIn ? "Create New Account" : "Already Have An Account ? Login"
        }`}</p>
      </button>
    </div>
  );
}

export default SignupForm;