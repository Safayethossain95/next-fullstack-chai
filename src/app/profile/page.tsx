'use client'
import { useEffect,useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function UserProfile(){
   const router = useRouter()
   const [data,setData] = useState("")

   const getUserDetails=async ()=>{
    const res = await axios.get('/api/users/me')
    console.log(res.data)
    setData(res.data.data._id)
   }
    const logout=async()=>{
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout Successful")
            router.push("/login")
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    return (
        <>
     <Toaster />
            <div className="flex flex-col items-center justify-center py-2 min-h-screen">
                <h1>Profile Page</h1>
                <hr/>
                <h2 className='p-3 rounded bg-red-500'>{data === ""? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
                <button onClick={logout} className="mt-4 rounded p-3 bg-blue-500">Logout</button>
                <button onClick={getUserDetails} className='bg-green-600 hover:bg-blue-400 py-2 px-4 rounded mt-4'>Get User Data</button>
            </div>
        </>
    )
}