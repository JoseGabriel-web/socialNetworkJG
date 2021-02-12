import axios from 'axios'

export const uploadImg = async (image, setImage) => {
  // Send file to server to get directory of image in backend to set the image variable.

  const body = new FormData()
  body.append('image', image)

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  try {    
    const { data } = await axios.post('/api/upload', body, config)
    setImage(data)      
  } catch(error) {
    console.log(error)
  }
}