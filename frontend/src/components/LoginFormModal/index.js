import React, { useState } from 'react';
// import * as sessionActions from '../../store/session';
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import './LoginForm.css'
import LoginForm from './LoginForm';
import { Modal } from '../../context/Modal';

const LoginFormModal = () => {
  const [ showModal, setShowModal ] = useState(false);

  return (
    <div className='buttonDiv'>
      <button className='loginButton' onClick={() => setShowModal(true)}>
        Sign In
      </button>
      { showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </div>
  )
}

// function LoginFormPage() {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user);
//   const [credential, setCredential] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState([]);
//   if (sessionUser) return (
//     <Redirect to="/" />
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors([]);
//     return dispatch(sessionActions.login({ credential, password }))
//       .catch(async (res) => {
//         const data = await res.json();
//         if (data && data.errors) setErrors(data.errors);
//       });
//   }

//   return (
//     <form className='login-form' onSubmit={handleSubmit}>
//       <ul>
//         {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//       </ul>
//       <label>
//         Username or Email
//         <input
//           type="text"
//           value={credential}
//           onChange={(e) => setCredential(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Password
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </label>
//       <button type="submit">Log In</button>
//     </form>
//   );
// } 
  
export default LoginFormModal;  