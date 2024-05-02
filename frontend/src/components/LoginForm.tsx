import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

interface LoginFormProps{
    type:string
}

const LoginForm:React.FC<LoginFormProps> = ({type}) => {
    const [isPasswordVerified,setIsPasswordVerified] = useState<boolean>();

    function handleSubmit(event:any){
        event.preventDefault();

        axios.post(`/api/user/${type}`,{
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        })
        .then(response=>{
            if(response.status === 200 ){
                window.location.href = '/chat'
            }
        })
        .catch(error=>{
            console.log(error);
            if(error.response.status === 404){
                setIsPasswordVerified(false);
            }
        })
    }

    return (
        <>
          <div className="flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              {type==='login'&&(<h2 className="mt-10 text-center text-2xl font-fax font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>)}
              {type==='signup'&&(<h2 className="mt-10 text-center text-2xl font-fax font-bold leading-9 tracking-tight text-gray-900">
                Register your account
              </h2>)}
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action='de' onSubmit={handleSubmit} method="POST">
                {type==='signup' && (<div>
                  <label htmlFor="email" className="block text-sm font-louis  leading-6 text-gray-900">
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="block w-full font-louis px-[1vw] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>)}
                <div>
                  <label htmlFor="email" className="block text-sm font-louis  leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full font-louis px-[1vw] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-louis font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    {/* <div className="text-sm">
                      <a href="#" className="font-semibold font-louis text-[#5432ed] hover:text-indigo-500">
                        Forgot password?
                      </a>
                    </div> */}
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full font-louis px-[1vw] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                   {isPasswordVerified==false && (
                        <div className="font-louis text-[0.9vw] text-red-500 mt-2 ">Email or password is wrong</div>
                    )}
                </div>
    
                <div>
                  {type==='login'&&(<button
                    type="submit"
                    className="flex w-full justify-center font-helvetica rounded-md bg-[#4829d1] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>)}
                  {type==='signup'&&(<button
                    type="submit"
                    className="flex w-full justify-center font-helvetica rounded-md bg-[#4829d1] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>)}
                </div>
              </form>
    
              {type==='login'&&(<p className="mt-10 font-louis text-center text-sm text-gray-500">
                Dont have an account?{' '}
                <Link to='/signup' className="font-semibold font-louis leading-6 text-[#5432ed] hover:text-indigo-500">
                  Register Now
                </Link>
              </p>)}
            </div>
          </div>
        </>
      )
}

export default LoginForm;


/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
  