import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  if (sessionUser) return <Redirect to="/" />;

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    setCredential("DemoUser");
    setPassword("password");

    let res = await dispatch(
      sessionActions.login({ credential: "DemoUser", password: "password" })
    );
    return res;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        const err = [data.message];
        if (data && data.message) setErrors(err);
      }
    );
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <ul className="login-errors">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      {/* <div className='error'>
        {error.status && Login failed: {errors.message}}
      </div> */}
      {/* <div className='welcomeLogin'>
        Welcome to SoundCloud!
      </div> */}
      <label className="login-form-text">{/* Username or Email */}</label>
      <input
        type="text"
        value={credential}
        onChange={(e) => setCredential(e.target.value)}
        placeholder="Your email address or username"
        required
        className="login-input"
      />
      <label className="password-text">{/* Password */}</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your password"
        required
        className="login-input"
      />
      <div className="buttonDiv">
        <button type="submit" className="si-button">
          <h2 className="si-button-text">Continue</h2>
        </button>

        <div className="auth-method-separator">
          <span className="or"> or </span>
        </div>

        <button onClick={handleGuestLogin} type="submit" className="gsi-button">
          <h2 className="gsi-button-text">Continue as Guest</h2>
        </button>

        <div className="login-form-fine-print">
          <p className="login-form-fine-text">
            {" "}
            When registering, you agree that we may use your provided data for
            the registration and to send you notifications on our products and
            services. You can unsubscribe from notifications at any time in your
            settings. For additional info please refer to our Privacy Policy{" "}
          </p>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
