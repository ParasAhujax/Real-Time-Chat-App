import React, { useEffect, useState } from 'react'
import chatIcon from '../assets/chat.png'
import axios, { AxiosResponse } from 'axios'
import { Link } from 'react-router-dom'
import searchIcon from '../assets/search.png'
import avatar from '../assets/avatar2.png'
import closeIcon from '../assets/close.png'

export interface User{
    name: string,
    _id: string,
    email: string
}

export interface CurrentUser{
    user?:User,
    setUser?:React.Dispatch<React.SetStateAction<User | undefined>>
}

const ChatHeader:React.FC<CurrentUser> = ({user}) => {
    const[search,setSearch] = useState<boolean>(false)

    function handleSearchForm(event:any){
        event.preventDefault();
        const search = event.target.search.value;
        
        axios.get(`/api/user/searchUser?search=${search}`)
        .then(response=>{
            console.log(response);
        })
        .catch(error=>{
            console.log(error);
        })
        
    }
    function handleSearchClick(){
        setSearch(!search)
    }

  return (
    <div className='w-full h-[10vh] flex border-b-[1px] border-gray-200'>
        {!search && (<div className="flex items-center justify-between bg-[#7f62ff] w-[30vw] h-[10vh] rounded-tr-[20px] px-[1.5vw]">
            <Link to='/chat' className="bg-transparent  flex items-center justify-start gap-[1vw] ">
                <img className='bg-transparent w-[2vw] h-[2vw]' src={chatIcon} alt="chat-icon" />
                <h3 className='bg-transparent text-white font-fax font-bold text-[3vh]'>Chats</h3>
            </Link> 
            <button onClick={handleSearchClick}><img className='bg-transparent h-[2vw] w-[2vw]' src={searchIcon} alt="search-icon" /></button>
        </div>)}
        {search && (<div className="flex items-center justify-between bg-[#7f62ff] w-[30vw] h-[10vh] rounded-tr-[20px] ">
            <form onSubmit={handleSearchForm} className='flex h-full '>
                <input
                    name="search"
                    type="text"
                    placeholder='Search name or email'
                    className="block w-[25vw] font-louis text-[2vw] px-[2vw] border-0 py-2 text-gray-900  ring-gray-300 placeholder:text-gray-400 sm:text-[1.1vw] sm:leading-6"
                    />
                <button type='submit' className='w-[5vw] flex justify-center items-center h-[100%] text-white font-helvetica '>
                    <img onClick={handleSearchClick} className='w-[2vw] h-[2vw] ' src={closeIcon} alt="" />
                </button>
            </form>
        </div>)}
        <Link to='/profile' className="flex items-center justify-end gap-[1vw] w-[70vw] py-[1vh] px-[1vw]">
            <div className=" flex flex-col justify-center">
                <h3 className='font-fax text-[2vh] text-end capitalize'>{user?.name}</h3>
                <p className='font-fax text-[1.5vh] text-end'>{user?.email}</p>
            </div>
            <img className='w-[4vw] h-[4vw]' src={avatar} alt="" />
        </Link>
    </div>
  )
}

export default ChatHeader