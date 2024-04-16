import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Clear token cookie using cookies.set()
        const response = NextResponse.json({ message: "Logout Successful", success: true });
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
        
        return response; // Return the response object
    } catch (error) {
        // Handle errors
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }); // Return error response
    }
}
