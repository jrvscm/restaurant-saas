import { NextResponse } from 'next/server';
import { decodeJwt } from '@/lib/utils'; // Adjust the path based on where the function is located

export async function GET(req: Request) {
  const cookieHeader = req.headers.get('cookie');
  // Extract the token from the cookie
  const token = cookieHeader?.match(/(?:^|;\s*)token=([^;]*)/)?.[1];

  if (!token) {
    console.error('No token found in cookies');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Decode the token
    const user = decodeJwt(token);

    if (!user) {
      console.error('Token decoding failed or token is invalid');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Return the decoded user object
    return NextResponse.json({ user, token });
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}