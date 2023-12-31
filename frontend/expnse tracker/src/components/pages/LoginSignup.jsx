import React, { useRef, useState , useEffect} from "react";
import styles from "./LoginSignup.module.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIdToken, setPremium } from "../../states/reducers/auth-reducer";

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
  const idToken = useSelector(state=>state.auth.idToken) ;
  const navTo = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(idToken){
      navTo('/home')
    }
  },[idToken])

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!isLogIn) {
      const confirmPassword = confirmPasswordRef.current.value;
      if (!isLogIn && password !== confirmPassword) {
        alert("password missmatch");
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
          console.log('login successful');
          localStorage.setItem('idToken',res.data.idToken)
          localStorage.setItem('isPremium' ,res.data.isPremium )
          dispatch(setIdToken(res.data.idToken))
          dispatch(setPremium(res.data.isPremium))
          return navTo('/home')
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
