import { NextResponse } from "next/server";
import pool from '@/utilities/database/postgre';

export async function POST(req) {
  try {
    const data = await req.json();

    let query = 'SELECT * FROM watches WHERE 1 = 1';
    const params = [];

    if (data.collection_id) {
      query += ' AND collection_id = $' + (params.length + 1);
      params.push(data.collection_id);
    }
    if (data.max_price) {
      query += ' AND price <= $' + (params.length + 1);
      params.push(data.max_price);
    }
    if (data.in_stock !== undefined) {
      query += ' AND in_stock = $' + (params.length + 1);
      params.push(data.in_stock);
    }

    const result = await pool.query(query, params);

    const response = {
      watches: result.rows,
    };

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
