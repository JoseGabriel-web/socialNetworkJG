import React, {useState, useEffect, useRef} from 'react'
import styles from '../css/createPost.module.css'

const CreatePost = () => {

  const [isOpened, setIsOpened] = useState(false)
  const ref = useRef(undefined)  

  const handleFormState = () => {
    setIsOpened(!isOpened)
  }

  const handleClick = (e) => {           
    if(ref && !ref?.current?.contains(e.target)) {        
      handleFormState()        
    } 
  }

  useEffect(() => {

    const functions = {
      startingFunction: () => {
        if(!isOpened || !ref) return
        document.addEventListener('click', handleClick, true)      
      },
      cleanUp: () => {
        document.removeEventListener('click', handleClick)
      }
    }
        
    functions.startingFunction()  
    return functions.cleanUp()
  })

  return (
    <div className={styles.createPostContainer} >
      
      <div className={styles.openFormIcon} onClick={handleFormState}>
        <i className='fas fa-plus' />        
      </div>

      <div className={styles.popUpContainer} style={{display: isOpened? 'flex' : 'none'}}>
        <div className={styles.formContainer} ref={ref}>
          
          <div className={styles.closeFormIcon} >
            <i className='fas fa-times-circle' onClick={handleFormState} />
          </div>

          <form>

          </form>

        </div>
      </div>

    </div>
  )
}

export default CreatePost
