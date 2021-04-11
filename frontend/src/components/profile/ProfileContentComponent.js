import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import styles from '../../css/profile/profileContentComponent.module.css'
import { sections } from '../../data/profileData'
import ProfileSettings from './ProfileSettings'
import * as utils from '../../utils/index'

const ProfileContentComponent = ({ isCurrentUser }) => {

  const profileReducer = useSelector((state) => state.profileReducer)  
  const { profile } = profileReducer

  return (
    <div className={styles.profileContentComponent}>
      <Switch>
        {sections.map((section) => (
          <Route
            key={section.endpoint}
            path={`/profile/${
              profile && utils.string.replaceSpace(profile.user.name)
            }/${section.endpoint}`}
            component={section.component}
          />
        ))}
        {isCurrentUser() ? (
          <Route
            key={'settings'}
            path={`/profile/${profile && utils.string.replaceSpace(
              profile?.user?.name
            )}/settings`}
            component={ProfileSettings}
          />
        ) : null}
      </Switch>
    </div>
  )
}

export default ProfileContentComponent
