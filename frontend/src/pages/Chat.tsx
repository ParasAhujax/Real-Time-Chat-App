import React, { useEffect, useState } from 'react'
import Message from '../components/Message'
import axios, { AxiosResponse } from 'axios'
import FriendSection from '../components/FriendSection'
import ChatHeader from '../components/ChatHeader'
import { useParams } from 'react-router-dom'

const Chat:React.FC = () => {
    const {id} = useParams();

    useEffect(()=>{
        
    },[])
  return (
    <>
    <ChatHeader/>
    <div className='flex'>
        <FriendSection id={id}/>
        <Message/>
    </div>
    </>
  )
}

export default Chat