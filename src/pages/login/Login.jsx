import { sendEmailVerification } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { auth } from "../../config/FirebaseConfig";
import firebaseContex from "../../context/FirebaseContex";
import "./Login.css";
import "../signup/Signup.css";
import { RiMailSendFill } from "react-icons/ri";
import handleGoogleLogin from "./GoogleLogin";

const Login = () => {
  const { login, facebookLogin } = useContext(firebaseContex);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const invalid = password.length < 6 || email === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loginUser = await login(email, password);
      if (auth.currentUser.emailVerified) {
        localStorage.setItem("authUser", JSON.stringify(loginUser.user));
        setLoading(false);
        window.location.href = "/";
      } else {
        setErrorMessage("Your email not verified yet.");
        await sendEmailVerification(auth.currentUser);
        setLoading(false);
        setIsEmailSend(true);
        // wait until email verify
        let interval = setInterval(async () => {
          if (auth.currentUser.emailVerified) {
            clearInterval(interval);
            localStorage.setItem("authUser", JSON.stringify(loginUser.user));
            window.location.href = "/";
            setIsEmailSend(false);
          }
          await auth.currentUser.reload();
        }, 2000);
      }
    } catch (error) {
      e.target.reset();
      setLoading(false);
      setErrorMessage(error.message.replace("Firebase:", ""));
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  useEffect(() => {
    document.title = "Login • Instagram";
  }, []);

  return (
    <div className="login-container">
      <div className="login-poster">
        <img
          src="/images/iphone.png"
          alt="iphone-poster"
          className="login-poster-image"
        />
      </div>
      <div className="login-wrapper">
        <div className="login-box">
          <div className="logo-wrapper">
            <img src="\public\logo.png" alt="logo" className="instagram-logo" />
          </div>
          {!isEmailSend ? (
            <div className="login-form-wrapper">
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-label">
                  <input
                    type="email"
                    placeholder="Email address"
                    aria-label="Enter your email address"
                    aria-required="true"
                    autoComplete="off"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-label">
                  <input
                    type="password"
                    placeholder="Password"
                    aria-label="Enter your password"
                    aria-required="true"
                    autoComplete="off"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="button-wrapper ">
                  <button
                    disabled={invalid}
                    type="submit"
                    className="login-button cur-point"
                    style={{ opacity: (invalid || loading) && "0.5" }}
                  >
                    Log In
                  </button>
                  {loading && <Loading />}
                </div>
              </form>
              {errorMessage && <p className="errorMessage">{errorMessage}</p>}
              <div className="page-break">
                <div className="line"></div>
                <span className="text">OR</span>
                <div className="line"></div>
              </div>
              <div className="google-auth">
                <Link
                  onClick={handleGoogleLogin}
                  className="google-button-login cur-point"
                >
                  Log in with Google
                </Link>
              </div>
              <div className="forgot-wrapper">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            </div>
          ) : (
            // email send confirmation
            <div className="signup-confirm-email-wrapper">
              <RiMailSendFill size={100} color="#0095f6" />

              <p className="confirm-email-message">
                Your email address has not been verified yet. Please check your
                inbox or spam folder for the verification link 📧🔍
              </p>
            </div>
          )}
        </div>
        <div className="redirect-box login-box">
          <div className="redirect-text">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="cur-point">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <div className="get-app">
          <p className="get-app-title">Get the app.</p>
          <img
            src="\images\playstore.png"
            alt="playstore"
            className="playstore-img"
          />
          <img
            src="\images\microsoft.png"
            alt="microsoft"
            className="microsoft-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
