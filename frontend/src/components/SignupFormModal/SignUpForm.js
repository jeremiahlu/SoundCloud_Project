// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'
import { Link } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";


function SignupFormPage({ LoginFormModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
    <form className='signup-form' onSubmit={handleSubmit}>
      <ul>
        {/* <>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </> */}
      </ul>
      <label className='verification'>
        First Name
        </label>
        <div className='errors'> 
          { errors.status && (
            <h2> 
              Sign up failed: {errors.message}
            </h2>
          )}
        </div>
        <input 
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          />
          <p> {errors.firstName}</p>
      <label className='verification'>
        Last Name
        </label>
        <input 
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
             <p> {errors.lastName}</p>
      <label className='verification'>
        Email
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
             <p> {errors.email}</p>
      <label className='verification'>
        Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
             <p> {errors.username}</p>
      <label className='verification'>
        Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
             <p> {errors.password}</p>
      <label className='verification'>
        Confirm Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className='buttonDiv'>
          <button className='signUpForm-button' type="submit">Sign Up</button>

        </div>
    </form>
        {/* <button className='login' onClick={LoginFormModal}>
          Already have an account?
        </button> */}
    </>
  );
}

export default SignupFormPage;