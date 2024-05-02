import { DefaultEventsMap } from '@socket.io/component-emitter';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Socket, io } from 'socket.io-client'
import sendIcon from '../assets/send.png'
import { User } from './ChatHeader';

interface UserId{
    currentUserId?: string;
}

interface Message{
    message:string,
    sender:string,
    receiver:string,
    timestamp:number
}

var socket:Socket<DefaultEventsMap>;

const Message:React.FC = () => {
    const[messages,setMessages] = useState<Message[]>([])
    const{id} = useParams();
    const[currentUserId,setCurrentUserId] = useState<string>()
    const[otherUser,setOtherUser] = useState<User>()

    useEffect(()=>{
        axios.get(`/api/user/${id}`)
        .then((response:AxiosResponse<User>)=>{
            setOtherUser(response.data);
        })

        axios.get(`/api/message/getUserMessage/${id}`)
        .then((response:AxiosResponse<Message[]>) => {
            console.log(response);
            const fetchedMessages = response.data;
            setMessages(fetchedMessages)
        })
    },[id])
    
    useEffect(()=>{
        socket = io(`http://localhost:3000`)

        axios.get('/api/user/getCurrentUser')
        .then((response:AxiosResponse<{userId:string}>)=>{

            setCurrentUserId(response.data.userId)

            socket.emit('setupUser',response.data.userId);
            socket.on('setupComplete',(socketId)=>{
                // console.log("socket id:",socketId);
                // setCurrentUserId(socketId);
            })
        })
        .catch(error=>console.log(error))

    },[])

    useEffect(()=>{
        socket.on('message received',(message:Message)=>{
            setMessages(prevMessages => [...prevMessages, message]);
        })
    },[])

    function handleSendMessage(event:any){
        event.preventDefault();
        const message = event.target.message.value;
        const timestamp = Date.now();

        axios.post('/api/message/storeMessage',{
            message: message,
            sender:currentUserId,
            receiver:id,
            timestamp: timestamp
        })
        .then(response =>{
            // console.log(response);
            socket.emit('new message',{message:message, timestamp:timestamp,sender:currentUserId,receiver:id});
            event.target.reset();
        })
        .catch(error=>console.log(error))

    }

  return (
    <div className="w-[70vw] h-[90vh] pb-[2vw] px-[2vw] bg-[#efeff7]  flex flex-col items-center justify-center">
        {messages.length>0 &&(
        <div className="overflow-y-scroll h-[90vh] w-[70vw] p-[1.5vw] gap-[5px] flex flex-col items-center  bg-transparent">
            {messages.map((message,index)=>(
                <>
                {message.sender===currentUserId && message.receiver===id &&(
                <div className='w-full bg-transparent flex flex-col items-end px-2 '>
                    {index>1 && messages[index-1].sender===id && messages[index].sender===currentUserId &&(
                        <div className="mb-1  bg-transparent">
                            <p className='bg-transparent text-[1.8vh] font-fax capitalize font-bold'>You</p>
                        </div>
                    )}
                    {index<=1 &&(
                        <div className="mb-1 bg-transparent">
                            <p className='bg-transparent text-[1.8vh] font-fax capitalize font-bold'>You</p>
                        </div>
                    )}
                    <p className='flex items-center justify-center font-louis min-w-[1vw] max-w-[50vw] break-all ring-1 ring-gray-200 px-[1vw] py-[0.2vw] rounded-[1.2vw] text-[2.1vh]'>
                        {message.message}
                    </p>
                </div>)}
                
                {message.sender===id && message.receiver===currentUserId &&(
                <div className='w-full bg-transparent flex flex-col items-start px-2 '>
                    {index>1 && messages[index-1].sender===currentUserId && messages[index].sender===id &&(
                        <div className="mb-1 bg-transparent ">
                            <p className='bg-transparent text-[1.8vh] font-fax capitalize font-bold'>{otherUser?.name}</p>
                        </div>
                    )}
                    {index<=1 &&(
                        <div className="mb-1 bg-transparent">
                            <p className='bg-transparent text-[1.8vh] font-fax capitalize font-bold'>{otherUser?.name}</p>
                        </div>
                    )}
                    <p className='flex items-center justify-center font-louis min-w-[1vw] min-h-[5vh] max-w-[50vw] break-all ring-1 ring-gray-200 px-[1vw] py-[0.2vw] rounded-[1.2vw]  text-[2.1vh]'>
                        {message.message}
                    </p>
                </div>)}
                </>
            ))}
        </div>)}
        {messages.length===0 &&(
            <div className="h-[90vh] w-full bg-[#efeff7] flex justify-center items-center font-fax"> No Messages</div>
        )}

        <div className="w-[95%] h-[7vh] drop-shadow-sm shadow-gray-200 ring-1 ring-gray-200 p-1 rounded-[15px]">
            <form onSubmit={handleSendMessage} className='flex gap-2 h-full '>
                <input
                    name="message"
                    type="text"
                    placeholder='Type something'
                    className="block w-full font-louis text-[2vw] px-[1vw] rounded-md rounded-r-[0] border-0 py-2 text-gray-900  ring-gray-300 placeholder:text-gray-400 sm:text-[1.1vw] sm:leading-6"
                    />
                <button type='submit' className='w-[7vw] flex justify-center items-center h-[100%] rounded-[13px] text-white font-helvetica bg-[#4829d1]'>
                    <img className='w-[2vw] h-[2vw] bg-transparent' src={sendIcon} alt="" />
                </button>
            </form>
        </div>
    </div>
  )
}

export default Message