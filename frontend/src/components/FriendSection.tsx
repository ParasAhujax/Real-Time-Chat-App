import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { User } from './ChatHeader'
import avatar1 from '../assets/avatar1.png'
import { ActiveUsers } from './Message'
import { useQuery } from 'react-query'
import {Bars} from 'react-loader-spinner'

const fetchFriends = async () =>{
    const response = await axios.get('/api/user');
    return response;
}
interface FriendMessage{
    message:string,
    friend:string,
    timestamp:number
}

const FriendSection:React.FC<ActiveUsers> = ({activeUsers,user,newMessage,setNewMessage}) => {
    const[friends,setFriends] = useState<User[]>([])
    const {id} = useParams();
    const[index,setIndex] = useState<number>()
    const[friendMessage,setFriendMessage] = useState<FriendMessage[] | undefined>()

    const {data,isLoading,status} =useQuery('friends',fetchFriends);
    
    useEffect(()=>{
        if(status==='success'){
            setFriends(data.data)
        }
    },[data])

    useEffect(()=>{
        if(friends.length>0){
            const index = friends.findIndex(friend => friend._id === id);
            if(index!==-1){
                setIndex(index);
            }
        }
        if(status=="success" && user){
            axios.post(`/api/message/getFriendsMessage`,{
                friends:data.data,
                user:user
            })
            .then((response)=>{
                setFriendMessage(response.data.messages)
                setNewMessage(false);
            })
            .catch(error=>{
                console.log(error);
            })
        }

    },[user,status,newMessage,])

  return (
    <div className='w-[30vw] bg-[white]'>
        {isLoading &&(
            <div className="h-[75vh] flex justify-center items-center ">
                <Bars color='#7f62ff'/>
            </div>
        )}
        {!isLoading &&(<>

            {friends.length>0 &&(
                <div className='bg-[white]'>
                {friends.map((friend,index)=>(
                    <div key={index}>
                        <Link to={`/chat/${friend._id}`} className="flex items-center gap-[0.5vw] justify-between w-[30vw] h-[10vh] p-[1vw] pl-[1.5vw] rounded-l-[30px]" 
                        style={friend._id==id? {backgroundColor:"#efeff7"}:{backgroundColor:"white"}}>

                            <div className="relative bg-inherit flex items-end">
                                <img className='w-[7vh] h-[7vh] bg-transparent' src={avatar1} alt="avatar" />
                                {activeUsers?.find(id=> id === friend._id) &&(
                                    <div className="absolute right-[3px] w-[0.8vw] h-[0.8vw] ring-2 ring-white bg-green-600 rounded-full"></div>
                                )}
                            </div>
                            <div className="h-[10vh] relative bg-transparent flex gap-[0.5vw] items-center">
                                <div className=" w-[22vw] h-[6vh] bg-transparent flex flex-col justify-center">
                                    <p className='text-ellipsis overflow-hidden whitespace-nowrap capitalize bg-transparent font-fax font-bold text-[2vh]'>
                                        {friend.name}
                                    </p>
                                    {(<p className='text-ellipsis overflow-hidden whitespace-nowrap w-[20vw] bg-inherit font-louis text-gray-500 text-[1.7vh]'>
                                        {friendMessage?.find(messages=>messages?.friend===friend._id)?.message}
                                    </p>)}
                                </div>
                                <div className="absolute right-0 flex bg-transparent">
                                    {new Date(friendMessage?.find(message => message?.friend === friend._id)?.timestamp??0).getDate!==(new Date(Date.now()).getDate) && (
                                        <p className='h-[10vh] font-bold bg-inherit pt-2 font-fax flex items-start justify-end  text-[1.5vh]'>
                                            {new Date(friendMessage?.find(message=>message?.friend === friend._id)?.timestamp??0).getDate().toString()+'/'+
                                            new Date(friendMessage?.find(message=>message?.friend === friend._id)?.timestamp??0).getMonth().toString()+'/'+
                                            new Date(friendMessage?.find(message=>message?.friend === friend._id)?.timestamp??0).getFullYear()}
                                        </p>
                                    )}
                                    {new Date(friendMessage?.find(message => message?.friend === friend._id)?.timestamp??0).getDate===(new Date(Date.now()).getDate) && (
                                        <p className='h-[10vh] font-bold bg-inherit pt-2 font-fax flex items-start justify-end  text-[1.5vh]'>
                                            {(new Date(Date.now() - new Date(friendMessage?.find(message=>message?.friend === friend._id)?.timestamp??0).getTime()).getMinutes()-30).toString()+' mins ago'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
                </div>
            )}
        </>)}
    </div>
  )
}

export default FriendSection