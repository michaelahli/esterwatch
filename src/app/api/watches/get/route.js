import { NextResponse } from "next/server";

export async function POST(req) {
  const response = {
    watch: {
      id: 'modelaaaa',
      collection_id: 'aaa',
      main_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg/1200px-Apple_Watch_Series_8_Midnight_Aluminium_Case.jpg',
      name: 'example watch 1',
      model_number: '001',
      in_stock: true,
      price: 90000,
      description: 'alumunium foil aja ya',
      gallery_images: [
        'https://media.istockphoto.com/id/1359180038/photo/wristwatch.jpg?s=612x612&w=0&k=20&c=AWkZ-gaLo601vG5eiQcsjYRjCjDxZdGL7v-jWvvAjEM=',
        'https://shop.timexindia.com/cdn/shop/products/twtg10006.jpg?v=1690231686',
        'https://magazine.chrono24.com/cdn-cgi/image/f=auto,metadata=none,fit=cover,q=65,w=1190,h=595,dpr=2.0/2023/01/Omega-2-1-1.jpg'
      ],
      collection: {
        slug: '001',
        name: 'back home with you'
      },
      features: ['water resist', 'fire resist', 'earth resist', 'wind resist'],
      specifications: { 'strap': 'stainless steel', 'glass': 'sapphire chrystal', 'movement': 'japanese movement' },
    },
  };
  return new NextResponse(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
