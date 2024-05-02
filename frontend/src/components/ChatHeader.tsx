import React, { useEffect, useState } from 'react'
import chatIcon from '../assets/chat.png'
import axios, { AxiosResponse } from 'axios'

export interface User{
    name: string,
    _id: string,
    email: string
}

const ChatHeader:React.FC = () => {
    const[user,setUser] = useState<User>()

    useEffect(()=>{
        axios.get('/api/user/getCurrentUser')
        .then((response:AxiosResponse<User>)=>{
            setUser(response.data)
        })
    },[])
  return (
    <div className='w-full h-[10vh] flex border-b-[1px] border-gray-200'>
        <div className="w-[30vw] flex items-center justify-start gap-[1vw] border-r-[1px] border-gray-200 px-[1.5vw]">
            <img className='w-[2vw] h-[2vw]' src={chatIcon} alt="chat-icon" />
            <h3 className='font-fax font-bold text-[3vh]'>Chats</h3>
        </div> 
        <div className="w-[70vw] py-[1vh] px-[2vw] flex flex-col justify-center">
            <h3 className='font-fax text-[2vh] text-end capitalize'>{user?.name}</h3>
            <p className='font-fax text-[1.5vh] text-end'>{user?.email}</p>
        </div>
    </div>
  )
}

export default ChatHeader