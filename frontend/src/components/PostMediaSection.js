import React from 'react'

const PostMediaSection = ({isVideo = false , image}) => {
  return (
    <div>
      {isVideo? (
            <video style={{display: 'block'}} autoPlay loop muted height='auto' width='100%' controls>
              <source src={`${''}`} type="video/mp4" />  
            </video>
          ) : (
          <img style={{display: 'block'}} alt='' src={image} width='100%' height='auto' />
          )}
    </div>
  )
  
}

export default PostMediaSection

