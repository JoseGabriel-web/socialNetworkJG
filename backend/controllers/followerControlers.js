import { User } from '../models/User.js'


export const getFollowers = async (req,res) => {
  let username = req.params.username.split('+').join(' ')
  try {
    const user = await User.findOne({name: username}).select('followers')
    // const followersList = await user.followers
    res.status(200).json({followersList: await user.followers})
    console.log('Get Followers')
  } catch(error) {
    throw new Error(error)
  }
}

export const follow = async (req,res) => {
  const { followerName, userToFollowName } = req.body  
  try {
    const userToFollow = await User.findOne({name: userToFollowName})
    await userToFollow.followers.push(followerName)
    userToFollow.save()    
    res.status(200).json({message: `${followerName} started following ${userToFollowName}`})
    console.log('Follow user')
  } catch(error) {
    throw new Error(error)
  }
}

export const unfollow = async (req,res) => {
  const { followerName, userToUnFollowName } = req.query  
  try {
    const userToUnFollow = await User.findOne({name: userToUnFollowName})
    await userToUnFollow.followers.pull(followerName)
    userToUnFollow.save()
    res.status(200).json({message: `${followerName} unfollowed ${userToUnFollowName}`})
    console.log('Unfollow user')
  } catch(error) {
    throw new Error(error)
  }
}