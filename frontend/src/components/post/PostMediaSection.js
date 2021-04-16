import React from "react"
import useLazyImg from "../../hooks/useLazyImg"

// Video is yet not supported
const PostMediaSection = ({ isVideo = false, image }) => {
  const loadedImg = useLazyImg(image)

  return (
    <div>
      {isVideo ? (
        <video
          style={{ display: "block" }}
          autoPlay
          loop
          muted
          height='auto'
          width='100%'
          controls
        >
          <source src={`${""}`} type='video/mp4' />
        </video>
      ) : (
        <img
          style={{ display: "block" }}
          alt=''
          src={loadedImg || null}
          width='100%'
          height='auto'
        />
      )}
    </div>
  )
}

export default PostMediaSection
