import { NextResponse } from 'next/server';

const dadostabela = [
    {
        "posicao": 1,
        "time": "Flamengo",
        "pontos": 79,
        "jogos": 38,
        "vitorias": 23,
        "empates": 10,
        "derrotas": 5,
        "id": "e6f6"
    },
    {
        "posicao": 2,
        "time": "Palmeiras",
        "pontos": 76,
        "jogos": 38,
        "vitorias": 23,
        "empates": 7,
        "derrotas": 8,
        "id": "c5f0"
    },
    {
        "posicao": 3,
        "time": "Cruzeiro",
        "pontos": 70,
        "jogos": 38,
        "vitorias": 19,
        "empates": 13,
        "derrotas": 6,
        "id": "17e1"
    },
    {
        "posicao": 4,
        "time": "Mirassol",
        "pontos": 67,
        "jogos": 38,
        "vitorias": 18,
        "empates": 13,
        "derrotas": 7,
        "id": "9cd1"
    },
    {
        "posicao": 5,
        "time": "Fluminense",
        "pontos": 64,
        "jogos": 38,
        "vitorias": 19,
        "empates": 7,
        "derrotas": 12,
        "id": "cbe3"
    },
    {
        "posicao": 6,
        "time": "Botafogo",
        "pontos": 63,
        "jogos": 38,
        "vitorias": 17,
        "empates": 12,
        "derrotas": 9,
        "id": "5937"
    },
    {
        "posicao": 7,
        "time": "Bahia",
        "pontos": 60,
        "jogos": 38,
        "vitorias": 17,
        "empates": 9,
        "derrotas": 12,
        "id": "f922"
    },
    {
        "posicao": 8,
        "time": "São Paulo",
        "pontos": 51,
        "jogos": 38,
        "vitorias": 14,
        "empates": 9,
        "derrotas": 15,
        "id": "958e"
    },
    {
        "posicao": 9,
        "time": "Grêmio",
        "pontos": 49,
        "jogos": 38,
        "vitorias": 13,
        "empates": 10,
        "derrotas": 15,
        "id": "3515"
    },
    {
        "posicao": 10,
        "time": "Bragantino",
        "pontos": 48,
        "jogos": 38,
        "vitorias": 14,
        "empates": 6,
        "derrotas": 18,
        "id": "d82a"
    },
    {
        "posicao": 11,
        "time": "Atlético-MG",
        "pontos": 48,
        "jogos": 38,
        "vitorias": 12,
        "empates": 12,
        "derrotas": 14,
        "id": "e9ca"
    },
    {
        "posicao": 12,
        "time": "Santos",
        "pontos": 47,
        "jogos": 38,
        "vitorias": 12,
        "empates": 11,
        "derrotas": 15,
        "id": "51e5"
    },
    {
        "posicao": 13,
        "time": "Corinthians",
        "pontos": 47,
        "jogos": 38,
        "vitorias": 12,
        "empates": 11,
        "derrotas": 15,
        "id": "c16d"
    },
    {
        "posicao": 14,
        "time": "Vasco da Gama",
        "pontos": 45,
        "jogos": 38,
        "vitorias": 13,
        "empates": 6,
        "derrotas": 19,
        "id": "2f56"
    },
    {
        "posicao": 15,
        "time": "Vitória",
        "pontos": 45,
        "jogos": 38,
        "vitorias": 11,
        "empates": 12,
        "derrotas": 15,
        "id": "2dcb"
    },
    {
        "posicao": 16,
        "time": "Internacional",
        "pontos": 44,
        "jogos": 38,
        "vitorias": 11,
        "empates": 11,
        "derrotas": 16,
        "id": "07a2"
    },
    {
        "posicao": 17,
        "time": "Ceará",
        "pontos": 43,
        "jogos": 38,
        "vitorias": 11,
        "empates": 10,
        "derrotas": 17,
        "id": "d802"
    },
    {
        "posicao": 18,
        "time": "Fortaleza",
        "pontos": 43,
        "jogos": 38,
        "vitorias": 11,
        "empates": 10,
        "derrotas": 17,
        "id": "c99f"
    },
    {
        "posicao": 19,
        "time": "Juventude",
        "pontos": 35,
        "jogos": 38,
        "vitorias": 9,
        "empates": 8,
        "derrotas": 21,
        "id": "d797"
    },
    {
        "posicao": 20,
        "time": "Sport Recife",
        "pontos": 17,
        "jogos": 38,
        "vitorias": 2,
        "empates": 11,
        "derrotas": 25,
        "id": "c6a8"
    }
];
export async function GET(request) {
    return NextResponse.json(dadostabela);
}