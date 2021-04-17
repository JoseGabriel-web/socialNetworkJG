import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginAction } from '../actions/authActions'
import styles from '../css/login/login.module.css'
import Loading from '../components/layout/Loading'
import backgroundImg from '../images/loginImg.jpg'

const LoginScreen = ({history}) => {
  const loginReducer = useSelector(state => state.loginReducer)
  const { loading, error } = loginReducer
  const userInfoReducer = useSelector(state => state.userInfoReducer)
  const { user } = userInfoReducer
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    return dispatch(loginAction(email, password, history))
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
    <div className={styles.loginContainer}>
      {loading? <Loading /> : (      
        <>  
        <div className={styles.sectionOne}>
          <div className={styles.formContainer}>
            <h1 className={styles.label}>Log In.</h1>
            <form className={styles.form}>              

            <label htmlFor='email'>Email:</label>

            <div className={styles.inputAndTooltipContainer}>
              <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type='email'
                  placeholder='Enter your email..'
                  name='email'
                />

              <div>                              
                <div
                  className={`${
                    error && error.field === 'email'
                      ? 'fas fa-times-circle'
                      : 'fas fa-info-circle'
                  } ${styles.tooltip}`}
                >
                </div>
                <div className={styles.tooltipText}>
                  {error && error.field === 'email'
                        ? error.message
                        : 'Here goes errors'
                    }
                </div>              
              </div>

            </div>

            <label htmlFor='password'>Password:</label>

            <div className={styles.inputAndTooltipContainer}>
              <input
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  type='password'
                  placeholder='Enter your password..'
                  name='password'
                />

              <div>
                <div
                  className={`${
                    error && error.field === 'password'
                      ? 'fas fa-times-circle'
                      : 'fas fa-info-circle'
                  } ${styles.tooltip}`}
                >
                </div>
                <div className={styles.tooltipText}>
                  {error && error.field === 'password'
                        ? error.message
                        : 'Here goes errors'
                    }
                </div>              
              </div>

            </div>
            
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
