import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styles from "../css/error/notfound.module.css"
import * as utils from "../utils/index"

const NotFound = () => {
  const words = [
    "Opps... something went wrong!!",
    "Page not found",
    "Sorry, this page doesn't exist",
  ]
  const [subIndex, setSubIndex] = useState(0)
  const [index, setIndex] = useState(0)
  const [reverse, setReverse] = useState(false)
  const [blink, setBlink] = useState(false)
  const [backwards, setBackwards] = useState(false)
  const speed = 250
  const pauseTime = 500

  const getNextIndex = () => {
    if (index === words.length - 1) {
      setBackwards(true)
      return index - 1
    } else if (backwards && index !== 0) {
      return index - 1
    } else {
      setBackwards(false)
      return index + 1
    }
  }

  const getNextSubIndex = () => {
    if (subIndex === words[index].length) {
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

    if(reverse && subIndex === words[index].length - 1) {
      setTimeout(() => setSubIndex(getNextSubIndex()), pauseTime)  
    } else {
      setTimeout(() => setSubIndex(getNextSubIndex()), speed)
    }
  }, [subIndex])

  // Fire recursion process with useEffect for subIndex on first load
  useEffect(() => setTimeout(() => setSubIndex(getNextSubIndex()), speed), [])
  // Start recursion for blinking line
  useEffect(() => setTimeout(() => setBlink(!blink), speed), [blink])

  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const { user } = userInfoReducer
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.errorContent}>
        <div className={styles.statusCode}>
          <h1><span className={styles.line}>404</span></h1>
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
