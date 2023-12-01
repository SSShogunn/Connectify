import React from 'react'
import Messages from './Messages'
import Input from './Input'
import Cam from '../img/cam.png'
import Add from '../img/add.png'
import More from '../img/more.png'  
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'  

const Chat = () => {
  const {data} = useContext(ChatContext)
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcon">
            <img src={Cam} alt="" />
            <img src={Add} alt="" />
            <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input    />
    </div>
  )
}

export default Chat;
