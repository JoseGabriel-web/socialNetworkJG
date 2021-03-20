import React, { useEffect, useState } from 'react'
import styles from '../../css/post/postDescriptionSection.module.css'

const PostDescriptionSection = ({ title, description }) => {
  const [shortDescription, setShortDescription] = useState('')
  const [isLong, setIsLong] = useState(false)

  const isTooLong = (text) => {
    return text !== undefined && text.split(' ').length > 30 ? true : false
  }

  const checkDescriptionLength = () => {
    if (isTooLong(description)) {
      setIsLong(!setIsLong)
      setShortDescription(description.split(' ').slice(0, 30).join(' '))
    }
  }

  useEffect(() => {
    checkDescriptionLength()
  }, [])

  return (
    <div
      className={styles.postDescriptionContainer}
      style={{ padding: description || title ? '0.5rem' : '' }}
    >
      <h3>{title}</h3>
      {isTooLong(description) === false ? (
        <div>
          <p className={styles.descriptionContainer}>
            {description}
          </p>
        </div>
      ) : isLong ? (
        <div>
          <p className={styles.descriptionContainer}>
            {description}
            <span onClick={() => setIsLong(!isLong)}>
              <strong style={{cursor: 'pointer'}}> Show less.</strong>
            </span>
          </p>
        </div>
      ) : (
        <div>
          <p className={styles.descriptionContainer}>
            {shortDescription}
            <span onClick={() => setIsLong(!isLong)}>
              <strong style={{cursor: 'pointer'}}>... Show More.</strong>
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

export default PostDescriptionSection
