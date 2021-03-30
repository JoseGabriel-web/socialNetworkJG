import { User } from '../models/User.js'

export const createNotification = async ({ from, body, link, type }, username) => {
  const user = await User.findOne({ name: username })
  if(await user.notifications.some(not => not.from === from && not.body === body)) {
    return
  }  
  user.notifications.push({ from, body, link, type })
  await user.save()  
  return
}

export const deleteNotification = async ({ _id, from, body, link, type }, username) => {  
  const notificationToRemove = { from, body, link, type }
  const user = await User.findOne({ name: username })
  user.notifications.pull(_id)
  await user.save()
  console.log('Delete controller info ->', { _id, from, body, link, type }, username)
  console.log(`Notification -> ${notificationToRemove} removed from ${user}`)
  return
}