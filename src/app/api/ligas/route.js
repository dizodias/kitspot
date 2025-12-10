import { NextResponse } from 'next/server';

const ligas = [
    {
      "id": "serie-a",
      "nome": "Brasileirão Série A",
      "país": "Brasil"
    }
];

export async function GET() {
    return NextResponse.json(ligas);
}