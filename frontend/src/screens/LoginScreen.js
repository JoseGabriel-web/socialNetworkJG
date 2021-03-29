import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginAction } from '../actions/authActions'
import styles from '../css/login/login.module.css'
import Loading from '../components/layout/Loading'
import backgroundImg from '../images/img.jpg'

const LoginScreen = ({history}) => {
  const loginReducer = useSelector(state => state.loginReducer)
  const { loading } = loginReducer
  const userInfoReducer = useSelector(state => state.userInfoReducer)
  const { user } = userInfoReducer
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    return dispatch(loginAction(email, password, history))
  }

  useEffect(() => {
    if(user) return history.push('/home')
  }, [user])

  return (
    <div className={styles.loginContainer}>
      {loading? <Loading /> : (      
        <>  
        <div className={styles.sectionOne}>
          <div className={styles.formContainer}>
            <h1 className={styles.label}>Log In.</h1>
            <form className={styles.form}>
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
                onChange={e => setPassword(e.target.value)}
                value={password}
                type='password'
                placeholder='Enter your password..'
                name='password'
              />
              <button type='submit' onClick={e => handleSubmit(e)}>Log in</button>
            </form>
            <div className={styles.disclaimers}>
              <h4>
                Don't have an account? <Link to='/register'>Sign Up</Link>
              </h4>
              <Link to='/register'>Forgot password?</Link>
            </div>
          </div>
        </div>
  
        <div className={styles.sectionTwo} style={{backgroundImage: `url(${backgroundImg})`}} />
        </>
      )}
    </div>
  )
}

export default LoginScreen
