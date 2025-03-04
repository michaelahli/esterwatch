import { NextResponse } from "next/server";
import pool from '@/utilities/database/postgre';

export async function POST(req) {
  const data = await req.json();

  let query = 'SELECT * FROM watches WHERE id = $1';
  const watches = await pool.query(query, [data.id.toString()]);

  if (watches.rows < 1) {
    return new NextResponse(JSON.stringify({ error: "watch not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  const watch = watches.rows[0];

  query = 'SELECT * FROM watch_gallery_images WHERE watch_id = $1';
  const images = await pool.query(query, [data.id.toString()]);
  watch.gallery_images = [];
  images.rows.forEach(img => {
    watch.gallery_images.push(img.image_url);
  });

  query = 'SELECT * FROM watch_features WHERE watch_id = $1';
  const features = await pool.query(query, [data.id.toString()]);
  watch.features = [];
  features.rows.forEach(feature => {
    watch.features.push(feature.feature);
  });

  query = 'SELECT * FROM watch_specifications WHERE watch_id = $1';
  const specs = await pool.query(query, [data.id.toString()]);
  watch.specifications = specs.rows.reduce((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});

  query = 'SELECT * FROM collections WHERE id = $1';
  const collections = await pool.query(query, [watch.collection_id]);
  if (collections.rows < 1) {
    return new NextResponse(JSON.stringify({ error: "collections not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  watch.collection = collections.rows[0];

  const response = JSON.stringify({
    watch: watch,
  });
  return new NextResponse(response, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
