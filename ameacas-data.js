// =========================================
// AMEACAS-DATA.JS — banco de dados do bestiário
// =========================================
//
// Para adicionar uma nova ameaça, basta acrescentar um novo objeto ao
// array AMEACAS abaixo, seguindo o mesmo formato. Nada mais precisa
// ser tocado — a listagem, a busca, os filtros e a ficha individual
// leem tudo daqui.
//
// TODOS OS CAMPOS ABAIXO DE "pv"/"defesa" SÃO OPCIONAIS. Se um campo
// não existir no objeto da ameaça, o bloco correspondente na ficha
// simplesmente não aparece (sem caixa vazia, sem erro). Isso vale para:
// imunidades, resistencias, vulnerabilidades, deslocamento,
// testesResistencia (e cada uma de suas chaves individualmente),
// sentidos (e "outros" dentro dele), pericias, presencaCaotica,
// elementosComplementares e tamanho.
//
// Os atributos usam as mesmas 7 chaves da ficha de personagem (forca,
// destreza, constituicao, poder, inteligencia, sabedoria, carisma),
// e "elemento"/"elementosComplementares" usam as mesmas chaves de
// elementos.js (alma, espaco, mente, poder, realidade, tempo,
// transformacao, primordial).
//
// "acoes": cada uma pode ser um ataque (com "bonus" e/ou "dano", o que
// habilita os botões de rolagem) ou uma ação sem teste (só "descricao",
// sem "bonus"/"dano" — aparece sem botões de rolar).
//
// "pericias": lista de {nome, bonus} — aparecem como pastilhas
// clicáveis ("Atletismo +10") que rolam 1d10 + bonus.

const CATEGORIA_LABELS = {
    lacaio: "Lacaio",
    comum: "Comum",
    desafio: "Desafio",
    calamidade: "Calamidade"
};

const CATEGORIA_COLORS = {
    lacaio: "#7a8a7a",
    comum: "#3d7dc9",
    desafio: "#d97a3d",
    calamidade: "#c0392b"
};

// Faixas de VD usadas pelo filtro "VD baixo/médio/alto/muito alto".
const VD_TIERS = [
    { key: "baixo", label: "VD baixo (até 100)", max: 100 },
    { key: "medio", label: "VD médio (120–200)", max: 200 },
    { key: "alto", label: "VD alto (220–320)", max: 320 },
    { key: "muito-alto", label: "VD muito alto (340+)", max: Infinity }
];

function getVdTier(vd) {
    return VD_TIERS.find(tier => vd <= tier.max) || VD_TIERS[VD_TIERS.length - 1];
}

