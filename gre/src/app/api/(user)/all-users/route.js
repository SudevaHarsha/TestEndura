import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  try {
    const users = await db.profile.findMany();

    if (!users || users.length === 0) {
      return NextResponse.error(new Error('Users not found'), { status: 404 });
    }

    console.log('Users fetched:', users);
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.error(error, { status: 500 });
  }
}
