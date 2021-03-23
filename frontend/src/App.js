import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import appComponents from './data/appData'
import confgAxios from './confgAxios'

const App = () => {  

  useEffect(() => {
    confgAxios()
  },[])

  return (
    <Router>      
      <Switch>
        {appComponents.map(component => (
          <Route path={component.path} component={component.component} />        
        ))}
        <Redirect to='/login' />
      </Switch>
    </Router>
  )
}

export default App