const AMEACAS = [
    {
        id: "lobisomem",
        nome: "Lobisomem",
        vd: 240,
        categoria: "desafio",
        elemento: "transformacao",
        elementosComplementares: ["poder"],
        tipo: "Aberração",
        tamanho: "Médio",
        descricao: "Um humano amaldiçoado que se transforma em uma fera bípede sob a lua cheia, caçando em matilhas famintas.",
        pv: 120,
        defesa: 18,
        deslocamento: "9m (correndo 18m)",
        imunidades: "Medo",
        resistencias: "Frio e impacto (metade do dano)",
        vulnerabilidades: "Prata (dano dobrado)",
        testesResistencia: { fortitude: 7, reflexos: 4, vontade: 3 },
        sentidos: { iniciativa: 5, percepcao: 6, outros: "Faro (18m), Visão no Escuro (18m)" },
        presencaCaotica: { dt: 14, danoMental: "1d6", nexIgnorar: 15 },
        pericias: [
            { nome: "Furtividade", bonus: 6 },
            { nome: "Intimidação", bonus: 5 }
        ],
        atributos: {
            forca: 4,
            destreza: 3,
            constituicao: 5,
            poder: 1,
            inteligencia: 1,
            sabedoria: 2,
            carisma: 1
        },
        acoes: [
            {
                nome: "Garras",
                bonus: 8,
                dano: "2d8+4",
                descricao: "Duas garradas rápidas em um mesmo alvo."
            },
            {
                nome: "Mordida",
                bonus: 6,
                dano: "1d10+4",
                descricao: "Se acertar, o alvo deve resistir ou ser infectado pela maldição."
            },
            {
                nome: "Investida Selvagem",
                descricao: "No início do turno, pode se mover até 9m adicionais em linha reta sem provocar ataques de oportunidade."
            }
        ],
        habilidades: [
            {
                nome: "Regeneração",
                descricao: "A criatura recupera 10 PV no início de seu turno, a menos que tenha sofrido dano de prata ou fogo no turno anterior."
            },
            {
                nome: "Faro Aguçado",
                descricao: "Vantagem em testes de Percepção baseados em olfato."
            }
        ]
    },
    //Destruidor
    {
        id: "destruidor",
        nome: "Destruidor",
        vd: 100,
        categoria: "desafio",
        elemento: "realidade",
        tipo: "Anomalia",
        descricao: "O caçador de agentes, considerado por vários o primeiro verdadeiro destruidor de grupos, a evolução de um Destruído após ser exposto a muito tempo dentro do Universo, esta aberração busca causar a todos o que sofreu durante sua existência.",
        pv: 200,
        defesa: 12,
        deslocamento: "9m - 6q",
        imunidades: "Dano e efeitos de Sangramento",
        resistencias: "Físico 10 e Realidade 20",
        vulnerabilidades: "Espaço e Frio",
        testesResistencia: { fortitude: 9, reflexos: 6, vontade: 2 },
        sentidos: { iniciativa: 6, percepcao: 0, outros: "Faro" },
        presencaCaotica: { dt: 10, danoMental: "4d6", nexIgnorar: 40 },
        pericias: [
            {nome: "Atletismo", bonus:11},
            {nome: "Furtividade", bonus:7},
            {nome: "Sobrevivência", bonus:3}
        ],
        atributos: {
            forca: 5,
            destreza: 4,
            constituicao: 3,
            poder: 2,
            inteligencia: -1,
            sabedoria: 0,
            carisma: 0
        },
        acoes: [
            {
                nome: "PADRÃO - Garras X2",
                bonus: 11,
                dano: "2d8+5",
                descricao: "Dano de Corte."
            },
            {
                nome: "PADRÃO - Mordida",
                bonus: 9,
                dano: "2d12+5",
                descricao: "Dano de Perfuração."
            }
            ,
            {
                nome: "REAÇÃO LIVRE - Arrancar Pedaço",
                descricao: "Quando realiza um acerto crítico com suas Garras, o Destruídor pode deixar o alvo Sangrando (Fortitude DT 10 evita)."
            },
            {
                nome: "LIVRE - Sequência de Carnificina",
                descricao: "Apenas observando o ódio, quando o Destruidor acerta dois ataques com Garras em um mesmo alvo em seu turno, ele pode realizar um ataque de Mordida contra o alvo e se acertar, recebe +1d12 de dano adicional do mesmo tipo, porém, sua Defesa é diminuída em -2 e suas RD física é diminuída para 5 até o início de seu próximo turno."
            },
            {
                nome: "COMPLETA - Grito Aberrante",
                descricao: "O Destruidor urra em dor enquanto observa a sua próxima vítima em alcance Médio, que deve fazer um teste de Vontade (Vontade DT 10) ou ficará Abalado até o fim da cena, e o Destruídor possuíra vantagem em todos os seus testes de ataques contra o ser. Esta habilidade só pode ser usada uma vez por cena, a não ser que o Destruidor mate o seu alvo, podendo então usar seu grito em outro alvo."
            },
            {
                nome: "UMA AÇÃO INJUSTA",
                descricao: "Uma vez por rodada, o Destruidor pode atacar com suas Garras como uma ação injusta."
            }
        ],
        habilidades: [
            {
                nome: "Furtivo e Letal",
                descricao: "Quando o Destruidor ataca um personagem Desprevenido, ele recebe vantagem no teste de ataque e, se acertar, cada ataque causa +2d6 de dano adicional do mesmo tipo."
            },
            {
                nome: "Faro Aguçado",
                descricao: "O que move o Destruidor se fortifica quando fica Machucado, assumindo uma pose assustadoramente brutal, perdendo seu instinto de caçador e se guiando apenas por sede de sangue. Ele recebe +2 em testes de ataque e +5 em rolagens de dano."
            }
        ]
    },
    //Espectro
    {
        id: "espectro",
        nome: "Espectro",
        vd: 20,
        presencaCaotica:{dt: 8, danoMental: "2d6", nexIgnorar: 15},
        categoria: "comum",
        elemento: "alma",
        tipo: "Anomalia",
        descricao: "Seres que sofreram mortes terríveis, que não foram capazes de não ficar agonizados enquanto morriam, geralmente vindo de incêndios ou torturas, fazendo com que suas almas se mantem em nosso universo, com a Alma ainda os mantendo para que outros sofram as mesmas consequências.",
        pv: 30,
        defesa: 10,
        deslocamento: "Voo 9m - 6q",
        imunidades: "",
        resistencias: "Físico 5 e Alma 10",
        vulnerabilidades: "Mente",
        testesResistencia: { fortitude: -2, reflexos: 6, vontade: 0 },
        sentidos: { iniciativa: 6, percepcao: 3, outros: "Visão no Escuro" },
        atributos: {
            forca: 0,
            destreza: 4,
            constituicao: 0,
            poder: 1,
            inteligencia: 0,
            sabedoria: 0,
            carisma: 2
        },
        acoes: [
            {
                nome: "PADRÃO - Garra Espectral",
                bonus: 5,
                dano: "1d10+4",
                descricao: "Dano de Alma."
            },
            {
                nome: "COMPLETA - Possessão Forçada",
                dano: "1d8",
                descricao: "O Espectro tenta fazer com que seu próprio espírito adentre um alvo adjacente, o possuindo (Vontade DT 8 anula), prendendo sua forma física dentro do ser. Enquanto estiver possuindo um ser, o Espectro pode utilizar quaisquer efeitos e habilidades que se originam do alvo e age no lugar do ser em seu turno. Qualquer dano causado no Espectro é reduzido pela metade, onde o alvo possuído sofre esta parte restante. No inicio dos turnos do alvo, ele perde 1d8 pontos de Sanidade e deve no final de seu turno, após ter perdido suas ações pelo Espectro, fazer novamente o teste de Vontade, com um bônus cumulativo de +1 para cada vez que tenha falhado nos testes durante esta possessão. Se um ser enlouquecer enquanto o Espectro estiver o possuindo, ele tem todo o seu corpo sendo completamente transformado em plasma e sendo absorvido pelo Espectro, que recebe +10% de Taxa de Adaptação e pode escolher ficar com uma das habilidades do alvo ao invés de uma habilidade de ameaça."
            }
        ],
        habilidades: [
            {
                nome: "ATRAIR E DESTRUIR",
                descricao: "O Espectro busca primeiro atrair as suas vítimas, assimilando uma forma mais inofensiva para poder ataca-los. Enquanto conseguir manter a aparência inofensiva, ele recebe vantagem em seus testes sociais e recebe vantagem no primeiro ataque que fizer contra seus alvos, que também sofrem uma penalidade de -2 em seus testes de Vontade na primeira rodada contra o Espectro."
            },
            {
                nome:"FANTASMA",
                descricao:"O Espectro é incorpóreo, portanto, consegue atravessar entre objetos sólidos, mas não pode os manipular e só pode ser afetado por itens elementais, poderes ou outras ameaças incorpóreas. Porém, caso o Espectro entre em contato com agua benta, ele deixa de ser incorpóreo até o fim da próxima rodada. "
            }
        ]
    },
    //Soberano
    {
        id: "soberano",
        nome: "Soberano do Inverno Infernal",
        vd: 580,
        categoria: "calamidade",
        elemento: "espaco",
        elementosComplementares: ["poder"],
        tipo: "Artefato",
        descricao: "A supremacia em forma, com sua lâmina invertida e ventos frios que sempre lhe acompanham, o " +
        "Inverno Infernal encarnado não é apenas um presságio do fim, e sim de um novo começo. Sua forma física não " +
        "existia, apenas sua presença na verdadeira Ilha do Inverno era o suficiente para que todo o mundo presenciasse a "+
        "profecia que finalizaria tudo, porém, após a morte de seu grande campeão, Magus, o portador do Artefato de Espaço "+
        "decidiu que era o suficiente, ele removeria as pragas com suas próprias mãos, sem mais avisos, sem mais preparações,"+
        " um último massacre para que todas as revoltas finalmente dissipassem.",
        pv: 4000,
        defesa: 37,
        deslocamento: "12m - 8q Voo e Natação",
        imunidades: "Condições Físicas, Sensoriais e de Velocidade e efeitos de Espaço",
        resistencias: "Dano 50",
        vulnerabilidades: "Transformação",
        testesResistencia: { fortitude: 20, reflexos: 15, vontade: 29 },
        presencaCaotica: { dt: 34, danoMental: "18d6", nexIgnorar: "Impossível Ignorar" },
        sentidos: { iniciativa: 29, percepcao: 20, outros: "Percepção às Cegas (Extremo) e Visão no Escuro" },
        pericias: [{ nome: "Atletismo", bonus: 30}],
        atributos: {
            forca: 10,
            destreza: 5,
            constituicao: 5,
            poder: 8,
            inteligencia: 4,
            sabedoria: 4,
            carisma: 2
        },
        acoes: [
            {
                nome: "PADRÃO - Lança do Inverno X3",
                bonus: 34,
                dano: "6d10+50",
                descricao: "Dano de Espaço ou Perfuração, deixa Congelando."
            },
            {
                nome: "PADRÃO - Manopla do Frio X3",
                bonus: 34,
                dano: "6d8+30 ",
                descricao: "Dano de Frio."
            },
            {
                nome: "PADRÃO - Lança do Inverno X3 Distância Média",
                bonus: 34,
                dano: "6d10+30",
                descricao: "Dano de Espaço ou Perfuração, deixa Congelando."
            },
            {
                nome: "REAÇÃO LIVRE - Curve-se ❄️",
                descricao: "Uma vez por rodada, quando um ser tenta usar uma ação hostil contra o Soberano, ele apenas o observa, realizando um teste de Intimidação oposto à Vontade do agressor. Se o Soberano vencer, o ser perde a ação que iria fazer, ficando Caído e Lento até se levantar, se curvando ao verdadeiro governante. Um ser que vença o teste oposto fica imune a esta habilidade até o fim da cena."
            },
            {
                nome: "LIVRE - Agarrão Gravitacional",
                bonus: 36,
                dano: "2d10+20",
                descricao: "Uma vez por turno, quando acertar um ataque com suas Manoplas, o Soberano pode tentar agarrar o alvo (1d10+36). Se passar, o Soberano o agarra e o levita no ar manipulando a gravidade ao redor do alvo, onde o mesmo fica voando a 9m do chão, mas ainda está agarrando pela própria gravidade e, no início de seus turnos, sofre 2d10+20 (32) pontos de dano de Impacto, enquanto é esmagado."
            },
            {
                nome: "LIVRE - Desmaterializar ❄️",
                bonus: 36,
                dano: "6d8+30",
                descricao: "Uma vez por turno, quando acertar um ataque com suas Manoplas, o Soberano pode tentar quebrar um item visível do alvo (1d10+36). Se passar, o Soberano ignora a RD do item e caso o mesmo chegue a 0 PV, é completamente desmaterializado, se tornando parte do Soberano."
            },
            {
                nome: "COMPLETA - Ataque Giratório",
                dano: "2d12+30 + 3d12",
                descricao: "O Soberano gira sua lança ao redor do seu corpo, acertando todos os seres e objetos em um raio de 9m. Estes sofrem 2d12+30 (44) pontos de dano de Perfuração mais 3d12 (21) pontos de dano de Frio (Reflexos DT 34 reduz ambos à metade)."
            },
            {
                nome: "COMPLETA - Mostrar Visão",
                dano: "10d6",
                descricao: "O Soberano faz com que uma pessoa em alcance extremo veja o mundo como ele vê. Apenas ter um pequeno vislumbre de quão pequeno a pessoa é comparada ao Espaço de tudo, faz ele sofrer 10d6 (40) pontos de dano Mental e fica Atordoado até o fim de seu próximo turno (Vontade DT 34 reduz o dano à metade e evita condição)."
            },
            {
                nome: "DUAS AÇÕES INJUSTAS",
                descricao: "Duas vezes por rodada, o Soberano pode realizar um ataque com suas Manoplas do Frio como uma ação injusta."
            },
            {
                nome: "INJUSTA - Investida Infernal",
                descricao: "O Soberano segura sua lança com seus dois braços e então prepara uma postura de avanço, olhando na direção do último ser que o atingiu. Quando outro ser lhe ataca, ele volta o olhar na direção deste novo ser. No início de seu próximo turno, o Soberano avança em uma linha reta de 18m na direção onde o ser está, realizando uma investida contra o alvo, e, se o ataque for um crítico, o alvo é empalado pela lança, ficando Agarrado e Sangrando, porém, o dano de Sangramento causado por esta condição ocorre no início de cada turno, ao invés de apenas no turno do alvo. Enquanto estiver agarrando alguém desta forma, o Soberano não pode realizar ataques com sua Lança do Inverno."
            },
            {
                nome: "MOVIMENTO - Congelar",
                descricao: "O Soberano encara um personagem em alcance curto e repentinamente, o ambiente ao redor do personagem começa a esfriar completamente, fazendo o ficar Congelando e Debilitado (Fortitude DT 34 evita Debilitado)."
            },
            {
                nome: "PADRÃO - Ciclone",
                dano: "3d4",
                descricao: "O Soberano dispara um vento forte em alcance curto, que faz com que um cilindro de 4,5m de raio de 9m de altura levante e empurre todos os seres presentes nele em uma distância de 3d4 * 1,5m em uma direção aleatória e sofram 1d6 (4) de dano de Impacto para cada 1,5m que percorreram e ficam Caídos (Reflexos DT 34 reduz a distância à metade)."
            },
            {
                nome: "PADRÃO - Cone de Gelo",
                dano: "8d10",
                descricao: "Uma rajada de um ar frio expande das mãos do Soberano, fazendo com que todos em um cone de 4,5m sofram 8d10 (48) pontos de dano de Frio e ficam Petrificados por uma rodada e Lentos após isso (Fortitude DT 34 reduz o dano à metade e fica Lento apenas por uma rodada)."
            },
            {
                nome: "COMPLETA - Zero Absoluto ❄️",
                dano: "10d12+50",
                descricao: "O Soberano encosta sua manopla em seu próprio peito e então retira um fragmento de frio tão forte que é capaz de congelar qualquer coisa que toca, e então, realiza um ataque em um alvo adjacente (1d10+34). Se acertar, o alvo sofre 10d12+50 (120) pontos de dano de Frio e fica Petrificado até o fim da cena (Fortitude DT 34 reduz o dano à metade e evita a condição). Um ser que chegue a 0 PV por este efeito vira uma estátua de gelo, morrendo instantaneamente."
            },
            {
                nome: "INJUSTA - Cometa Azul ❄️",
                dano: "10d12+50",
                descricao: "O Soberano levanta uma de suas mãos ao céu, e então, manifesta uma quantidade absurda de energia elemental ao alto. Todos em até 5 quilômetros conseguem ver enquanto um meteoro é formado em cima de suas cabeças. Enquanto estiver conjurando o poder, o Soberano sofre os efeitos de sustentação. No início de seu próximo turno, o Soberano finaliza sua conjuração e então, um cometa azul cai em direção a área designada, fazendo com que todos os seres na área sofram 10d12+50 (120) pontos de dano (metade Espaço, metade Impacto). Objetos na área sofrem o dano triplicado."
            },
            {
                nome: "INJUSTA - Empuxo",
                dano: "4d10",
                descricao: "O Soberano cria uma esfera eletromagnética em alcance Longo, que começa a se formar. Ela possui PV 50 e RD 20. Se, no inicio de seu próximo turno, a esfera ainda não tiver sido destruída, todos os seres que estiverem segurando itens em alcance longo devem fazer um teste de Força, se falharem, o item que estavam empunhando é puxado em direção a esfera, que fica preso até ela ser destruída. Este efeito se repete no inicio de cada rodada. Ao destruir a esfera, todos em alcance adjacente a ela sofrem 4d10 (24) pontos de dano Eletrizante e ficam Eletrificados até o fim de seu próximo turno."
            }
        ],
        habilidades: [
            {
                nome: "ABDICAR O SANGUE",
                descricao: "O Soberano do Inverno Infernal é a única coisa capaz de revelar a Verdade Absoluta da Aberração."
            },
            {
                nome: "ARMADURA CENTENÁRIA",
                descricao: "A armadura que segura os ventos da destruição não foi feita para proteger o Soberano, e sim para conter seu poder. Por isso, toda vez que sofre um ataque corpo a corpo, o ser que lhe atacou perde 10 PV, por conta das fagulhas de seu poderio saindo conforme o ataque. Um ser pode escolher fazer com que sua arma perca esses PV, ao invés dele. Além disso, três vezes por cena, o Soberano pode escolher elevar o resultado de um teste der resistência em um nível. Por fim, duas vezes por cena faz com que um teste de resistência seja automaticamente um crítico. Porém, ao usar qualquer uma dessas ações, o Soberano perde 1 de Defesa até o início de seu próximo turno."
            },
            {
                nome: "ASCENSÃO - CATACLISMA SEM FIM",
                descricao: "Quando fica Machucado, o Soberano libera de seu peito os ventos do cataclismo, que são espalhados não somente no campo de batalha, mas no mundo todo. Todos os seus deslocamentos aumentam em +6m e pode usar todas as habilidades com o símbolo ❄️ ao lado. Além disso, uma aura de frio absoluto paira ao seu redor. Toda a área em alcance Longo ao redor do Soberano é considerada um Ambiente Horripilante, que causa 10 pontos de dano Mental e Frio por rodada. Por fim, todos os lugares (incluindo o campo de batalha) do mundo são tomados por uma Tempestade (Stars RPG, página XX), enquanto o Soberano libera sua fúria ao redor de todas as pessoas que não se mostraram dignas. Os personagens participando da luta não irão sofrer os efeitos diretos por isso, porém, o Soberano é cruel, e mostra o número exato de todas as pessoas que estão morrendo por conta deste confronto. Cada jogador, no início de seus turnos deve jogar 1d10, ao fim da rodada, o mestre deve somar todos esses valores e multiplicar por 10. Essa é a quantidade de pessoas que estão morrendo ao redor do mundo, por tempestades, tsunamis, terremotos e outros efeitos climáticos brutais. A cada rodada a partir dessa, o número multiplicado se torna 100, 1000 e 10000 respectivamente. Se este valor chegar a até 1 bilhão de pessoas, a Aurora não consegue se proteger da quantidade de Caos no mundo, fazendo com que a Aurora se rompa, abrindo uma passagem direta com o Inexistente, causando o fim do mundo."
            },
            {
                nome: "LANÇA DO INVERNO",
                descricao: "A lança do Soberano do Inverno Infernal é uma longa haste de metal escurecido e gasto, com a ponta lascada e cega. As marcas de batalha cobrem todo o corpo da arma, agora corroído por ferrugem e manchas de sangue. Um símbolo com diversos anagramas de cubos e outros símbolos, gravado à base; emana um frio sombrio. Embora pareça inútil, a lança carrega o poder do próprio frio consigo. Esta é uma lança (corpo a corpo com 9m de alcance, duas mãos, Custo 50, 2d12 pontos de dano de Perfuração + 2d12 pontos de dano de Frio, crítico 8/+2d que também aumentam o dano de Frio, pode ser arremessada em alcance Médio, pesa 3 espaços) que fornece +3 em testes de ataque com ela e deixa qualquer alvo que sofra dano com ela Congelando. Qualquer ser com 5 ou mais de Força consegue segurar a arma com apenas uma mão. "
            },
            {
                nome: "PROFECIA ETERNA",
                descricao: "O Inverno Infernal vai acontecer, não importa quantas vezes impeçam-no. Por isso, o Soberano é incapaz de morrer, ao invés disso, quando chega a 0 PV, ele apenas se desfaz de sua ira, se dissipando e se reunindo novamente na Verdadeira Ilha do Inverno, iniciando a profecia novamente, e então, após 2d100 * 10 anos, ele retorna, recuperando todos seus PV e se curando de quaisquer efeitos negativos que lhe afetavam. Além disso, ele possui Cura Acelerada 25. Quando sua Verdade Absoluta for descoberta, o Soberano perde sua Cura Acelerada e a capacidade de se dissipar, assim, pode morrer ao chegar em 0 PV."
            }
        ]
    },
    {
        id: "sombra-rastreira",
        nome: "Sombra Rastreira",
        vd: 20,
        categoria: "lacaio",
        elemento: "alma",
        tipo: "Espírito",
        tamanho: "Pequena",
        descricao: "Um resquício de alma perdida que se arrasta pelas sombras, atacando em números.",
        pv: 15,
        defesa: 12,
        deslocamento: "9m (flutuando)",
        imunidades: "Veneno, doença",
        vulnerabilidades: "Luz radiante",
        testesResistencia: { fortitude: 0, reflexos: 3 },
        sentidos: { iniciativa: 3, percepcao: 1 },
        atributos: {
            forca: 0,
            destreza: 2,
            constituicao: 0,
            poder: 1,
            inteligencia: -1,
            sabedoria: 0,
            carisma: -1
        },
        acoes: [
            {
                nome: "Toque Gélido",
                bonus: 3,
                dano: "1d6",
                descricao: "Um toque que rouba o calor do corpo."
            },
            {
                nome: "Dissolver-se",
                descricao: "Pode se tornar incorpórea até o início do próximo turno, ignorando dano físico nesse período."
            }
        ],
        habilidades: [
            {
                nome: "Incorpórea",
                descricao: "Pode atravessar paredes finas e não é afetada por armadilhas físicas."
            }
        ]
    },
    {
        id: "zumbi-errante",
        nome: "Zumbi Errante",
        vd: 140,
        categoria: "comum",
        elemento: "transformacao",
        tipo: "Morto-vivo",
        tamanho: "Médio",
        descricao: "Um corpo reanimado por uma força paranormal, lento mas incansável.",
        pv: 45,
        defesa: 13,
        deslocamento: "6m",
        imunidades: "Veneno, doença, efeitos que exijam respiração",
        vulnerabilidades: "Fogo",
        testesResistencia: { fortitude: 4, reflexos: -1, vontade: 0 },
        sentidos: { percepcao: 1 },
        pericias: [
            { nome: "Atletismo", bonus: 4 }
        ],
        atributos: {
            forca: 3,
            destreza: -1,
            constituicao: 3,
            poder: 0,
            inteligencia: -2,
            sabedoria: -1,
            carisma: -2
        },
        acoes: [
            {
                nome: "Golpe",
                bonus: 5,
                dano: "1d8+2",
                descricao: "Um golpe pesado e descoordenado."
            }
        ],
        habilidades: [
            {
                nome: "Não Morto",
                descricao: "Imune a veneno e a efeitos que exijam respiração."
            }
        ]
    },
    {
        id: "arauto-do-fim",
        nome: "Arauto do Fim",
        vd: 380,
        categoria: "calamidade",
        elemento: "realidade",
        elementosComplementares: ["poder", "mente"],
        tipo: "Entidade",
        tamanho: "Grande",
        descricao: "Uma fenda na realidade tomou forma quase humana. Sua simples presença distorce o espaço ao redor.",
        pv: 300,
        defesa: 22,
        deslocamento: "9m (voando, 18m)",
        imunidades: "Medo, controle mental",
        resistencias: "Todos os danos físicos (metade)",
        testesResistencia: { fortitude: 10, reflexos: 7, vontade: 9 },
        sentidos: { iniciativa: 6, percepcao: 8, outros: "Percepção às Cegas (27m), Visão Verdadeira" },
        presencaCaotica: { dt: 20, danoMental: "2d6", nexIgnorar: 40 },
        pericias: [
            { nome: "Intimidação", bonus: 10 },
            { nome: "Ocultismo", bonus: 8 }
        ],
        atributos: {
            forca: 5,
            destreza: 3,
            constituicao: 6,
            poder: 7,
            inteligencia: 4,
            sabedoria: 3,
            carisma: 2
        },
        acoes: [
            {
                nome: "Ruptura",
                bonus: 12,
                dano: "3d10+7",
                descricao: "Um estilhaço de realidade quebrada corta o alvo."
            },
            {
                nome: "Onda de Vazio",
                bonus: 10,
                dano: "4d8",
                descricao: "Atinge todos em uma área; alvos devem resistir ou ficarem Enjoados."
            },
            {
                nome: "Fenda Instável",
                descricao: "Abre uma fenda temporária que impede teleporte e movimento dimensional em um raio de 18m até o início do próximo turno."
            }
        ],
        habilidades: [
            {
                nome: "Presença Devastadora",
                descricao: "Criaturas a até 9m devem ser bem-sucedidas em um teste de Vontade no início de seu turno ou ficam Apavoradas por 1 rodada."
            },
            {
                nome: "Regeneração Dimensional",
                descricao: "Recupera 20 PV no início de seu turno, a menos que tenha sofrido dano do elemento Realidade."
            }
        ]
    }
];
