import { NextRequest, NextResponse } from 'next/server'; 

export async function GET(req: NextRequest) { 

  const username = req.headers.get('HTTP_X_REMOTE_USER');
  console.log(req.headers)
  if (username) {
    const cleanUsername = username.split('\\').pop();

    return NextResponse.json(
      { username: cleanUsername || 'Unknown User' },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { username: 'Guest', message: 'Not authenticated via proxy or header missing.' },
      { status: 403 } // Unauthorized status
    );
  }
}