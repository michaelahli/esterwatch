import { NextResponse } from "next/server";

export async function POST(req) {
  const response = {
    watches: [
      {
        id: 'modelaaaa',
        main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
        name: 'example watch 1',
        model_number: '001',
        in_stock: true,
        price: 90000,
        description: 'alumunium foil aja ya',
      },
    ],
    collection: {
      id: "001",
      hero_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
      name: 'example watch 1',
      description: 'ano des ta',
      slug: '001'
    },
  };
  return new NextResponse(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
