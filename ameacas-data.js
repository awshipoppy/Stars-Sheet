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
    //Assassino
    {
        id: "assassino",
        nome: "Assassino",
        vd: 80,
        categoria: "comum",
        elemento: "nenhum",
        tipo: "Pessoa",
        tamanho: "Médio",
        descricao: "O assassino é um matador habilidoso e furtivo, que surge quando as ameaças do universo precisam eliminar alguém de forma discreta e eficiente.",
        pv: 90,
        defesa: 9,
        deslocamento: "9m - 6q",
        resistencias: "Balístico, Corte e Impacto 1",
        testesResistencia: { fortitude: 4, reflexos: 5, vontade: -1 },
        sentidos: { iniciativa: 5, percepcao: 1},
        pericias: [
            {nome: "Furtividade", bonus:9},
            {nome: "Enganação", bonus:7},
            {nome: "Prestidigitação", bonus:9}
        ],
        atributos: {
            forca: 2,
            destreza: 4,
            constituicao: 1,
            poder: 2,
            inteligencia: 0,
            sabedoria: 0,
            carisma: 2
        },
        acoes: [
            {
                nome: "PADRÃO - Faca X2",
                bonus: 9,
                dano: "1d4+10",
                descricao: "Dano de Corte."
            },{
                nome: "PADRÃO - Pistola X2",
                bonus: 9,
                dano: "1d12+10",
                descricao: "Distância Curta, dano Balístico."
            },
            {
                nome: "REAÇÃO LIVRE - Ataque Furtivo",
                dano: "4d6",
                descricao: "Uma vez por cena, caso o Assassino acerte um personagem com vantagem em seu teste de ataque, ele pode adicionar +4d6 na rolagem de dano neste ataque."
            },
            ,
            {
                nome: "REAÇÃO LIVRE - Mão na Boca",
                bonus: 9,
                descricao: "Quando faz um ataque corpo a corpo furtivo contra um ser desprevenido, o assassino pode fazer um teste de agarrar (+9). Se agarrar o ser, o mesmo não vai poder falar enquanto estiver agarrado."
            },
            {   nome:"MOVIMENTO - Assassinar",
                dano: "8d6",
                descricao: "O Assassino analisa um ser em alcance Curto. Até o fim de seu próximo turno, seu primeiro Ataque Furtivo que causar dano a ele tem seus dados duplicados."
            }
        ]
    },
    //Bandido
    {
        id: "bandido",
        nome: "Bandido",
        vd: 10,
        categoria: "lacaio",
        elemento: "nenhum",
        tipo: "Pessoa",
        tamanho: "Médio",
        descricao: "Um criminoso de rua, beco ou membro de gangue, são mais fortes do que pessoas comuns e podem causar um certo estrago.",
        pv: 10,
        defesa: 5,
        deslocamento: "9m - 6q",
        resistencias: "Balístico, Corte e Impacto 1",
        testesResistencia: { fortitude: 0, reflexos: 3, vontade: -4 },
        sentidos: { iniciativa: 2, percepcao: 0},
        pericias: [
            {nome: "Prestidigitação", bonus:3}
        ],
        atributos: {
            forca: 1,
            destreza: 2,
            constituicao: 1,
            poder: 0,
            inteligencia: 0,
            sabedoria: 0,
            carisma: -1
        },
        acoes: [
            {
                nome: "PADRÃO - Pistola",
                bonus: 4,
                dano: "1d10",
                descricao: "Distância Curta, dano Balístico."
            },
            {
                nome: "PADRÃO - Faca",
                bonus: 4,
                dano: "1d6+2",
                descricao: "Dano de Perfuração."
            }
            ,
            {
                nome: "REAÇÃO LIVRE - Ataque Furtivo",
                dano: "1d6",
                descricao: "Uma vez por cena, caso o Bandido acerte um personagem com vantagem em seu teste de ataque, ele pode gastar 1 PP para adicionar +1d6 na rolagem de dano neste ataque."
            }
        ]
    },
    //Bêbado Local
    {
        id: "bebado",
        nome: "Bebado Local",
        vd: 5,
        categoria: "lacaio",
        elemento: "nenhum",
        tipo: "Pessoa",
        tamanho: "Médio",
        descricao: "Simpático, falante e sempre cheio de histórias, o bêbado local é aquele sujeito conhecido por todos da vizinhança. ",
        pv: 5,
        defesa: 4,
        deslocamento: "6m - 4q",
        resistencias: "Químico 1",
        testesResistencia: { fortitude: 2, reflexos: 0, vontade: -4 },
        sentidos: { iniciativa: 0, percepcao: 5},
        pericias: [
            {nome: "Diplomacia", bonus:3}
        ],
        atributos: {
            forca: 0,
            destreza: 0,
            constituicao: 1,
            poder: 0,
            inteligencia: 0,
            sabedoria: 0,
            carisma: 1
        },
        acoes: [
            {
                nome: "PADRÃO - Soco",
                bonus: 0,
                dano: "1d3",
                descricao: "Dano de Impacto"
            }
        ],
        habilidades: [
            {
                nome:"CAUSOS E HISTÓRIAS",
                descricao: "O bêbado local conhece muitas histórias, passadas e presentes, de sua região. Um personagem recebe +2 em testes de Investigação para interrogar um bêbado local, desde que a DT da informação seja 10 ou menos."
            },
            {
                nome:"ESPIÃO INVOLUNTÁRIO",
                descricao: "O bêbado local pode ser empregado como um espião por um NPC interessado em informações locais. Sempre um personagem interage com um bêbado local, deve fazer um teste de Intuição ou Vontade (DT 8). Se falhar, revela inadvertidamente alguma informação relevante; cada informação revelada fornece um bônus de +2 que o mestre pode gastar ao longo da missão para aumentar a DT de um teste relacionado à investigação contra os personagens."
            },
            {
                nome:"INVISIBILIDADE SOCIAL",
                descricao: "É fácil não perceber o bêbado local. Talvez ele se esforce para passar despercebido, ou talvez ignorar sua presença seja fácil para pessoas socialmente privilegiadas. Se o bêbado não estiver fazendo nenhuma ação chamativa, outras pessoas precisam passar em um teste de Percepção (DT 8) para notar sua presença. Se falharem, o bêbado local é considerado invisível."
            }
        ]
    },
    //Cão de Guarda
    {
        id: "cao",
        nome: "Cão de Guarda",
        vd: 10,
        categoria: "lacaio",
        elemento: "nenhum",
        tipo: "Animal",
        tamanho: "Médio",
        descricao: "Cães treinados para guarda podem causar problemas para um grupo de agentes que precisa ser furtivo. Estas estatísticas podem ser usadas também para representar cães policiais. ",
        pv: 6,
        defesa: 5,
        deslocamento: "12m - 8q",
        testesResistencia: { fortitude: 0, reflexos: 3, vontade: 4 },
        sentidos: { iniciativa: 2, percepcao: 2, outros: "Faro, Visão na Penumbra"},
        atributos: {forca: 1,
            destreza: 2,
            constituicao: 1,
            poder: 0,
            inteligencia: -1,
            sabedoria: 0,
            carisma: 0
        },
        acoes: [
            {
                nome: "PADRÃO - Mordida",
                bonus: 4,
                dano: "1d6+2",
                descricao: "Dano de Corte"
            },
            {
                nome: "LIVRE - Derrubar",
                bonus: 4,
                descricao: "Se o cão de guarda acertar um ataque de mordida, pode fazer a manobra derrubar (+4)."
            }
        ]
    },
    //Capataz
    {
        id: "capataz",
        nome: "Capataz",
        vd: 20,
        categoria: "lacaio",
        elemento: "nenhum",
        tipo: "Pessoa",
        tamanho: "Médio",
        descricao: "São os bandidos mais treinados e capazes de atos violentos ainda piores, sendo geralmente líderes de pequenas gangues.",
        pv: 20,
        defesa: 9,
        deslocamento: "9m - 6q",
        resistencias: "Balístico, Corte e Impacto 2",
        testesResistencia: { fortitude: 4, reflexos: 5, vontade: -1 },
        sentidos: { iniciativa: 5, percepcao: 1},
        pericias: [
            {nome: "Furtividade", bonus:5},
            {nome: "Intimidação", bonus:2},
            {nome: "Prestidigitação", bonus:5}
        ],
        atributos: {
            forca: 2,
            destreza: 2,
            constituicao: 1,
            poder: 0,
            inteligencia: -1,
            sabedoria: -1,
            carisma: 0
        },
        acoes: [
            {
                nome: "PADRÃO - Revólver",
                bonus: 5,
                dano: "1d12+2",
                descricao: "Distância Curta, dano Balístico."
            },
            {
                nome: "PADRÃO - Soco Inglês X2",
                bonus: 4,
                dano: "1d6+5",
                descricao: "Dano de Impacto."
            },
            {
                nome: "PADRÃO - Fuzil de Assalto",
                bonus: 5,
                dano: "2d8+2",
                descricao: "Distância Média, dano Balístico."
            },
            {
                nome: "REAÇÃO LIVRE - Ataque Furtivo",
                dano: "2d6",
                descricao: "Uma vez por cena, caso o Bandido acerte um personagem com vantagem em seu teste de ataque, ele pode adicionar +2d6 na rolagem de dano neste ataque."
            }
        ]
    },
    //Chefe de Polícia
    {
        id: "chefedepolicia",
        nome: "Chefe de Polícia",
        vd: 100,
        categoria: "comum",
        elemento: "nenhum",
        tipo: "Pessoa",
        tamanho: "Médio",
        descricao: "Um delegado ou coronel, que já passou por situações difíceis e não se intimida facilmente.",
        pv: 105,
        defesa: 14,
        deslocamento: "9m - 6q",
        testesResistencia: { fortitude: 5, reflexos: 6, vontade: 3 },
        sentidos: { iniciativa: 6, percepcao: 3},
        pericias: [
            {nome: "Intimidação", bonus:7},
            {nome: "Tática", bonus:7}
        ],
        atributos: {
            forca: 4,
            destreza: 4,
            constituicao: 2,
            poder: 0,
            inteligencia: 3,
            sabedoria: 0,
            carisma: 0
        },
        acoes: [
            {
                nome: "PADRÃO - Bastão X2",
                bonus: 9,
                dano: "2d8+8",
                descricao: "Dano de Impacto"
            },
            {
                nome: "PADRÃO - Espingarda X2",
                bonus: 7,
                dano: "4d6+10",
                descricao: "Distância Curta, dano Balístico"
            },
            {
                nome: "REAÇÃO - Teimoso",
                descricao: "Duas vezes por cena, o Chefe de Polícia pode usar uma reação para ignorar um efeito que exija teste de resistência ou reduzir um dano recém sofrido a metade"
            }
        ],
        habilidades: [
            {
                nome:"FORTIFICAÇÃO",
                descricao: "Graças ao seu equipamento, o policial de elite tem 50% de chance de ignorar o dano adicional de um acerto crítico ou ataque furtivo." 
            }
        ]
    },
    //Comandante Mercenário
    {
        id: "comandante mercenario",
        nome: "Comandante Mercenário",
        vd: 100,
        categoria: "desafio",
        elemento: "nenhum",
        tipo: "Pessoa",
        tamanho: "Médio",
        descricao: "Uma pessoa endurecida por anos de conflitos. Um comandante mercenário é tanto um oficial competente, capaz de liderar seus subordinados, quanto um combatente perigoso por si só.",
        pv: 200,
        defesa: 14,
        deslocamento: "12m - 8q",
        resistencias: "Físico e Ambiental 5",
        testesResistencia: { fortitude: 4, reflexos: 7, vontade: 2 },
        sentidos: { iniciativa: 6, percepcao: 2},
        pericias: [
            {nome: "Intimidação", bonus:5},
            {nome: "Tática", bonus:6}
        ],
        atributos: {
            forca: 3,
            destreza: 4,
            constituicao: 3,
            poder: 2,
            inteligencia: 2,
            sabedoria: 1,
            carisma: 0
        },
        acoes: [
            {
                nome: "PADRÃO - Machete X2",
                bonus: 10,
                dano: "2d10+10",
                descricao: "Dano de Corte."
            },
            {
                nome: "PADRÃO - Metralhadora X2",
                bonus: 10,
                dano: "2d10+10",
                descricao: "Distância Média, dano Balístico."
            },
            {
                nome: "MOVIMENTO - Ordens",
                descricao: "O chefe mercenário grita ordens para seus aliados em alcance médio. Enquanto ele estiver em pé, todos eles recebem vantagem em testes de perícia e causam mais um dado de dano do mesmo tipo até o fim da cena."
            },
            {
                nome: "COMPLETA - Ataque em Movimento",
                descricao: "O chefe mercenário pode percorrer seu deslocamento e atacar em qualquer ponto durante o movimento. Ele pode fazer seus dois ataques corpo a corpo ou à distância."
            },
            {
                nome: "UMA AÇÃO INJUSTA",
                descricao: "Uma vez por rodada, o comandante mercenário pode atacar com sua machete ou metralhadora."
            }
        ],
        habilidades: [
            {
                nome: "SADISMO",
                descricao: "Se causar dano em um inimigo, o comandante mercenário recebe vantagem em testes de ataque e, se acertar um ataque, causa mais um dado de dano do mesmo."
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
    //Fazendeiro Isolado
    {
        id: "fazendeiro",
        nome: "Fazendeiro Isolado",
        vd: 10,
        categoria: "lacaio",
        elemento: "nenhum",
        tipo: "Pessoa",
        tamanho: "Médio",
        descricao: "A vida em uma fazenda não é fácil. Muitas vezes distantes de outras famílias ou da cidade mais próxima, as pessoas do campo aprendem a resolver as coisas com as próprias mãos. Alguns se tornam naturalmente desconfiados de estranhos e desconhecidos, pois sabem que nem sempre podem contar com ajuda nas redondezas. Acostumados a contar apenas consigo e com sua família, se tornam estranhos e pouco receptivos.",
        pv: 16,
        defesa: 6,
        deslocamento: "9m - 6q",
        testesResistencia: { fortitude: 3, reflexos: 3, vontade: 0 },
        sentidos: { iniciativa: 3, percepcao: 1},
        pericias: [
            {nome: "Manufatura (fazendeiro)", bonus:2}
        ],
        atributos: {forca: 1,
            destreza: 1,
            constituicao: 0,
            poder: 0,
            inteligencia: 0,
            sabedoria: 1,
            carisma: 0
        },
        acoes: [
            {
                nome: "PADRÃO - Pancada",
                bonus: 5,
                dano: "1d3+1",
                descricao: "Dano de Impacto"
            },
            {
                nome: "PADRÃO - Peixeira",
                bonus: 5,
                dano: "1d8+1",
                descricao: "Dano de Corte"
            },
            {
                nome: "PADRÃO - Espingarda",
                bonus: 5,
                dano: "4d6",
                descricao: "Distância Curta, dano Balístico"
            },
            {
                nome: "MOVIMENTO - Atiçar os Cães",
                dano: "1d8",
                descricao: "O fazendeiro comanda seus cães de guarda para avançar sobre um alvo em alcance curto. Os animais investem com ferocidade, cercando o alvo e esperando a melhor oportunidade para atacar. O próximo ataque que o fazendeiro acertar causa +1d8 pontos de dano de Perfuração e deixa o alvo caído (Luta DT 8 evita a condição)."
            }
        ],
        habilidades: [
            {
                nome:"DE SOL A SOL",
                descricao: "O fazendeiro isolado não fica inconsciente por ter seus PV reduzidos a 0."
            },
            {
                nome:"HISTÓRIAS DE PESCADOR",
                descricao: "Sendo uma fonte infinita de causos e histórias da região onde vive, o fazendeiro pode ajudar os personagens, se estiver disposto. Se os personagens compartilharem sua investigação com o fazendeiro, ele pode, a critério do mestre, fazer um teste de revisar o caso usando Manufatura (fazendeiro). Se passar, fornece uma pista para o caso usando sua vivência no mato ou histórias de antepassados para explicá-la."
            },
            {
                nome:"RESISILIÊNCIA DO CAMPO",
                descricao: "Acostumado a resolver os perrengues do dia a dia com as próprias mãos e com a paciência exigida pela natureza, o fazendeiro pode usar Manufatura (fazendeiro) no lugar de perícias baseadas em Força ou Sabedoria."
            }
        ]
    },
    //Minotauro
    {
        id: "minotauro",
        nome: "Minotauro",
        vd: 280,
        categoria: "desafio",
        elemento: "realidade",
        elementosComplementares: "espaco",
        tipo: "Anomalia",
        tamanho: "Grande",
        presencaCaotica: {dt: 14, danoMental: "9d6", nexIgnorar: 80},
        descricao: "A forma de um animal enorme, furioso e bípede com mais de três metros, infectado com pústulas nojentas de Realidade e veias pulsantes por um lado inteiro de seu corpo, o Minotauro é originada das lendas da mitologia grega sobre um monstro terrível que habita labirintos.",
        pv: 750,
        defesa: 19,
        deslocamento: "12m - 8q",
        resistencias: "Físico 10 e Realidade 20",
        vulnerabilidades: "Espaço",
        testesResistencia: { fortitude: 13, reflexos: 9, vontade: 5 },
        sentidos: { iniciativa: 5, percepcao: 2},
        pericias: [
            {nome: "Atletismo", bonus:12}
        ],
        atributos: {forca: 6,
            destreza: 4,
            constituicao: 6,
            poder: 3,
            inteligencia: -2,
            sabedoria: 0,
            carisma: 0
        },
        acoes: [
            {
                nome: "PADRÃO - Chifres X3",
                bonus: 19,
                dano: "4d6+25",
                descricao: "Dano Perfurante"
            },
            {
                nome: "PADRÃO - Machado X2",
                bonus: 19,
                dano: "4d12+30",
                descricao: "Dano de Corte"
            },
            {
                nome: "LIVRE - Cravar Chifres",
                dano: "2d10+10",
                descricao: "Se fizer uma investida com seus chifres em um alvo e acertar o ataque, o Minotauro crava seus chifres no alvo, que fica agarrado. Enquanto mantem um ser agarrado dessa forma, o Minotauro não pode atacar com seus chifres. Porém, no final de cada turno da vítima na qual ela ainda esteja agarrada pelos chifres, elas 2d10 + 10 pontos de dano de Realidade."
            },
            {
                nome: "MOVIMENTO - Amaldiçoar Machado",
                bonus: 21,
                dano: "3d6",
                descricao: "O Minotauro cospe parte de seu sangue em seu machado, adicionando +3d6 de dano de Realidade e +2 em testes de ataque até o fim da cena."
            },
            {
                nome: "MOVIMENTO - Poça de Sangue",
                descricao: "Uma vez por cena, o Minotauro cria uma poça de sangue misturada com fragmentos de Gemma em algum espaço adjacente e então, atravessa por ele. Ele então, é teletransportado para algum ponto em alcance Longo."
            },
            {
                nome: "PADRÃO - ",
                bonus: 5,
                dano: "",
                descricao: ""
            },
            {
                nome: "PADRÃO - ",
                bonus: 5,
                dano: "",
                descricao: ""
            }
        ],
        habilidades: [
            {
                nome:"ESCAPAR DA DESTRUIÇÃO",
                descricao: "A resistência do Enganchado faz com que ele aguente mais golpes do que qualquer outra pessoa. Três vezes por dia, ele pode escolher elevar o resultado de um teste de resistência em um nível."
            },
            {
                nome:"SANGUE FORTALECEDOR",
                descricao: "O Minotauro está sempre se regenerando. Ele possui Cura Acelerada 15"
            }
        ]
    },
    //Policial
    {
        id: "policial",
        nome: "Policial",
        vd: 20,
        categoria: "comum",
        elemento: "nenhum",
        tipo: "Pessoa",
        tamanho: "Médio",
        descricao: "O policial padrão, encontrado patrulhando as ruas e praças da maioria das cidades. Provavelmente nunca teve um encontro com o paranormal, e vai considerar qualquer menção a monstros e magias uma brincadeira de mau gosto – ou mesmo uma desculpa para esconder algum crime. Esta ficha também pode ser usada para vigias, seguranças corporativos e pessoas com algum treinamento com armas em geral.",
        pv: 20,
        defesa: 7,
        deslocamento: "9m - 6q",
        testesResistencia: { fortitude: 2, reflexos: 3, vontade: 0 },
        sentidos: { iniciativa: 5, percepcao: 1},
        pericias: [
            {nome: "Intimidação", bonus:2},
            {nome: "Tática", bonus:2}
        ],
        atributos: {
            forca: 1,
            destreza: 2,
            constituicao: 1,
            poder: 0,
            inteligencia: 0,
            sabedoria: 0,
            carisma: 0
        },
        acoes: [
            {
                nome: "PADRÃO - Bastão",
                bonus: 5,
                dano: "1d6+2",
                descricao: "Dano de Impacto"
            },
            {
                nome: "PADRÃO - Pistola",
                bonus: 5,
                dano: "1d12+2",
                descricao: "Distância Curta, dano Balístico"
            }
        ],
        habilidades: [
            {
                nome:"AUTORIDADE SUPERIOR",
                descricao: "Os policiais tendem a se impor em meio a situações perigosas. Uma vez por cena, o policial pode passar em um teste de Vontade ou Intimidação a escolha dele."
            }
        ]
    },
    //Policial de Elite
    {
        id: "policialelite",
        nome: "Policial de Elite",
        vd: 60,
        categoria: "comum",
        elemento: "nenhum",
        tipo: "Pessoa",
        tamanho: "Médio",
        descricao: "Treinados e equipados para enfrentar situações extremas, os policiais de uma tropa de elite provavelmente serão os primeiros a aparecer quando uma investigação discreta se transformar em um confronto armado.",
        pv: 45,
        defesa: 12,
        deslocamento: "9m - 6q",
        testesResistencia: { fortitude: 4, reflexos: 4, vontade: 2 },
        sentidos: { iniciativa: 5, percepcao: 1},
        pericias: [
            {nome: "Intimidação", bonus:5},
            {nome: "Tática", bonus:5}
        ],
        atributos: {
            forca: 3,
            destreza: 3,
            constituicao: 1,
            poder: 0,
            inteligencia: 2,
            sabedoria: 0,
            carisma: 0
        },
        acoes: [
            {
                nome: "PADRÃO - Bastão X2",
                bonus: 7,
                dano: "2d8+2",
                descricao: "Dano de Impacto"
            },
            {
                nome: "PADRÃO - Fuzil X2",
                bonus: 7,
                dano: "2d10+2",
                descricao: "Distância Média, dano Balístico"
            },
            {
                nome: "PADRÃO - Empurrar e Atirar",
                bonus: 7,
                dano: "4d10+2",
                descricao: "O policial de elite empurra um personagem adjacente para 3m longe de si (Luta DT 12 evita) e em seguida atira com seu fuzil de assalto a curta distância. Se tiver conseguido empurrar o personagem, o policial de elite recebe vantagem no teste de ataque e, se acertar, +2d10 na rolagem de dano."
            },
            {
                nome: "PADRÃO - Lança-Granadas",
                dano: "8d6",
                descricao: "Uma vez por cena, o policial de elite dispara uma granada explosiva em alcance médio. Cada ser a 6m do ponto de impacto sofre 8d6 pontos de dano de impacto (Reflexos DT 8 reduz à metade)."
            }
        ],
        habilidades: [
            {
                nome:"FORTIFICAÇÃO",
                descricao: "Graças ao seu equipamento, o policial de elite tem 50% de chance de ignorar o dano adicional de um acerto crítico ou ataque furtivo." 
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
    //Soldade de aluguel
    {
        id: "soldado de aluguel",
        nome: "Soldado de Aluguel",
        vd: 60,
        categoria: "lacaio",
        elemento: "nenhum",
        tipo: "Pessoa",
        tamanho: "Médio",
        descricao: "Um combatente profissional, que trabalha para quem pagar mais. ",
        pv: 45,
        defesa: 11,
        deslocamento: "9m - 6q",
        resistencias: "Balístico, Corte e Impacto 5",
        testesResistencia: { fortitude: 4, reflexos: 5, vontade: 0 },
        sentidos: { iniciativa: 5, percepcao: 2},
        pericias: [
            {nome: "Furtividade", bonus:6},
            {nome: "Intimidação", bonus:4},
            {nome: "Prestidigitação", bonus:6}
        ],
        atributos: {
            forca: 3,
            destreza: 3,
            constituicao: 2,
            poder: 1,
            inteligencia: 0,
            sabedoria: 0,
            carisma: 0
        },
        acoes: [
            {
                nome: "PADRÃO - Machete",
                bonus: 6,
                dano: "2d6+5",
                descricao: "Dano de Corte."
            },
            {
                nome: "PADRÃO - Fuzil de Assalto",
                bonus: 6,
                dano: "2d8+5",
                descricao: "Distância Média, dano Balístico."
            },
            {
                nome: "COMPLETA - Disparada em Investida",
                bonus: 6,
                dano: "2d8+5",
                descricao: "O soldado de aluguel pode se mover em algum lugar dentro de seu deslocamento e realizar dois ataques em um ser esteja adjacente no lugar que chegou. Se acertar ambos os ataques, faz com que o alvo fique fraco até o final de seu próximo turno (Fortitude DT 10 evita)."
            }
        ]
    },
    //Template
    {
        id: "",
        nome: "",
        vd: 20,
        categoria: "",
        elemento: "",
        tipo: "",
        tamanho: "",
        descricao: "",
        pv: 20,
        defesa: 9,
        deslocamento: "9m - 6q",
        resistencias: "",
        testesResistencia: { fortitude: 4, reflexos: 5, vontade: -1 },
        sentidos: { iniciativa: 5, percepcao: 1},
        pericias: [
            {nome: "Furtividade", bonus:5},
            {nome: "Intimidação", bonus:2},
            {nome: "Prestidigitação", bonus:5}
        ],
        atributos: {forca: 2,
            destreza: 2,
            constituicao: 1,
            poder: 0,
            inteligencia: -1,
            sabedoria: -1,
            carisma: 0
        },
        acoes: [
            {
                nome: "PADRÃO - ",
                bonus: 5,
                dano: "",
                descricao: ""
            },
            {
                nome: "PADRÃO - ",
                bonus: 5,
                dano: "",
                descricao: ""
            },
            {
                nome: "PADRÃO - ",
                bonus: 5,
                dano: "",
                descricao: ""
            },
            {
                nome: "PADRÃO - ",
                bonus: 5,
                dano: "",
                descricao: ""
            }
        ],
        habilidades: [
            {
                nome:"",
                descricao: ""
            },
            {
                nome:"",
                descricao: ""
            },
            {
                nome:"",
                descricao: ""
            },
            {
                nome:"",
                descricao: ""
            },
        ]
    },
];
