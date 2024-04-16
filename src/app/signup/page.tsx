"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
    const router = useRouter()
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading,setLoading] = useState(false)
  const onSignup = async () => {
    try {
        setLoading(true)
      const response =  await axios.post(`/api/users/signup`,user)
      console.log("Signup success",response.data)
      router.push("/login")
      setLoading(false)
    } catch (error:any) {
        console.log("sign up failed",error.message)
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="mb-4 text-purple-500 text-4xl font-serif font-bold">
          {loading?"Processing":"Sign Up"}
        </h1>
        <hr />

        <input
          className="bg-gray-400 rounded-sm text-white placeholder:text-white p-2 mb-4 focus:outline-none"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <input
          className="bg-gray-400 rounded-sm text-white placeholder:text-white p-2 mb-4 focus:outline-none"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <input
          className="bg-gray-400 rounded-sm text-white placeholder:text-white p-2 focus:outline-none"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button onClick={onSignup} className={` p-2 rounded mt-4 w-[180px] text-white font-bold ${buttonDisabled?`bg-gray-300`:`bg-purple-500`}`}>
          {buttonDisabled?"No sign up":"Sign Up"}
        </button>
        <Link
          href="/login"
          className="text-blue font-serif mt-3 underline underline-offset-1"
        >
          go to login
        </Link>
      </div>
    </>
  );
}
