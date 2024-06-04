import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import { dbConnect } from "@/lib/mongo";

import { NextRequest, NextResponse } from "next/server";


export const GET = async (request) => {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse(`You are not authenticated!`, {
        status: 500,
      });
    }

    await dbConnect();

    try{
        const user = await getUserByEmail(session?.user?.email)
        return new NextResponse(JSON.stringify(user), {
            status: 200,
        });
    } catch(error) {
        console.error(error);
        return new NextResponse(error.message, {
            status: 500,
          });
    }
}