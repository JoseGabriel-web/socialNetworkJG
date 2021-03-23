import Layout from '../Layout'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

const appComponents = [
{
  path: '/login',
  component: LoginScreen,  
},
{
  path: '/register',
  component: RegisterScreen,  
},
{
  path: '/',
  component: Layout,  
},
]

export default appComponents