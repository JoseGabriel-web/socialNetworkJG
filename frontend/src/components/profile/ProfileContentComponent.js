import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, useHistory } from 'react-router-dom'
import styles from '../../css/profile/profileContentComponent.module.css'
import { sections } from '../../data/profileData'
import ProfileSettings from './ProfileSettings'
import * as utils from '../../utils/index'

const ProfileContentComponent = ({ isCurrentUser }) => {  
  const profileReducer = useSelector((state) => state.profileReducer)  
  const { profile } = profileReducer 
  const history = useHistory()
  
  const isknownEndpoint = () => {
    let path = window.location.pathname.split('/')
    let urlEndpoint = path[path.length - 1]
    if(urlEndpoint === 'settings') return true
    return sections.some(({ endpoint }) => endpoint === urlEndpoint)
  }

  useEffect(() => {   
    if(!isknownEndpoint())  {
      history.replace('/notfound')
    }
  },[])

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
