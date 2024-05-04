import React, { useEffect, useState } from 'react'
import Message from '../components/Message'
import FriendSection from '../components/FriendSection'
import ChatHeader from '../components/ChatHeader'
import { useNavigate, useParams } from 'react-router-dom'

const Chat:React.FC = () => {
    const {id} = useParams();
    const navigate =useNavigate();
    const[activeUsers,setActiveUsers] = useState<string[]>();

  return (
    <>
    <ChatHeader/>
    <div className='flex'>
        <FriendSection  activeUsers={activeUsers} setActiveUsers={setActiveUsers}/>
        {id && (<Message activeUsers={activeUsers} setActiveUsers={setActiveUsers}/>)}
    </div>
    </>
  )
}

export default Chat