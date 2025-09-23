import { NextRequest, NextResponse } from 'next/server'; 
import {GetUserAdmin} from "~/server/querys";

export async function POST(req: NextRequest) { 
  const reqBody = await req.json();
  const username = (await reqBody).username;
  if (username) {
    const userAdmins = JSON.parse(await GetUserAdmin(username));
    if ((await userAdmins).length != 0){
      return NextResponse.json(
      { isUserAdmin: true},
      { status: 200 }
    );
    }
    else{
      return NextResponse.json(
      { isUserAdmin: false},
      { status: 200 }
    );
    }
  } else {
    return NextResponse.json(
      {message: 'Nebyl specifikovan uzivatel v requestu' },
      { status: 400 }
    );
  }
}
export async function GET(req: NextRequest){
    return NextResponse.json(
      { message: "sem se smí jen přes post"},
      { status: 405 });
}