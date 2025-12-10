import { NextResponse } from 'next/server';

const times = [
    {
      "id": "athletico",
      "nome": "Athletico Paranaense",
      "ligaId": "serie-a",
      "escudo": "/escudos/athletico.png"
    },
    {
      "id": "atletico-mg",
      "nome": "Atlético Mineiro",
      "ligaId": "serie-a",
      "escudo": "/escudos/atletico-mg.png"
    },
    {
      "id": "bahia",
      "nome": "Bahia",
      "ligaId": "serie-a",
      "escudo": "/escudos/bahia.png"
    },
    {
      "id": "botafogo",
      "nome": "Botafogo",
      "ligaId": "serie-a",
      "escudo": "/escudos/botafogo.png"
    },
    {
      "id": "bragantino",
      "nome": "Bragantino",
      "ligaId": "serie-a",
      "escudo": "/escudos/bragantino.png"
    },
    {
      "id": "chape",
      "nome": "Chapecoense",
      "ligaId": "serie-a",
      "escudo": "/escudos/chapecoense.png"
    },
    {
      "id": "corinthians",
      "nome": "Corinthians",
      "ligaId": "serie-a",
      "escudo": "/escudos/corinthians.png"
    },
    {
      "id": "coritiba",
      "nome": "Coritiba",
      "ligaId": "serie-a",
      "escudo": "/escudos/coritiba.png"
    },
    {
      "id": "cruzeiro",
      "nome": "Cruzeiro",
      "ligaId": "serie-a",
      "escudo": "/escudos/cruzeiro.png"
    },
    {
      "id": "flu",
      "nome": "Fluminense",
      "ligaId": "serie-a",
      "escudo": "/escudos/fluminense.png"
    },
    {
      "id": "fla",
      "nome": "Flamengo",
      "ligaId": "serie-a",
      "escudo": "/escudos/flamengo.png"
    },
    {
      "id": "gremio",
      "nome": "Grêmio",
      "ligaId": "serie-a",
      "escudo": "/escudos/gremio.png"
    },
    {
      "id": "inter",
      "nome": "Internacional",
      "ligaId": "serie-a",
      "escudo": "/escudos/internacional.png"
    },
    {
      "id": "mirassol",
      "nome": "Mirassol",
      "ligaId": "serie-a",
      "escudo": "/escudos/mirassol.png"
    },
    {
      "id": "palmeiras",
      "nome": "Palmeiras",
      "ligaId": "serie-a",
      "escudo": "/escudos/palmeiras.png"
    },
    {
      "id": "remo",
      "nome": "Remo",
      "ligaId": "serie-a",
      "escudo": "/escudos/remo.png"
    },
    {
      "id": "santos",
      "nome": "Santos",
      "ligaId": "serie-a",
      "escudo": "/escudos/santos.png"
    },
    {
      "id": "spfc",
      "nome": "São Paulo",
      "ligaId": "serie-a",
      "escudo": "/escudos/saopaulo.png"
    },
    {
      "id": "vasco",
      "nome": "Vasco da Gama",
      "ligaId": "serie-a",
      "escudo": "/escudos/vasco.png"
    },
    {
      "id": "vitoria",
      "nome": "Vitória",
      "ligaId": "serie-a",
      "escudo": "/escudos/vitoria.png"
    }
];

export async function GET() {
    return NextResponse.json(times);
}
