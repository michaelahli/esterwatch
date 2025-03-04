import { NextResponse } from "next/server";
import pool from '@/utilities/database/postgre';

export async function POST(req) {
  const data = await req.json();

  if (!Array.isArray(data.slug)) {
    return new NextResponse(JSON.stringify({ error: "Invalid input: slugs must be an array" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let query = 'SELECT * FROM collections WHERE slug = ANY($1) LIMIT 1';
  const collections = await pool.query(query, [data.slug]);

  if (collections.rows < 1) {
    return new NextResponse(JSON.stringify({ error: "collection not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  const collection = collections.rows[0];

  query = 'SELECT * FROM watches WHERE collection_id = $1';
  const watches = await pool.query(query, [collection.id]);

  const response = JSON.stringify({
    watches: watches.rows,
    collection: collection,
  });

  return new NextResponse(response, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
