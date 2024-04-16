import dbConnect from "@/lib/dbConnect"
import User from "@/model/userModel"
import { NextRequest,NextResponse } from "next/server"
const bcryptjs = require('bcryptjs');
import jwt from 'jsonwebtoken'


dbConnect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody

        console.log(reqBody)

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error:"User doesn't exist"},{status:400})
        }

        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            NextResponse.json({error:"Invalid Password"},{status:400})
        }
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }
       const token = jwt.sign(tokenData,process.env.JWT_SECRET_KEY!,{expiresIn:"1d"})

       const response = NextResponse.json({message:"Login Successfull",success:true})

       response.cookies.set("token",token,{httpOnly:true})

       return response

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}