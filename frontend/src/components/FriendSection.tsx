import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { User } from './ChatHeader'
import avatar1 from '../assets/avatar1.png'
import { ActiveUsers } from './Message'

const FriendSection:React.FC<ActiveUsers> = ({activeUsers}) => {
    const[friends,setFriends] = useState<User[]>([])
    const {id} = useParams();

    useEffect(()=>{
        axios.get('/api/user')
        .then(response =>{
            // console.log(response);
            const fetchedFriends = response.data;
            setFriends(fetchedFriends);
        })
        .catch(error=>console.log(error))
    },[])

  return (
    <div className='w-[30vw]'>
        {friends.length>0 &&(
            <div className="">
                {friends.map((friend,index)=>(
                    <React.Fragment key={index}>
                        <Link to={`/chat/${friend._id}`} className="flex items-center gap-[0.5vw] justify-between max-w-[30vw] h-[10vh] p-[1vw]" style={friend._id==id? {backgroundColor:"#efeff7"}:{backgroundColor:""}}>
                            <div className="relative bg-inherit flex items-end">
                                <img className='w-[7vh] h-[7vh] bg-transparent' src={avatar1} alt="avatar" />
                                {activeUsers?.find(id=> id === friend._id) &&(
                                    <div className="absolute right-[3px] w-[0.8vw] h-[0.8vw] ring-2 ring-white bg-green-600 rounded-full"></div>
                                )}
                            </div>
                            <div className="h-[10vh] bg-inherit flex gap-[0.5vw] items-center">
                                <div className=" w-[20vw] h-[6vh] bg-transparent flex flex-col justify-center">
                                    <p className='text-ellipsis overflow-hidden whitespace-nowrap capitalize bg-transparent font-fax font-bold text-[2vh]'>{friend.name}</p>
                                    <p className='text-ellipsis overflow-hidden whitespace-nowrap w-[20vw] bg-inherit font-louis text-gray-500 text-[1.7vh]'>Hello how are you kdmkdmckdmcfrfrfrfrfrfkdmckdmckdmckdmckdmckdmckdmckd</p>
                                </div>
                                <p className='h-[10vh] mt-2 font-bold bg-inherit font-fax flex items-start justify-end  text-[1.5vh]'>Today</p>
                            </div>
                        </Link>
                    </React.Fragment>
                ))}
            </div>
        )}
    </div>
  )
}

export default FriendSection