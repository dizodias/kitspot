import { NextResponse } from 'next/server';

const dadosJogos = [
        {
            "id": "1",
            "timeId": "spfc",
            "adversario": "Botafogo",
            "data": "15/12 - 16:00",
            "local": "Morumbis",
            "torneio": "Brasileirão"
        },
        {
            "id": "2",
            "timeId": "spfc",
            "adversario": "Corinthians",
            "data": "18/12 - 21:30",
            "local": "Neo Química Arena",
            "torneio": "Brasileirão"
        },
        {
            "id": "3",
            "timeId": "palmeiras",
            "adversario": "Cruzeiro",
            "data": "14/12 - 19:00",
            "local": "Mineirão",
            "torneio": "Brasileirão"
        },
        {
            "id": "4",
            "timeId": "palmeiras",
            "adversario": "Fluminense",
            "data": "17/12 - 20:00",
            "local": "Allianz Parque",
            "torneio": "Brasileirão"
        }
    ];

export async function GET(request) {
    return NextResponse.json(dadosJogos);
}