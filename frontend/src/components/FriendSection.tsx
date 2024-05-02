import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from './ChatHeader'

interface FriendSectionProps{
    id: string|undefined
}
const FriendSection:React.FC<FriendSectionProps> = ({id}) => {
    const[friends,setFriends] = useState<User[]>([])

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
                    <Link to={`/chat/${friend._id}`} key={index} 
                    className="flex items-center h-[10vh] p-[1vw] ring-1 ring-gray-200" style={friend._id==id? {backgroundColor:"#ebebeb"}:{backgroundColor:""}}>
                        <p className='capitalize bg-transparent font-fax font-bold text-[2vh]'>{friend.name}</p>
                    </Link>
                ))}
            </div>
        )}
    </div>
  )
}

export default FriendSection