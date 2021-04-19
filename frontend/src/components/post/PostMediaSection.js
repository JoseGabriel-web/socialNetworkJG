import React from "react"
import useLazyImg from "../../hooks/useLazyImg"

// Video is not yet supported in the backend/database-storage
const PostMediaSection = ({ image }) => {
  const loadedImg = useLazyImg(image)

  return (
    <div>
      <img
        style={{ display: "block" }}
        alt=''
        src={loadedImg || null}
        width='100%'
        height='auto'
      />
    </div>
  )
}

export default PostMediaSection
