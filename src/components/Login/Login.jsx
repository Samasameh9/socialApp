import { Button } from "@heroui/react";
import React, { useContext, useState } from "react";
import bg from "./../../assets/bg.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SchemaLogin } from "../../schema/Schemalogin";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import SignIn from "../../services/loginApi";
import { AuthContext } from "../../context/authContext";
export default function Login() {
let {setuserToken} = useContext(AuthContext)
  let navigate=useNavigate()
let [isLoading,setisLoading]=useState(false)
let [ApiError,setApiError]=useState(null)
  let {  handleSubmit,register ,formState:{errors , touchedFields} }= useForm({
    defaultvalues:{
  email:"",
  password:"",
},
  resolver: zodResolver(SchemaLogin),
  mode:'onBlur',
  reValidateMode:'onBlur'
  })

  async function submitForm(userData){
 setisLoading(true)
  console.log("sumbit",userData)
 let response=await SignIn(userData)
 if(response.message=="success"){
  localStorage.setItem("token",response.token)
  setuserToken(response.token)
  navigate('/home')
 }else{
  setApiError(response.error)
 }
setisLoading(false)

  }
  return (
    <>
      <div
        className=" flex justify-center items-center relative bg-cover bg-center  h-svh"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="w-20 absolute top-0 mt-42 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="bg-white rounded-2xl text-green-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
       <form onSubmit={handleSubmit(submitForm)}>
         <div className="flex w-sm md:w-lg  lg:w-xl min-h-1/3 flex-col gap-4 shadow-2xl bg-white py-5  rounded-2xl px-3">
          <input
          {...register('email')}
            placeholder="Enter your email"
            type="email"
            name="email"
            className=" border rounded border-green-600 px-2 py-1 mt-5"
          />
          {errors.email && touchedFields.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          <input
         {...register('password')}
            placeholder="Enter your password"
            type="password"
            name="password"
            className=" border rounded border-green-600 px-2 py-1"
          />
          {errors.password && touchedFields.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
            {ApiError?  <p className="text-red-500 text-center text-xl ">{ApiError}</p>:null}
        <div className="flex justify-between"> 
        <h4 className="text-xs   font-bold">DONOT HAVE ACCOUNT, <Link to='/register' className="text-green-700 cursor-pointer">REGISTER</Link>?</h4></div>
          <Button isLoading={isLoading} type="submit" className="border bg-green-200  border-green-200 rounded py-2 hover:bg-green-700  duration-200 ">
            LOGIN
          </Button>
        </div>
       </form>
      </div>
    </>
  );
}
