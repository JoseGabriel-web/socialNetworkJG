import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styles from "../css/error/notfound.module.css"
import * as utils from "../utils/index"

// Opps... something went wrong!
const NotFound = () => {
  const words = ["Opps... something went wrong!", "Page not found", 'It does not exist']
  const [subIndex, setSubIndex] = useState(0)
  const [index, setIndex] = useState(0)  
  const [reverse, setReverse] = useState(false)  
  const [blink, setBlink] = useState(false)
  const speed = 150

  const getNextIndex = () => {
    if (index === words.length - 1) {
      return index - 1
    } else {
      return index + 1
    }
  }

  const getNextSubIndex = () => {
    if (subIndex === words[index].length - 1) {
      return subIndex - 1
    } else if (reverse && subIndex !== 0) {
      return subIndex - 1
    } else {
      return subIndex + 1
    }
  }

  useEffect(() => {
    if (reverse && subIndex === 0) {
      setIndex(getNextIndex())
      setReverse(false)
    } else if (subIndex === words[index].length - 1 && !reverse) {
      setReverse(true)
    }

    setTimeout(() => setSubIndex(getNextSubIndex()), speed)
  }, [subIndex])

  useEffect(() => setTimeout(() => setSubIndex(getNextSubIndex()), speed), [])

  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const { user } = userInfoReducer
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.errorContent}>
        <div className={styles.statusCode}>
          <h1>404</h1>
        </div>
        <div className={styles.message}>
          <h2>{`${words[index].substring(0, subIndex)}${blink ? "|" : ""}`}</h2>
        </div>
        <div className={styles.options}>
          <Link to='/home'>Home</Link>
          <Link
            to={
              user && `/profile/${utils.string.replaceSpace(user.name)}/gallery`
            }
          >
            My Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
