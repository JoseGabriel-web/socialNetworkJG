import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerAction } from '../actions/userActions'
import { Link } from 'react-router-dom'
import styles from '../css/register.module.css'
import Loading from '../components/Loading'

const RegisterScreen = ({history}) => {

  const dispatch = useDispatch()
  const loginReducer = useSelector(state => state.loginReducer)
  const { user } = loginReducer
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) return
    dispatch(registerAction(name, email, password, history))
  }

  const handleAlreadyLogged = () => {
    if(user) return history.push('/home')
    return
  }

  useEffect(
    handleAlreadyLogged
  , [user])

  return (
    <div>
      {user? <Loading /> : (    
        <div className={styles.registerContainer}>
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
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  type='password'
                  placeholder='Enter your password..'
                  name='password'
                />
                <label htmlFor='confirmPassword'>Confirm Password:</label>
                <input
                  onChange={e => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  type='password'
                  placeholder='Confirm password'
                  name='confirmPassword'
                />
                <button type='submit' onClick={e => handleSubmit(e)}>Log in</button>
              </form>
              <div className={styles.disclaimers}>
                <h4>
                  Already have an account? <Link to='/login'>Log in.</Link>
                </h4>            
              </div>
            </div>
          </div>

          <div className={styles.sectionTwo}></div>
        </div>
        )}
    </div>
  )
}

export default RegisterScreen
