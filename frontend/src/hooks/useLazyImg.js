import { useState, useEffect } from 'react'

const useLazyImg = (src) => {
  const [loadedImg, setLoadedImg] = useState(null)

  useEffect(() => {
    const img = new Image(src)
    img.src = src
    img.onload = () => setLoadedImg(src)
  },[])

  return loadedImg
}

export default useLazyImg
