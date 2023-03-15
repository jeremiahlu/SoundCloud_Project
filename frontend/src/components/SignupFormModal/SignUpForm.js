// frontend/src/components/SignupFormPage/index.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
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
  // const [previewImage, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  // console.log('err', errors)
  // useEffect(() => {
  //   errors && username.length < 4 ? setErrors({ username: "Username must be 4 characters or more"}) : setErrors([])
  // }, [username])

  // useEffect(() => {
  //   errors && firstName.length
  // })

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    setFirstName(firstName.trim());
    setLastName(lastName.trim());
    setUsername(username.trim());

    if (password === confirmPassword) {
      setErrors({});
      return (
        dispatch(
          sessionActions.signup({
            firstName,
            lastName,
            email,
            username,
            password,
            // previewImage,
          })
        )
          // .then(() => {
          //   setFirstName("");
          //   setLastName("");
          //   setUsername("");
          //   setEmail("");
          //   setPassword("");
          //   setImage(null);
          // })
          .catch(async (res) => {
            const data = await res.json();
            // console.log(data)
            // console.log(data.errors)
            if (data && data.errors) setErrors(data.errors);
          })
      );
    }

    return setErrors({
      confirmPW:
        "Confirm Password field must be the same as the Password field",
    });
    // else {
    //   return dispatch(sessionActions.signup({firstName, lastName, email, username, password }))
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     const err = data.errors
    //     console.log('data' ,data )
    //     if (data && data.message) setErrors(err);
    //   });
    // }
  };
  //   if ( username.length < 4 ) return setErrors({ username: "Username must be 4 characters or more" })
  // const updateFile = (e) => {
  //   const file = e.target.files[0];
  //   if (file) setImage(file);
  // };
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (password === confirmPassword) {
  //     setErrors([]);
  //     try {
  //       dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
  //   } catch (res) {
  //     const data = await res.json();
  //     if (data && data.errors) setErrors(data.errors);
  //     setErrors(['Confirm Password field must be the same as the Password field']);

  //     if ( username.length < 4 ) return setErrors({ username: "Username must be 4 characters or more" })
  //   }
  //   return
  //   }
  // };

  return (
    <>
      <form className="signup-form" onSubmit={handleSubmit}>
        {/* <ul className='signup-errors'> */}
        {/* {errors && (
            <h2>
              {errors.message}

            </h2>
      )} */}

        {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
        {/* <label>
          <input type="file" onChange={updateFile} />
        </label> */}
        {/* </ul> */}
        <label className="verification">{/* First Name */}</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder="Your first name"
          className="signup-input"
          pattern="^(?!\s*$).+"
        />
        <p className="signup-errors"> {errors.firstName} </p>
        <label className="verification">{/* Last Name */}</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder="Your last name"
          className="signup-input"
          pattern="^(?!\s*$).+"
        />
        <p className="signup-errors"> {errors.lastName} </p>
        <label className="verification">{/* Email */}</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Your email address"
          className="signup-input"
          // pattern='^(?!\s*$).+'
        />
        <p className="signup-errors"> {errors.email} </p>
        <label className="verification">{/* Username */}</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Your username"
          className="signup-input"
          pattern="^(?!\s*$).+"
        />
        <p className="signup-errors"> {errors.username} </p>
        <label className="verification">{/* Password */}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Choose your password"
          className="signup-input"
          pattern="^(?!\s*$).+"
        />
        <p className="signup-errors"> {errors.password} </p>
        <label className="verification">{/* Confirm Password */}</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm your password"
          className="signup-input"
          pattern="^(?!\s*$).+"
        />
        <p className="signup-errors"> {errors.confirmPW} </p>
        <div className="signup-form-fine-print">
          <p className="signup-form-fine-text">
            By signing up I accept the Terms of Use. I have read and understood
            the Privacy Policy and Cookies Policy.
          </p>
        </div>
        {}
        <div className="buttonDiv">
          <button className="signUpForm-button" type="submit">
            Accept & continue
          </button>
        </div>
        {/* <div className='errors'> 
          { errors && (
            <h2 className='signUp-failed'> 
              Error: Sign up failed
            </h2>
          )}
        </div> */}
        <div className="signup-form-fine-print">
          <p className="signup-form-fine-text">
            {" "}
            When registering, you agree that we may use your provided data for
            the registration and to send you notifications on our products and
            services. You can unsubscribe from notifications at any time in your
            settings. For additional info please refer to our Privacy Policy{" "}
          </p>
        </div>
      </form>
      {/* <button className='login' onClick={LoginFormModal}>
          Already have an account?
        </button> */}
    </>
  );
}

export default SignupFormPage;
