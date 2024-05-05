import { DefaultEventsMap } from '@socket.io/component-emitter';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Socket, io } from 'socket.io-client'
import sendIcon from '../assets/send.png'
import { CurrentUser, User } from './ChatHeader';
import { useQuery } from 'react-query';

export interface ActiveUsers extends CurrentUser{
    activeUsers?:string[],
    setActiveUsers: React.Dispatch<React.SetStateAction<string[] | undefined>>
    newMessage:boolean,
    setNewMessage: React.Dispatch<React.SetStateAction<boolean>>
}

interface Message{
    message:string,
    sender:string,
    receiver:string,
    timestamp:number
}

var socket:Socket<DefaultEventsMap>;

function scrollToBottom(){
    const messageContainer = document.getElementById('message-container')
    messageContainer?.scrollTo({top:messageContainer.scrollHeight, behavior:'instant'})
}

const Message:React.FC<ActiveUsers> = ({activeUsers,setActiveUsers,newMessage,setNewMessage}) => {
    const[messages,setMessages] = useState<Message[]>([])
    const{id} = useParams();
    const[currentUserId,setCurrentUserId] = useState<string>()
    const[otherUser,setOtherUser] = useState<User>()
    const[errorAt,setErrorAt] = useState<string>();
    
    const fetchMessages = async() =>{
        try {
            const response = await axios.get(`/api/message/getUserMessage/${id}`)
            return response;
        } catch (error:any) {
            if(error.response.status === 401){
                window.location.href = `/login`
            }
        }
    }
    
    const {data,isLoading,status}=useQuery(['messages',id],fetchMessages)

    useEffect(()=>{
        if(status==='success'){
            setMessages(data?.data);
        }
        else if(status==='error'){
            setErrorAt('load message');
        }
    },[data])
    
    useEffect(()=>{
        socket = io(`${import.meta.env.VITE_SERVER_URL}`)

        axios.get('/api/user/getCurrentUser')
        .then((response:AxiosResponse<{_id:string}>)=>{
            setCurrentUserId(response.data._id)

            socket.emit('setupUser',response.data._id);
            socket.on('activeUsers',(activeUsers)=>{
                setActiveUsers(activeUsers);
            })
        })
        .catch(error=>{
            if(error.status===401){
                return window.location.href = `/login`
            }
        })

    },[])

    useEffect(()=>{
        scrollToBottom();
    },[id,messages])

    useEffect(()=>{
        socket.on('message received',(message:Message)=>{
            setMessages(prevMessages => [...prevMessages, message]);
            scrollToBottom();
            setNewMessage(true);
        })
    },[])

    function handleSendMessage(event:any){
        setErrorAt('');
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
            socket.emit('new message',{message:message, timestamp:timestamp,sender:currentUserId,receiver:id});
            event.target.reset();
            scrollToBottom();
        })
        .catch(error=>{
            console.log(error)
            setErrorAt('store message')
        })
    }

  return (
    <div className="w-[70vw] h-[90vh] pb-[2vw] px-[2vw] bg-[#efeff7] flex flex-col items-center justify-center">
        {messages.length>0 &&(
        <div id='message-container' className="overflow-y-scroll h-[83vh] w-[70vw] p-[1.5vw] pb-[5vh] gap-[5px] flex flex-col items-center  bg-transparent">
            {messages.map((message,index)=>(
                <React.Fragment key={index}>
                {message.sender===currentUserId && message.receiver===id &&(
                <div className='w-full bg-transparent flex flex-col items-end px-2 '>
                    {index>1 && messages[index-1].sender===id && messages[index].sender===currentUserId &&(
                        <div className="mb-1  bg-transparent">
                            <p className='bg-transparent text-[1.8vh] font-fax capitalize font-bold'>You</p>
                        </div>
                    )}
                    {index==0 &&(
                        <div className="mb-1 bg-transparent">
                            <p className='bg-transparent text-[1.8vh] font-fax capitalize font-bold'>You</p>
                        </div>
                    )}
                    <div className="bg-transparent">
                        <p className='flex items-center justify-center font-louis min-w-[1vw] max-w-[40vw] break-all ring-1 ring-gray-200 px-[1vw] py-[0.2vw] rounded-[1.2vw] text-[2.1vh]'>
                            {message.message}
                        </p>
                        {errorAt==='store message' && (index==messages.length-1) &&(
                            <p className='bg-inherit font-fax'>not sent</p>
                        )}
                    </div>
                </div>)}
                
                {message.sender===id && message.receiver===currentUserId && message.sender!==currentUserId &&(
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
                    <p className='flex items-center justify-center font-louis min-w-[1vw] max-w-[40vw] break-all ring-1 ring-gray-200 px-[1vw] py-[0.2vw] rounded-[1.2vw]  text-[2.1vh]'>
                        {message.message}
                    </p>
                </div>)}
                </React.Fragment>
            ))}
        </div>)}
        {messages.length===0 &&(
            <div className="h-[83vh] w-full bg-[#efeff7] flex justify-center items-center font-fax"> No Messages</div>
        )}

        <div className="w-[95%] h-[7vh] drop-shadow-sm shadow-gray-200 ring-1 ring-gray-200 p-1 rounded-[15px]">
            <form onSubmit={handleSendMessage} className='flex gap-2 h-full '>
                <input
                    name="message"
                    type="text"
                    placeholder='Type something'
                    className="block w-full font-louis text-[2vw] px-[1vw] rounded-md rounded-r-[0] border-0 py-2 text-gray-900  ring-gray-300 placeholder:text-gray-400 sm:text-[1.1vw] sm:leading-6"
                    />
                <button type='submit' className='w-[7vw] flex justify-center items-center h-[100%] rounded-[13px] text-white font-helvetica bg-[#7151ff]'>
                    <img className='w-[2vw] h-[2vw] bg-transparent' src={sendIcon} alt="" />
                </button>
            </form>
        </div>
    </div>
  )
}

export default Message