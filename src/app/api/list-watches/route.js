import { NextResponse } from "next/server";

export async function GET(req, res) {
  const response = {
    watches: [
      {
        main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
        name: 'example watch 1',
        model_number: '001'
      },
      {
        main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
        name: 'example watch 1',
        model_number: '001'
      },
      {
        main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
        name: 'example watch 1',
        model_number: '001'
      },
      {
        main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
        name: 'example watch 1',
        model_number: '001'
      },
      {
        main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
        name: 'example watch 1',
        model_number: '001'
      },
      {
        main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
        name: 'example watch 1',
        model_number: '001'
      },
      {
        main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
        name: 'example watch 1',
        model_number: '001'
      },
      {
        main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
        name: 'example watch 1',
        model_number: '001'
      }
    ],
  };
  return new NextResponse(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  const response = {
    watches: [
      {
        id: 'apple',
        main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
        name: 'example watch 1',
        model_number: '001',
        price: 100000,
      },
      {
        id: 'apple',
        main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
        name: 'example watch 1',
        model_number: '001',
        price: 100000,
      },
      {
        id: 'apple',
        main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
        name: 'example watch 1',
        model_number: '001',
        price: 100000,
      },
      {
        id: 'apple',
        main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
        name: 'example watch 1',
        model_number: '001',
        price: 100000,
      },
      {
        id: 'apple',
        main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
        name: 'example watch 1',
        model_number: '001',
        price: 100000,
      },
      {
        id: 'apple',
        main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
        name: 'example watch 1',
        model_number: '001',
        price: 100000,
      },
      {
        id: 'apple',
        main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
        name: 'example watch 1',
        model_number: '001',
        price: 100000,
      },
      {
        id: 'apple',
        main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
        name: 'example watch 1',
        model_number: '001',
        price: 100000,
      }
    ],
  };
  return new NextResponse(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
  // let query =
  //   "SELECT id, name, model_number, price, description, features, specifications, main_image_url, gallery_images, in_stock, created_at FROM watches";
  // const values = [];
  //
  // if (collectionId) {
  //   query += " WHERE collection_id = $1";
  //   values.push(collectionId);
  // }
  //
  // query += " ORDER BY created_at DESC";
  //
  // const watches = await sql(query, values);
  //
  // return { watches };
}

