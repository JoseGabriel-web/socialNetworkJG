import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Layout from './layouts/Layout'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />          
        <Route path='/' component={Layout} />  
        {/* <Redirect to='/' /> */}
      </Switch>
    </Router>
  )
}

export default App