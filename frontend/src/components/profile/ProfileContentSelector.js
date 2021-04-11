import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from '../../css/profile/profileContentSelector.module.css'
import { sections } from '../../data/profileData'
import * as utils from '../../utils/index'

const ProfileContentSelector = ({ isSelected, followersCount, isCurrentUser }) => {
  const profileReducer = useSelector((state) => state.profileReducer)  
  const { profile } = profileReducer  


  return (
    <div className={styles.profileContentSelector}>
      {sections.map((section) => (
        <Link
          key={section.label}
          to={`/profile/${
            profile && utils.string.replaceSpace(profile.user.name)
          }/${section.endpoint}`}
          className={styles.profileContentSelectorTab}
        >
          <div
            className={
              isSelected(section.endpoint) ? styles.active : null
            }
          >
            {section.label === 'Followers' ? followersCount : null}
            {section.label === 'Gallery'
              ? profile?.posts?.length
              : null}
            <h4 style={{ padding: '0 10px' }}>{section.label}</h4>
            <i className={section.icon} />
          </div>
        </Link>
      ))}
      {isCurrentUser() ? (
        <Link
          key={'settings'}
          to={`/profile/${
            profile && utils.string.replaceSpace(profile.user.name)
          }/settings`}
          className={styles.profileContentSelectorTab}
        >
          <div
            className={isSelected('settings') ? styles.active : null}
          >
            <h4>Settings</h4>
            <i
              style={{ paddingLeft: '10px' }}
              className='fas fa-cogs'
            />
          </div>
        </Link>
      ) : null}
    </div>
  )
}

export default ProfileContentSelector
