import { User } from '../models/User.js'


export const getFollowers = async (req,res) => {
  let username = req.params.username.split('+').join(' ')
  try {
    const user = await User.findOne({name: username}).select('followers')    
    res.status(200).json({followersList: await user.followers})
    console.log('Get Followers')
  } catch(error) {
    throw new Error(error)
  }
}

export const follow = (req,res) => {
  const { followerName, userToFollowName } = req.body    
  User.updateOne({name: userToFollowName}, {$push: {followers: [followerName] }}, (err,result) => {
    if(err) res.status(500).json({error})
    else {
      User.updateOne({name: followerName}, {$push: {following: [userToFollowName] }}, (err,result) => {
        if(err) res.status(500).json({error})
        else {
          res.status(200).json({message: `${followerName} started following ${userToFollowName}`})  
        }
      })
    }
  })
}

export const unfollow = (req,res) => {
  const { followerName, userToUnFollowName } = req.query        
  User.updateOne({name: userToUnFollowName}, {$pull: {followers: { $in: [followerName]}}}, (err,result) => {
    if(err) res.status(500).json({error})
    else {      
      User.updateOne({name: followerName}, {$pull: {following: { $in: [userToUnFollowName]}}}, (err,result) => {
        if(err) res.status(500).json({error})
        else {      
          res.status(200).json({message: `${followerName} unfollowed ${userToUnFollowName}`})     
        }
      })
    }
  })
}