import { NextResponse } from "next/server";
import pool from '@/utilities/database/postgre';

export async function POST(req) {
  const collections = await pool.query('SELECT * FROM collections')
  const response = JSON.stringify({
    collections: collections.rows,
  });
  return new NextResponse(response, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

