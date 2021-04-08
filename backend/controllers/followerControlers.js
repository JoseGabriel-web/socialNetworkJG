import { User } from '../models/User.js'
import * as notificationControllers from '../controllers/notificationControllers.js'

const replaceSpace = (string) => {
  return string.split(' ').join('+')
}

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
          const notification = {
            from: followerName,
            body: `${followerName} started Following you!`,
            link: `/profile/${replaceSpace(userToFollowName)}/followers`,
            type: 'follow'
          }
          notificationControllers.createNotification(notification, userToFollowName)
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

// Should delete this nonsense once the new followers system is written.
// export const updateAllUserFollowers = (username, newUsername, next) => {  
//   User.updateMany({ followers: { $in: [username]} }, { $push: { followers: [newUsername] } }, (err,result) => {
//     if(err) return next(err)
//     else {
//       User.updateMany({ followers: { $in: [username]} }, { $pull: { followers: { $in: [username]} }}, (err, result) => {
//         if(err) return next(err)
//         else { 
//           updateAllUserFollowing(username, newUsername, next)
//         }
//       })
//     }
//   })
// }
// export const updateAllUserFollowing = (username, newUsername, next) => {    
//   User.updateMany( { following: { $in: [username]} }, { $push: { following: [newUsername] } },(err, result) => {
//       if (err) return next(err)
//       else {
//         User.updateMany( { following: { $in: [username]} }, { $pull: {following: { $in: [username]}} },
//           (err, result) => {
//             if (err) return next(err)
//             else {
//               return     
//             }
//           }
//         )
//       }
//     }
//   )
// }