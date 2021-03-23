import axios from 'axios'
import { token } from './utils/index'

const confgAxios = () => {

  axios.interceptors.request.use(
    config => {
      const accessToken = token.getAccessToken()            
      if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`        
      }
      return config
    },
    error => {
      Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      const originalRequest = error.config      
      if(error.response.status === 401 && originalRequest.url === '/api/auth/refreshToken') {                
        return Promise.reject(error)
      }


      if (error.response.status === 401 && !error.response.__retry) {
        error.response.__retry = true
        return axios
          .post('/api/auth/refreshToken', {
            refreshToken: token.getRefreshToken(),
          })
          .then(res => {
            if(res.status === 201) {
              console.log(res.data)
              token.setAccessToken(res.data.accessToken)
              const accessToken = token.getAccessToken()
              console.log('Refreshing AccessToken automated')
              axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
              return axios(originalRequest)
            }
          })
      }
      return Promise.reject(error)
    }
  )
  
}

export default confgAxios
