import React from 'react'

const ChangeProfilePicture = ({setEditProfilePicturePopUpState, user}) => {
  
  const handlePopUpState = () => {
    setEditProfilePicturePopUpState(false)
  }

  return (
    <div onClick={handlePopUpState}>
      {user && JSON.stringify(user)}
      Close this
    </div>
  )
}

export default ChangeProfilePicture
