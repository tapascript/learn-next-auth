import { NextResponse } from "next/server";

export const GET = async (request) => {
    return new NextResponse("Hey That's Me", {
        status: 201,
    });
};
