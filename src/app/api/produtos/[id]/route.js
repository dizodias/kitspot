import { NextResponse } from 'next/server';

// DADOS DOS PRODUTOS (Copiado do seu arquivo anterior)
const dadosProdutos = [
    {
        "nome": "Camisa São Paulo I 25/26",
        "preco": 256.49,
        "descricao": "Para conquistar o mundo, é preciso atravessá-lo! A Camisa São Paulo I 25/26 Jogador New Balance celebra 20 anos do maior feito da linda história Tricolor. Com design inspirado nas vitórias que marcaram o clube no cenário global, esta camisa São Paulo masculina representa a força de uma equipe que supera desafios por instinto. Produzida em materiais de qualidade, a peça oferece leveza e tecnologia que afasta o suor, garantindo muito conforto. Predominantemente branca, conta com listras em vermelho e preto, mantendo a tradição de uma camisa tão pesada. Na parte de trás da gola, o minuto do gol de Mineiro simboliza a grandeza do único Tricampeão Mundial do país. Celebre o passado glorioso com sua camisa do São Paulo!",
        "imagens": [
            "/produtos/camisa_spfc_modeloA_01.webp",
            "/produtos/camisa_spfc_modeloA_02.webp",
            "/produtos/camisa_spfc_modeloA_03.webp",
            "/produtos/camisa_spfc_modeloA_04.webp",
            "/produtos/camisa_spfc_modeloA_05.webp"
        ],
        "cores": ["Branco"],
        "tamanhos": ["P", "M", "G", "GG"],
        "tipo": "Camisa",
        "isKit": false,
        "ligaId": "serie-a",
        "timeId": "spfc",
        "itensDoKit": [],
        "tags": ["LANÇAMENTO"],
        "id": "9f672fef-29cd-4187-b631-25076644ee56"
    },
    {
        "id": "daad98ed-9073-4e86-8bf0-aa041c23a182",
        "nome": "Camisa São Paulo II 25/26",
        "preco": 189.99,
        "descricao": "Um é pouco, dois é bom, três só São Paulo! A Camisa São Paulo 25/26 Away Torcedor New Balance celebra 20 anos do maior feito da história Tricolor. Seu design é inspirado nas vitórias que marcaram o clube no cenário global, representando o orgulho de ser o único Tricampeão Mundial do país. Confeccionada em poliéster, esta camisa do São Paulo oferece leveza e tecnologia que afasta a umidade do corpo, mantendo o conforto que você precisa da arquibancada ao dia a dia. Misturando tradição e sofisticação, a peça traz o listrado tricolor, escudo bordado e detalhes em dourado, refletindo a grandeza do clube. Celebre o passado glorioso com sua camisa São Paulo masculina!",
        "imagens": [
            "/produtos/camisa_spfc_modeloB_01.webp",
            "/produtos/camisa_spfc_modeloB_02.webp",
            "/produtos/camisa_spfc_modeloB_03.webp",
            "/produtos/camisa_spfc_modeloB_04.webp",
            "/produtos/camisa_spfc_modeloB_05.webp"
        ],
        "cores": ["Listrado"],
        "tamanhos": ["P", "M", "G", "GG"],
        "tipo": "Camisa",
        "isKit": false,
        "ligaId": "serie-a",
        "timeId": "spfc"
    },
    {
        "nome": "Camisa São Paulo III 25/26",
        "preco": 474.99,
        "descricao": "Celebre a glória do maior Campeão Mundial do país! A Camisa São Paulo III 25/26 s/n° Jogador Comemorativa New Balance é um tributo à conquista que transcendeu fronteiras e daqueles artigos indispensáveis na coleção Tricolor. Inspirada no uniforme de goleiro de 2005, esta camisa do São Paulo é uma releitura do manto que assistiu e participou do maior feito da história do clube. Com as icônicas listras em vermelho e branco sobre o fundo preto, escudo centralizado e detalhes únicos, a camisa São Paulo masculina é símbolo de conexão entre o passado e presente. Vista a história – compre a sua e aproveite!",
        "imagens": [
            "/produtos/camisa_spfc_modeloC_01.webp",
            "/produtos/camisa_spfc_modeloC_02.webp",
            "/produtos/camisa_spfc_modeloC_03.webp",
            "/produtos/camisa_spfc_modeloC_04.webp",
            "/produtos/camisa_spfc_modeloC_05.webp"
        ],
        "cores": ["Preto"],
        "tamanhos": ["M", "P", "G", "GG", "XG"],
        "tipo": "Camisa",
        "isKit": false,
        "ligaId": "serie-a",
        "timeId": "spfc",
        "itensDoKit": [],
        "tags": ["EXCLUSIVO KITSPOT", "LANÇAMENTO"],
        "id": "fcf49fbc-1269-495c-ac27-b22914ff7f8b"
    },
    {
        "nome": "Camisa Palmeiras I 25/26",
        "preco": 369.99,
        "descricao": "De fato, é campeão! Celebrando as conquistas da Sociedade Esportiva Palmeiras e sua tradicional história, os novos uniformes são uma mescla de contemporaneidade e elegância. Com estampas que remetem às taças conquistadas pelo Verdão, como as 12 estrelas que representam os títulos brasileiros conquistados pelo clube, elementos de uma releitura da bandeira do Brasil e o “P” envolto em louros.",
        "imagens": [
            "/produtos/camisa_palmeiras_modeloA_01.webp",
            "/produtos/camisa_palmeiras_modeloA_02.webp",
            "/produtos/camisa_palmeiras_modeloA_03.webp",
            "/produtos/camisa_palmeiras_modeloA_04.webp",
            "/produtos/camisa_palmeiras_modeloA_05.webp"
        ],
        "cores": ["Verde"],
        "tamanhos": ["M", "P", "G", "GG", "XG"],
        "tipo": "Camisa",
        "isKit": false,
        "ligaId": "serie-a",
        "timeId": "palmeiras",
        "itensDoKit": [],
        "tags": ["PROMOÇÃO"],
        "id": "ad1dd2e6-48ba-4eb0-b852-7322de3abebb"
    },
    {
        "id": "9db6104f-8859-4a51-87d3-dc8c18983800",
        "nome": "Camisa Palmeiras II 25/26",
        "preco": 499.99,
        "descricao": "De fato, é campeão! Celebrando as conquistas da Sociedade Esportiva Palmeiras e sua tradicional história, os novos uniformes são uma mescla de contemporaneidade e elegância. Com estampas que remetem às taças conquistadas pelo Verdão, como as 12 estrelas que representam os títulos brasileiros conquistados pelo clube, elementos de uma releitura da bandeira do Brasil e o “P” envolto em louros.",
        "imagens": [
            "/produtos/camisa_palmeiras_modeloB_01.webp",
            "/produtos/camisa_palmeiras_modeloB_02.webp"
        ],
        "cores": ["Branco"],
        "tamanhos": ["P", "M", "G", "GG", "XG"],
        "tipo": "Camisa",
        "isKit": false,
        "ligaId": "serie-a",
        "timeId": "palmeiras"
    },
    {
        "nome": "Camisa Palmeiras III 25/26",
        "preco": 399.99,
        "descricao": "O uniforme THIRD é inspirado na escalação 100% alviverde da Primeira Academia. O sign off “Palmeiras, Meu Palmeiras” na gola convida o torcedor a vestir não apenas um uniforme, mas uma bandeira, um grito que ecoa nas arquibancadas. A camisa é amarelo vibrante com detalhes em verde, acompanhada de short azul e meiões brancos com faixas verdes e amarelas. Entre os elementos visuais estão o embossing frontal com “Maior Campeão do Brasil”, o “P” em louros e a nova gola em V com recorte moderno, exclusivo da PUMA, e o tecido com brilho sutil que entrega estética elegante e imponente.",
        "imagens": [
            "/produtos/camisa_palmeiras_modeloC_01.webp",
            "/produtos/camisa_palmeiras_modeloC_02.webp"
        ],
        "cores": ["Amarelo"],
        "tamanhos": ["P", "M", "G", "GG", "XG"],
        "tipo": "Camisa",
        "isKit": false,
        "ligaId": "serie-a",
        "timeId": "palmeiras",
        "itensDoKit": [],
        "tags": ["LANÇAMENTO"],
        "id": "04da5646-7a12-4b6f-b199-2354d9d2778e"
    },
    {
        "id": "d9c433a0-4265-4072-b3d3-c951a377c2ea",
        "nome": "Calção São Paulo II 25/26",
        "preco": 142.49,
        "descricao": "Atualize o fardamento tricolor com o Calção São Paulo 25/26 Away New Balance! Desenvolvido para as partidas do clube na temporada, este calção do São Paulo faz parte da linha que comemora 20 anos de um feito único no Brasil: O Tricampeonato Mundial do Mais Querido. Confeccionada em materiais de qualidade, a peça oferece leveza, respirabilidade e muito conforto. Seu tecido é composto por tecnologia NB DRY, que afasta o suor e mantém seu corpo seco durante as atividades físicas ou conduzindo o Tricolor. Com design moderno, o calção do São Paulo é predominantemente preto e traz detalhes que exibem sua paixão pelo maior campeão internacional do país. Peça o seu calção São Paulo masculino e aproveite!",
        "imagens": [
            "/produtos/calcao_spfc_modeloB_01.webp",
            "/produtos/calcao_spfc_modeloB_02.webp",
            "/produtos/calcao_spfc_modeloB_03.webp",
            "/produtos/calcao_spfc_modeloB_04.webp"
        ],
        "cores": ["Preto"],
        "tamanhos": ["P", "M", "G", "GG", "XG"],
        "tipo": "Calção",
        "isKit": false,
        "ligaId": "serie-a",
        "timeId": "spfc"
    },
    {
        "id": "2ed64590-3c40-45db-9149-15c0d0484ba8",
        "nome": "Calção São Paulo 25/26 I",
        "preco": 189.99,
        "descricao": "Atualize os mantos tricolores com o Calção São Paulo 25/26 Home New Balance! Desenvolvido para as partidas do Tricolor na temporada, este calção masculino faz parte da linha que comemora 20 anos de um feito único no Brasil: O Tricampeonato Mundial do Mais Querido. Confeccionada em materiais de qualidade, a peça oferece leveza, respirabilidade e muito conforto. Seu tecido é composto por tecnologia NB DRY, que afasta o suor e mantém seu corpo seco durante as atividades físicas ou conduzindo o Tricolor. Com design moderno, o calção do São Paulo é predominantemente branco e traz detalhes que mostram sua paixão pelo maior campeão internacional do país. Peça o seu calção do São Paulo masculino!",
        "imagens": [
            "/produtos/calcao_spfc_modeloA_01.webp",
            "/produtos/calcao_spfc_modeloA_02.webp",
            "/produtos/calcao_spfc_modeloA_03.webp",
            "/produtos/calcao_spfc_modeloA_04.webp"
        ],
        "cores": ["Branco"],
        "tamanhos": ["P", "M", "G", "GG", "XG"],
        "tipo": "Calção",
        "isKit": false,
        "ligaId": "serie-a",
        "timeId": "spfc"
    },
    {
        "id": "9ec91fc7-9347-458e-918b-e7fe89c1cf01",
        "nome": "Short Palmeiras II 21/22",
        "preco": 99.9,
        "descricao": "Short Palmeiras Puma II 21/22",
        "imagens": [
            "/produtos/calcao_palmeiras_modeloB_01.webp",
            "/produtos/calcao_palmeiras_modeloB_02.webp"
        ],
        "cores": [],
        "tamanhos": ["P", "M", "G", "GG", "XG"],
        "tipo": "Calção",
        "isKit": false,
        "ligaId": "serie-a",
        "timeId": "palmeiras"
    },
    {
        "nome": "Short Palmeiras Puma I 21/22",
        "preco": 99.9,
        "descricao": "Short Palmeiras Puma I 21/22",
        "imagens": [
            "/produtos/calcao_palmeiras_modeloA_01.png",
            "/produtos/calcao_palmeiras_modeloA_02.png"
        ],
        "cores": ["Verde"],
        "tamanhos": ["P", "M", "GG", "G", "XG"],
        "tipo": "Calção",
        "isKit": false,
        "ligaId": "serie-a",
        "timeId": "palmeiras",
        "itensDoKit": [],
        "tags": ["EXCLUSIVO KITSPOT"],
        "id": "1766f7a5-caa7-44ba-850c-f06e61f5ec7f"
    },
    {
        "nome": "Kit Verdão",
        "preco": 999.9,
        "descricao": "Kit com todas as camisas do verdão",
        "imagens": [
            "/produtos/camisa_palmeiras_modeloA_01.webp",
            "/produtos/camisa_palmeiras_modeloB_01.webp",
            "/produtos/camisa_palmeiras_modeloC_01.webp"
        ],
        "cores": [],
        "tamanhos": ["P", "M", "G", "GG", "XG"],
        "tipo": "Camisa",
        "isKit": true,
        "ligaId": "serie-a",
        "timeId": "palmeiras",
        "itensDoKit": [
            "ad1dd2e6-48ba-4eb0-b852-7322de3abebb",
            "9db6104f-8859-4a51-87d3-dc8c18983800",
            "04da5646-7a12-4b6f-b199-2354d9d2778e"
        ],
        "tags": ["PROMOÇÃO", "KIT"],
        "id": "8b9d3ace-2394-4020-88ae-bddb47e27c87"
    },
    {
        "nome": "Kit Tricolor Paulista",
        "preco": 999.9,
        "descricao": "Kit com todas as camisas do São Paulo Futebol Clube",
        "imagens": [
            "/produtos/camisa_spfc_modeloA_01.webp",
            "/produtos/camisa_spfc_modeloB_01.webp",
            "/produtos/camisa_spfc_modeloC_01.webp"
        ],
        "cores": [],
        "tamanhos": ["P", "M", "G", "GG", "XG"],
        "tipo": "Camisa",
        "isKit": true,
        "ligaId": "serie-a",
        "timeId": "spfc",
        "itensDoKit": [
            "9f672fef-29cd-4187-b631-25076644ee56",
            "daad98ed-9073-4e86-8bf0-aa041c23a182",
            "fcf49fbc-1269-495c-ac27-b22914ff7f8b"
        ],
        "tags": ["KIT", "PROMOÇÃO"],
        "id": "b1324850-ed8c-4fbb-bafb-3e4b0582b9a5"
    },
    {
        "nome": "Kit de jogo SPFC",
        "preco": 599.9,
        "descricao": "Kit de jogo Completo SPFC",
        "imagens": [
            "/produtos/camisa_spfc_modeloA_01.webp",
            "/produtos/calcao_spfc_modeloA_01.webp"
        ],
        "cores": [],
        "tamanhos": ["P", "M", "G", "GG", "XG"],
        "tipo": "Camisa",
        "isKit": true,
        "ligaId": "serie-a",
        "timeId": "spfc",
        "itensDoKit": [
            "9f672fef-29cd-4187-b631-25076644ee56",
            "2ed64590-3c40-45db-9149-15c0d0484ba8"
        ],
        "tags": ["KIT"],
        "id": "eb400062-89c7-4bc4-b7d4-f494355638d7"
    },
    {
        "id": "00ab5334-5b42-4dc4-9d4b-5f29568e53b2",
        "nome": "Calção Corinthians I 25/26",
        "preco": 284.99,
        "descricao": "Todo poderoso Timão! O Shorts Corinthians I 25/26 s/n Nike Masculino faz parte da linha que eterniza um dos momentos mais lendários da história do Time do Povo. Com um visual que resgata o estilo total 90, símbolo da era que o Timão conquistou o mundo, o shorts do Corinthians une o passado e o presente em um design que exala tradição. Com detalhes que remetem ao shorts da época, o modelo traz o estilo que você precisa, seja na arquibancada, dia a dia ou nos gramados. Com tecido tecnológico, o shorts Corinthians masculino afasta a umidade do corpo, enquanto o escudo exibe o orgulho de fazer parte da Fiel Torcida. Pertença à história. Peça já!",
        "imagens": [
            "/produtos/calcao_corinthians_modeloA_01.webp",
            "/produtos/calcao_corinthians_modeloA_02.webp",
            "/produtos/calcao_corinthians_modeloA_03.webp",
            "/produtos/calcao_corinthians_modeloA_04.webp"
        ],
        "cores": [],
        "tamanhos": ["P", "G", "M", "GG", "XG", "38", "40", "42"],
        "tipo": "Calção",
        "isKit": false,
        "ligaId": "serie-a",
        "timeId": "corinthians",
        "itensDoKit": [],
        "tags": ["PROMOÇÃO"]
    },
    {
        "id": "186778c9-131f-45db-bc6a-261929b30099",
        "nome": "Camisa Corinthians III 25/26",
        "preco": 664.99,
        "descricao": "Vista a história com a Camisa Corinthians III 25/26 Jogador Nike Masculina! Inspirada no emblemático estilo Total 90 da Nike de meados dos anos 2000, década que o Timão fez história conquistando o mundo pela primeira vez, esta terceira camisa do Corinthians é predominantemente preta com detalhes em laranja, combinando tradição e modernidade para os torcedores que buscam um visual estiloso e cheio de atitude. Confeccionada com materiais de alta qualidade e tecnologia que afasta o suor da pele, garante bem-estar e liberdade de movimento em todas as ocasiões, enquanto o escudo em patch destacado exibe sua conexão com o Time do Povo. Vista o orgulho de ser alvinegro – compre sua camisa Corinthians masculina e aproveite!",
        "imagens": [
            "/produtos/camisa_corinthians_modeloC_01.webp",
            "/produtos/camisa_corinthians_modeloC_02.webp",
            "/produtos/camisa_corinthians_modeloC_03.webp",
            "/produtos/camisa_corinthians_modeloC_04.webp"
        ],
        "cores": [],
        "tamanhos": ["P", "M", "G", "GG", "XG"],
        "tipo": "Camisa",
        "isKit": false,
        "ligaId": "serie-a",
        "timeId": "corinthians",
        "itensDoKit": [],
        "tags": ["EXCLUSIVO KITSPOT", "LANÇAMENTO"]
    },
    {
        "id": "d9e09e36-7f73-44a2-8a56-40afdbd0d192",
        "nome": "Camisa Corinthians II 25/26",
        "preco": 664.99,
        "descricao": "A loucura que dominou o mundo! A Camisa Corinthians II 25/26 s/n Jogador Nike chega para eternizar um dos momentos mais lendários da história do Time do Povo. Com um visual que resgata o estilo total 90, símbolo da era que o Timão conquistou o mundo, a camisa do Corinthians une o passado e o presente em um design que exala identidade e tradição. Com detalhes únicos que remetem ao manto da época, essa camisa Corinthians masculina traz o estilo que você precisa da bancada ao dia a dia. Seu tecido tecnológico afasta a umidade do corpo, enquanto o escudo centralizado exibe o orgulho de pertencer à Fiel Torcida. Não perca tempo – peça já o manto que colocou o Corinthians no topo do mundo!",
        "imagens": [
            "/produtos/camisa_corinthians_modeloB_01.webp",
            "/produtos/camisa_corinthians_modeloB_02.webp",
            "/produtos/camisa_corinthians_modeloB_03.webp",
            "/produtos/camisa_corinthians_modeloB_04.webp"
        ],
        "cores": [],
        "tamanhos": ["P", "M", "G", "GG", "XG"],
        "tipo": "Camisa",
        "isKit": false,
        "ligaId": "serie-a",
        "timeId": "corinthians",
        "itensDoKit": [],
        "tags": []
    },
    {
        "id": "afc782a4-408b-4ab7-b979-6bf3d930cb20",
        "nome": "Camisa Corinthians I 25/26",
        "preco": 664.99,
        "descricao": "Todo poderoso Timão! A Camisa Corinthians I 25/26 s/n Jogador Nike chega para eternizar um dos momentos mais lendários da história do Time do Povo. Com um visual que resgata o estilo total 90, símbolo da era que o Timão conquistou o mundo, a camisa do Corinthians une o passado e o presente em um design que exala identidade e tradição. Com detalhes únicos que remetem ao manto da época, essa camisa Corinthians masculina traz o estilo que você precisa da bancada ao dia a dia. Seu tecido tecnológico afasta a umidade do corpo, enquanto o escudo centralizado exibe o orgulho de pertencer à Fiel Torcida. Não perca tempo – peça já o manto que colocou o Corinthians no topo do mundo!",
        "imagens": [
            "/produtos/camisa_corinthians_modeloA_01.webp",
            "/produtos/camisa_corinthians_modeloA_02.webp",
            "/produtos/camisa_corinthians_modeloA_03.webp",
            "/produtos/camisa_corinthians_modeloA_04.webp"
        ],
        "cores": [],
        "tamanhos": ["P", "M", "G", "GG", "XG"],
        "tipo": "Camisa",
        "isKit": false,
        "ligaId": "serie-a",
        "timeId": "corinthians",
        "itensDoKit": [],
        "tags": ["PROMOÇÃO"]
    }
];

export async function GET(request, { params }) {
    // 1. EXTRAI O ID DO PARAMS (AGUARDANDO A PROMISE)
    const { id } = await params;

    // 2. BUSCA O PRODUTO GARANTINDO QUE SEJA STRING
    const produto = dadosProdutos.find(p => String(p.id) === String(id));

    if (!produto) {
        return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    return NextResponse.json(produto);
}