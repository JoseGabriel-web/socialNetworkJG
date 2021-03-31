import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import styles from '../../css/chat/chat.module.css'
import ChatInput from './ChatInput'
import ChatControllers from './ChatControllers'
import Message from './Message'
import Loading from '../layout/Loading'
import { socket } from '../../Layout'
import Popup from '../layout/Popup'

const Chat = ({ isOpened, setIsOpened, newMessages, setNewMessages }) => {
  const chatRoomInfoReducer = useSelector((state) => state.chatRoomInfoReducer)
  const [overSpeedLimit, setOverSpeedLimit] = useState(false)
  const [jokeSetup, setJokeSetup] = useState(false)
  const [jokeDelivery, setJokeDelivery] = useState(false)
  const { messages = [], loading, chatRoomId } = chatRoomInfoReducer
  const chatRef = useRef(null)

  const getRandomJoke = async () => {
  //   {
  //     "error": false,
  //     "category": "Pun",
  //     "type": "twopart",
  //     "setup": "Why do cows wear bells?",
  //     "delivery": "Because their horns don't work!",
  //     "flags": {
  //         "nsfw": false,
  //         "religious": false,
  //         "political": false,
  //         "racist": false,
  //         "sexist": false,
  //         "explicit": false
  //     },
  //     "id": 222,
  //     "safe": true,
  //     "lang": "en"
  // }
  const { data } = await axios.get('https://v2.jokeapi.dev/joke/Any')
    if(!data || !data.safe) return getRandomJoke()    
    setJokeSetup(data.setup)
    setJokeDelivery(data.delivery)
  }

  useEffect(() => {
    if(!chatRoomId) {
      setInterval(getRandomJoke, 10000)
    }      
  }, [chatRoomId])

  useEffect(() => {
    getRandomJoke()
  },[])

  socket.on('receiveMessage', (newMessage) => {
    setNewMessages([...newMessages, newMessage])
  })

  const scrollToBottom = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight
  }

  useEffect(() => {
    if (chatRef !== null && chatRef.current) {
      scrollToBottom()
    }
  }, [messages, newMessages])  

  return (
    <div className={styles.chatContainer}>      
      <div className={styles.chatControllers}>
        <ChatControllers isOpened={isOpened} setIsOpened={setIsOpened} />
      </div>

      <div className={styles.chatContent} width='100%' ref={chatRef}>
        {loading ? (
          <Loading />
        ) : (
          messages && messages.map((message) => <Message message={message} />)
        )}
        {newMessages &&
          newMessages.map((message) => <Message message={message} />)
        }                  
    
        {!chatRoomId || loading? (
          <div className={styles.jokeContainer}>                                    

            {jokeSetup && jokeDelivery? (
              <>
              <div className={styles.jokePart}>
                <i className='fas fa-quote-left' />
                  <h1>{jokeSetup && jokeSetup}</h1>
                <i className='fas fa-quote-right' />
              </div>
            
              <div className={styles.jokePart}>
                <i className='fas fa-quote-left' />
                  <h1>{jokeDelivery && jokeDelivery}</h1>
                <i className='fas fa-quote-right' />
              </div>
              </>
            ) : <Loading />}            

          </div>
        ) : null}
      </div>

      

      <div className={styles.chatInputComponentContainer}>
        <ChatInput 
          overSpeedLimit={overSpeedLimit} 
          setOverSpeedLimit={setOverSpeedLimit} 
        />
      </div>
    </div>
  )
}

export default Chat
