import React, { useEffect, useState } from 'react'
import styles from '../css/homeSidebar.module.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { sidebarData } from '../data/sidebarData'

const HomeSidebar = () => {

  const loginReducer = useSelector(state => state.loginReducer)
  const { user } = loginReducer



  return (
    <div className={styles.sidebarContianer}>
        
      <div className={styles.partOne}>
        <div className={styles.partOneImage}>
          <i className='fas fa-user-circle' />
        </div>
        <div className={styles.partOneLabel}>
          <h3>{user? user.name : 'Welcome'}</h3>
        </div>
      </div>   

      <div className={styles.partTwo}>
        {sidebarData.map(tab => (
          <Link to={`${tab.path}`} className={styles.sidebarTab}>
           
            <div className={styles.tabIcon}>
              <i className={`${tab.icon}`} />
            </div>

            <div className={styles.tabLabel}>
              <h3>{tab.label}</h3>
            </div>

          </Link>
        ))}
      </div>         

    </div>
  )
}

export default HomeSidebar
