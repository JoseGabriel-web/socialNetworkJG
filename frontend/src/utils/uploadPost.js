import axios from 'axios'

export const uploadPost = async (image) => {
  // Post image in cloudlinary and get URL

  const body = new FormData()
  body.append('image', image)

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  try {    
    const { data } = await axios.post('/api/upload/post', body, config)        
    const url = await data
    return url
  } catch(error) {
    console.log(error)
  }
}