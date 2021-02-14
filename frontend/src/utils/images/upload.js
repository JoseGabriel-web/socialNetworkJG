import axios from 'axios'

export const uploadPostImg = async (image, accessToken) => {
  // Post image in cloudlinary and get URL

  const body = new FormData()
  body.append('image', image)

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'authorization': `Bearer ${accessToken}`
    }
  }

  try {    
    const { data } = await axios.post('/api/images/upload/post', body, config)        
    const url = await data
    return url
  } catch(error) {
    console.log(error)
  }
}