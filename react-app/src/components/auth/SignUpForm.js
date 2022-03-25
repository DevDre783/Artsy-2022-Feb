import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import * as sessionActions from "../../store/session"
import "./Form.css"

const SignUpForm = () => {
  const [signingupErrors, setSigningupErrors] = useState([]);
  const [errors, setErrors] = useState([])
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  // useEffect(() => {

  //   const signupErrors = [];
  //   const validationErrors = [];

  //   if(username.length > 20) signupErrors.push("Username cannot be longer than 20 characters.");
  //   if(username.length < 4) signupErrors.push("Username must be 4 or more characters");
  //   if(!email.includes("@") || !email.includes(".com")) signupErrors.push("Please provide a valid Email.");
  //   // if(!email.length & !email.includes("@")) signupErrors.push("Must provide an email");
  //   if(!password) signupErrors.push("Please provide a Password.")
  //   if(password !== repeatPassword) signupErrors.push("Password did not match Confirm Password.")

  //   // setSigningupErrors(signupErrors)
  //   setErrors(validationErrors)

  // }, [user, username, email, password, repeatPassword])

  // const handleClick = async (e) => {
  //   e.preventDefault()



  //   await dispatch(sessionActions.signUp(username, email, password))

  //   history.push('/browse')

  // }


  const onSignUp = async (e) => {
    e.preventDefault();

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
      }else {
        setErrors(["Password fields must match!"])
        return
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/browse' />;
  }

  return (
    <>
    <div className="background__container"></div>
      <div className='form__container'>
        <form onSubmit={onSignUp}>
          <div className='errors'>
            {errors.map((error) => (
              <li style={{color: "white"}} key={error}>{error}</li>
            ))}
          </div>
          <div className='form__top__text'>
            <h1>Sign Up</h1>
          {/* <div className='errors'>
            {signingupErrors.map((error) => (
              <li style={{color: "white"}} key={error}>{error}</li>
            ))}
          </div> */}
          </div>
          <div>
            <input
              placeholder='Username'
              type='text'
              name='username'
              required
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <input
              type='email'
              name='email'
              placeholder='Email Address'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='repeat_password'
              placeholder='Confirm Password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
            <button onClick={onSignUp} className='signin__form__btn' type='submit'>Sign Up</button>
        </form>
        <p>Already a member? <Link to={'/login'}>Login</Link></p>
      </div>
    </>
  );
};

export default SignUpForm;
