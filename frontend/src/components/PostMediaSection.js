import React from 'react'

const PostMediaSection = ({video, image}) => {
  return (
    <div>
      {video? (
            <video autoPlay loop muted height='auto' width='100%' controls>
              <source src={`${video}`} type="video/mp4" />  
            </video>
          ) : (
          <img alt='' src={image} width='100%' height='auto' />
          )}
    </div>
  )
}

export default PostMediaSection

