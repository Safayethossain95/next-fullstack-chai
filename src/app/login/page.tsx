"use client"

import Link from "next/link"
import React,{useState,useEffect} from 'react'
import {useRouter} from "next/navigation"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
export default function LoginPage(){
    const router = useRouter()
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [user,setUser] = useState({
        email:"",
        password:"",        
    })
    const [loading,setLoading] = useState(false)
    const onLogin = async()=>{
        try {
            setLoading(true)
            await axios.post("/api/users/login",user)
            toast.success("Login success")
            router.push("/profile")
        } catch (error:any) {
            
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0
            
          ) {
            setButtonDisabled(false);
          } else {
            setButtonDisabled(true);
          }
      }, [user]);
    return(
        <>
               <Toaster />
         <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-4 text-purple-500 text-4xl font-serif font-bold">{loading?"Processing":"Login"}</h1>
            <hr/>
            
            
            <input
            className="bg-gray-400 rounded-sm text-white placeholder:text-white p-2 mb-4 focus:outline-none"
            id="email"
            type="email"
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder="email"
            />
            <input
            className="bg-gray-400 rounded-sm text-white placeholder:text-white p-2 focus:outline-none"
            id="password"
            type="password"
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder="password"
            />
            <button onClick={onLogin} className="bg-purple-500 p-2 rounded mt-4 w-[180px] text-white font-bold">Login</button>
            <Link href="/signup" className="text-blue font-serif mt-3 underline underline-offset-1">go to sign up</Link>
        </div>
        </>
    )
}