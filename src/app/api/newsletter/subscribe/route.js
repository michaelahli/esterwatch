
import { NextResponse } from "next/server";
import pool from '@/utilities/database/postgre';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const query = 'INSERT INTO newsletter_subscriptions (email) VALUES ($1) RETURNING *';
    const result = await pool.query(query, [email]);

    return NextResponse.json({ message: "Subscribed successfully!", data: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);

    if (error.code === '23505') {
      return NextResponse.json({ error: "Email already subscribed" }, { status: 409 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
