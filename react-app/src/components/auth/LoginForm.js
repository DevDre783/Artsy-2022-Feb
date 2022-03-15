import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import * as sessionActions from "../../store/session"
import "./Form.css"


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();


  // const handleClick = async (e) => {
  //   await dispatch(sessionActions.login( email, password))

  //   // history.push('/profiles')
  // }

  const handleClick = async (e) => {
    e.preventDefault()

    const loginErrors = [];

    if(!email.includes("@")) loginErrors.push("Please provide a valid Email");
    if (!password) loginErrors.push("Please provide your password")

    if (loginErrors.length > 0) {
      return setErrors(loginErrors)
    } else {
      await dispatch(sessionActions.login(email, password))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors)
        });
      history.push('/browse')
    }
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <div className="background__container"></div>
      <div className='form__container'>
        <form onSubmit={onLogin}>
          <div className='form__top__text'>
            <h1>Sign In</h1>
          <div>
            {errors.map((error) => (
              <li style={{color: "white"}} key={error}>{error}</li>
            ))}
          </div>
          </div>
          <div>
            <input
              name='email'
              type='text'
              placeholder='Email Address'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <input
              name='password'
              type='Password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
            <button onClick={handleClick} className='signin__form__btn' type='submit'>Sign In</button>
        </form>
        <p>New to Artsy? <Link to={'/sign-up'}>Sign up now.</Link></p>
      </div>
    </>
  );
};

export default LoginForm;
