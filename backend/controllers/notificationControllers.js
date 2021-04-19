import { Notification } from '../models/Notification.js'
import { User } from '../models/User.js'

const replaceSpace = async (string) => {
  string = await getUsername(string)
  return string.split(' ').join('+')
}

const capitalizeString = (string) => {  
  if(string.split(' ').length > 1) {   
    return `${string.split(' ').map(word => capitalizeString(word)).join(' ')}`
  }  
  return `${string.charAt(0).toUpperCase() + string.slice(1)}`
}

const getUsername = async (userId) => {
  let user = await User.findById({ _id: userId }).select('name')
  console.log(user)
  return user.name
}

const getBody = async ({ from, type, to }) => {
  switch(type) {
    case 'follow':      
      return `${capitalizeString(await getUsername(from))} started following you!`
    case 'welcome':      
      return `Welcome ${capitalizeString(await getUsername(to)).split(' ')[0]}!`
    default:
      return `this is a notification without body lol.`
  }
}

const getLink = async ({ from, to, type }) => {
  switch(type) {
    case 'follow':
      return `/profile/${await replaceSpace(to)}/followers`
    default:
      return null
  }
}

export const getNotifications = async (userId) => {
  try {
    return await Notification.find({ to: userId })
  } catch (error) {
    console.error(error.message)
  }
}

export const createNotification = async ({ from, to, type }) => {
  try {    
    let existingNotification = await Notification.findOne({ from, to, type })
    if(!existingNotification) {
      let body = await getBody({ from, type, to })
      let link = await getLink({ from, to, type })
      return await Notification.create({ from, to, body, link, type })
    } else {
      return null
    }
  } catch (error) {
    console.error(error.message)
  }
}

export const deleteNotification = async (notificationId) => {
  try {
    await Notification.deleteOne({ _id: notificationId })
  } catch (error) {
    console.error(error.message)
  }
}