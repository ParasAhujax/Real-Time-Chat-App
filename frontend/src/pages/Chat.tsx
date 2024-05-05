import React, { useEffect, useState } from 'react'
import Message from '../components/Message'
import FriendSection from '../components/FriendSection'
import ChatHeader, { User } from '../components/ChatHeader'
import {  useParams } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { Socket,io } from 'socket.io-client'
import { DefaultEventsMap } from '@socket.io/component-emitter';

var socket:Socket<DefaultEventsMap>;

const Chat:React.FC = () => {
    const {id} = useParams();
    const[activeUsers,setActiveUsers] = useState<string[]>();
    const[user,setUser] = useState<User>()
    const[newMessage,setNewMessage] = useState<boolean>(false);

    useEffect(()=>{
      socket = io(`http://localhost:3000`)

      axios.get('/api/user/getCurrentUser')
      .then((response:AxiosResponse<User>)=>{
          setUser(response.data)

          socket.emit('setupUser',response.data._id);
          socket.on('activeUsers',(activeUsers)=>{
            setActiveUsers(activeUsers);
          })
      })
      .catch(error=>{
        console.log(error);
        if(error.response.status===401){
          window.location.href === '/login'
        }
      })


  },[])


  return (
    <>
    <ChatHeader user={user} setUser={setUser}/>

    <div className='flex'>
        <FriendSection  user={user} setUser={setUser} activeUsers={activeUsers} setActiveUsers={setActiveUsers} newMessage={newMessage} setNewMessage={setNewMessage}/>
        
        {id && (<Message user={user} setUser={setUser} activeUsers={activeUsers} setActiveUsers={setActiveUsers} newMessage={newMessage} setNewMessage={setNewMessage}/>)}
    </div>
    </>
  )
}

export default Chat