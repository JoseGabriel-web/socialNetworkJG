import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerAction } from '../actions/authActions'
import { Link } from 'react-router-dom'
import styles from '../css/register/register.module.css'
import Loading from '../components/layout/Loading'
import registerImg from '../images/registerImg.png'

const RegisterScreen = ({ history }) => {
  const dispatch = useDispatch()
  const registerReducer = useSelector((state) => state.registerReducer)
  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const { loading } = registerReducer
  const { user } = userInfoReducer
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) return
    return dispatch(registerAction(name, email, password, history))
  }  

  const updateHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  } 
  
  useEffect(() => {
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight) 
    }, [])  
  
  useEffect(() => {
    updateHeight()  
  }, []) 

  return (
    <div className={styles.registerContainer}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.sectionOne}>
            <div className={styles.formContainer}>
              <h1 className={styles.label}>Register.</h1>
              <form className={styles.form}>
                <label htmlFor='name'>Name:</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type='text'
                  placeholder='Enter your name'
                  name='name'
                />
                <label htmlFor='email'>Email:</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type='email'
                  placeholder='Enter your email..'
                  name='email'
                />
                <label htmlFor='password'>Password:</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type='password'
                  placeholder='Enter your password..'
                  name='password'
                />
                <label htmlFor='confirmPassword'>Confirm Password:</label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  type='password'
                  placeholder='Confirm password'
                  name='confirmPassword'
                />
                <button type='submit' onClick={(e) => handleSubmit(e)}>
                  Log in
                </button>
              </form>
              <div className={styles.disclaimers}>
                <h4>
                  Already have an account? <Link to='/login'>Log in.</Link>
                </h4>
              </div>
            </div>
          </div>

          <div className={styles.sectionTwo} style={{backgroundImage: `url(${registerImg})`}}></div>
        </>
      )}
    </div>
  )
}

export default RegisterScreen
