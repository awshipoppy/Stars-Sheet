// =========================================
// HABILIDADES-PODERES-DATA.JS — banco de dados
// =========================================
//
// Banco centralizado de Habilidades e Poderes do Stars RPG. A ficha do
// personagem (ficha.js) só CONSULTA este arquivo — nunca copia os dados
// pra dentro da ficha. O que a ficha guarda de cada item adicionado é só
// uma referência (o "id") mais uma anotação pessoal opcional; os dados
// oficiais (nome, descrição, custo, requisitos...) sempre vêm daqui.
//
// *** IMPORTANTE ***
// Os itens abaixo marcados com "isExample: true" são placeholders de
// teste para validar a estrutura — NÃO são conteúdo oficial do Stars
// RPG. Substitua/complete pelo texto real das regras quando disponível;
// a interface já mostra um aviso "EXEMPLO" nesses itens pra não
// confundir ninguém.
//
// Para cadastrar um item de verdade, copie o formato de um exemplo,
// preencha com o texto oficial e REMOVA "isExample: true".

// Categorias de Habilidade. Adicionar uma nova categoria no futuro
// (uma subclasse nova, um suplemento etc.) é só acrescentar uma entrada
// aqui — o filtro e a listagem já se adaptam sozinhos.
const HABILIDADE_CATEGORIAS = {
    duelista: "Duelista",
    especialista: "Especialista",
    individualista: "Individualista",
    geral: "Geral"
};

// Tipos de efeito suportados pelo banco. Poder ser estendido depois
// (rituais, condições, itens...) sem quebrar o que já existe.
const EFEITO_TIPOS = {
    habilidade: "Habilidade",
    subclasse: "Subclasse",
    poder: "Poder Elemental"
};

const HABILIDADES_DB = [
    {
        id: "geral_foco_total",
        nome: "Foco Total (exemplo)",
        tipo: "habilidade",
        categoria: "geral",
        descricao: "Placeholder de teste — a criatura ou personagem concentra toda sua atenção em uma única ação, ganhando vantagem no próximo teste realizado.",
        requisitos: "—",
        custo: "1 PP",
        isExample: true
    },

    // #region Habilidades de Duelista
    {
        id: "duelista_poder_de_ataque",
        nome: "Poder de Ataque",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Quando faz um ataque, você pode gastar 2 PP para receber +4 no teste de ataque ou receber +2 dados de dano na rolagem. Conforme avança de nível, você pode gastar +1 PP para receber mais bônus de +2 ou +1d (veja na Tabela: Duelista). Por exemplo, em 55%, você pode gastar 4 PP para receber +2 no teste de ataque e +3d na rolagem de dano.",
        custo: "2 PP",
        isExample: false
    },
    {
        id: "duelista_alcance_abrangente",
        nome: "Alcance Abrangente",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: " As armas de arremesso, disparo e fogo que você empunha, aumentam em um passo em de alcance. Adicionalmente, quando realiza um ataque à distância, você recebe +1 em seu teste de ataque e +3 em sua rolagem de dano.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },
    {
        id: "duelista_apara_projétil",
        nome: "Aparar Projétil",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Sua velocidade é impressionante, sendo capaz de desviar ou até anular projeteis. Quando receber um ataque a distância, você pode gastar 1 PP e uma Reação Livre para tentar aparar o projétil, diminuindo o dano em 2d6 + Destreza. Em 35%, você passa a diminuir o dano do golpe em 4d6 + Destreza e em 70% passa a diminuir em 6d6 + Destreza,",
        requisitos: "-",
        custo: "-",
        isExample: false
    },
    {
    id: "apego_angustiado",
    nome: "Apego Angustiado",
    tipo: "habilidade",
    categoria: "duelista",
    descricao: "Não importa o quão profundo seja os seus ferimentos, você se mantém consciente perante a dor. Você não fica inconsciente por estar morrendo, porém a cada rodada assim, perde 2 de SAN.",
    requisitos: "-",
    custo: "-",
    isExample: false
    },
    {
        id: "armadura_de_pele",
        nome: "Armadura de Pele",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "O inimigo bate em você e ele que se machuca. Toda vez que um ser te atinge com um ataque corpo-a-corpo ele perde PV equivalentes ao seu modificador de Constituição. Além disso, se o ataque tiver sido de uma arma, você pode gastar 1 PP para fazer com que ela perca PV igual a sua Constituição adicionalmente. Esta habilidade pode ser pega uma segunda vez para duplicar a perda de PV em ambos os casos.",
        requisitos: "40%",
        custo: "-",
        isExample: false
    },

    {
        id: "arma_favorita",
        nome: "Arma Favorita",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você tem a sua arma preferida, aquela que você sempre escolhe nos momentos de perigo e que nunca sai do seu lado. Escolha uma arma em específico, ela tem seu Custo reduzido em 10, incluindo em modificações, então, por exemplo, se a arma custava 5, você colocou uma modificação de 5, ela não custa nada dentro do seu limite de custo.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "armas_especiais",
        nome: "Armas Especiais",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você recebe proficiência com armas especiais.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "arma_volumosa",
        nome: "Arma Volumosa",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você e sua arma são parceiros de longa data, formando um par perfeito. Você recebe +1 em testes de ataque e +4 em rolagens de dano com sua arma favorita. Além disso, você pode colocar uma modificação sem constar em seus limites de modificação e a redução de Custo de Arma Favorita passa a ser 20 ao invés de 10.",
        requisitos: "Arma Favorita",
        custo: "-",
        isExample: false
    },

    {
        id: "ataque_de_oportunidade_aprimorado",
        nome: "Ataque de Oportunidade Aprimorado",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Quando realiza um Ataque de Oportunidade, pode gastar 1 PP para realizar como uma Reação Livre ao invés de gastar sua Reação. Adicionalmente, quando acerta um Ataque de Oportunidade, você pode gastar 2 PP para reduzir o Deslocamento do alvo a 0m.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "ataque_volatil",
        nome: "Ataque Volátil",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você pode gastar 1 PP ao realizar um ataque com uma arma corpo a corpo de duas mãos. Fazendo isso, você soma o dobro da sua Força na rolagem de dano (se já duplicava, triplica) e a arma tem +1 na sua margem de ameaça. Se o ataque for um acerto crítico, você ignora RD do alvo igual a sua Força.",
        requisitos: "-",
        custo: "1 PP",
        isExample: false
    },

    {
        id: "ataque_lancinante",
        nome: "Ataque Lancinante",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Quando realiza um ataque, pode gastar 2 PP para ativar essa habilidade. A cada 2 PP gasto no ataque, recebe +5 na rolagem de dano (se gastou 8 PP no ataque, recebe +20 de dano). Ativar a habilidade para o bônus adicional de +5 na rolagem de dano. Você pode pegar esta habilidade uma segunda vez para que, quando ativá-la, durante o ataque, seu limite de PP aumente em +4.",
        requisitos: "-",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "brutamonte",
        nome: "Brutamonte",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Quando for fazer um teste de manobra, pode gastar 2 PP para rolar o teste com vantagem.",
        requisitos: "-",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "caminho_para_forca",
        nome: "Caminho para Força",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Se for alguém do seu grupo, que seja você. Quando usa a ação sacrifício em uma cena de perseguição, você pode gastar 1 PP para fornecer mais uma vantagem (para um total de duas vantagens) nos testes dos outros personagens e, quando usa a ação chamar atenção em uma cena de furtividade, você pode gastar 1 PP para diminuir a visibilidade de todos os seus aliados em -2 (em vez de -1).",
        requisitos: "-",
        custo: "1 PP",
        isExample: false
    },

    {
        id: "ciente_das_cicatrizes",
        nome: "Ciente das Cicatrizes",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você já está acostumado a manusear armas e sabe dos estragos que elas podem causar. Quando faz algum teste relacionado a ferimentos ou marcas de batalha, como encontrar alguma pista em uma cena de investigação ou tentar tratar algum ferimento causado por uma arma que conhece, pode trocar o teste de Investigação ou Medicina por Luta ou Pontaria.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "combate_defensivo",
        nome: "Combate Defensivo",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Quando usa a ação atacar, você pode combater defensivamente. Se fizer isso, até seu próximo turno, você recebe desvantagem em todos os testes de ataque, mas recebe +3 na Defesa. A penalidade se aplica ao ataque que realizou para ativar este efeito.",
        requisitos: "Int 2",
        custo: "-",
        isExample: false
    },

    {
        id: "combate_desarmado",
        nome: "Combate Desarmado",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Quando realizar um ataque desarmado, você ataca com +2 no teste de ataque e recebe +2 na rolagem de dano.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "criativamente_brutal",
        nome: "Criativamente Brutal",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Uma vez por rodada, você pode gastar 1 PP para fazer uma ação de investigação adicional, porém o atributo base dela tem que ser Força ou Destreza.",
        requisitos: "-",
        custo: "1 PP",
        isExample: false
    },

    {
        id: "da_que_eu_te_dou_outro",
        nome: "Dá Que Eu Te Dou Outro",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Quando é atingido por um ataque e reduza pelo menos metade do dano que ele causou, você pode gastar 2 PP e fazer com que o alvo receba o dano completo que causou.",
        requisitos: "-",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "duelo",
        nome: "Duelo",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Uma vez por cena, você pode como uma ação livre provocar um alvo e inicia um duelo com ele, os dois recebem +1 em testes de ataque e rolagens de dano um contra o outro, mas recebem -1 em testes de ataque contra qualquer outra criatura na cena e dura até que um dos dois seja reduzido a 0 PV.",
        requisitos: "Treinado em Intimidação",
        custo: "-",
        isExample: false
    },

    {
        id: "espirito_de_luta",
        nome: "Espírito de Luta",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Sua alma clama pela batalha. No início de cada cena de combate ou perseguição, você recebe PV temporários ao limite de PP adicionado a sua Força ou Destreza.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "forca_de_vontade",
        nome: "Força de Vontade",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Mesmo não sendo o mais sábio, consegue superar seus inimigos pela sua força de vontade. Quando realiza um teste de Vontade, você pode gastar 1 PP adiciona a sua Destreza ou Força no resultado.",
        requisitos: "-",
        custo: "1 PP",
        isExample: false
    },

    {
        id: "fraturar",
        nome: "Fraturar",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Quando acerta um crítico com um ataque corpo a corpo, pode tentar quebrar o osso. Se gastar 2 PP, aumenta em dois passos o dano da arma e deixa o alvo Abalado e Lento por uma quantidade de rodadas igual a sua Força.",
        requisitos: "-",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "golpe_demolidor",
        nome: "Golpe Demolidor",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Quando realizar uma manobra para quebrar algum objeto, você pode gastar 1 PP para adicionar mais dois dados de dano do mesmo tipo do ataque na rolagem.",
        requisitos: "-",
        custo: "1 PP",
        isExample: false
    },

    {
        id: "golpe_de_raspao",
        nome: "Golpe de Raspão",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Ao errar um ataque contra um alvo, pode gastar 3 PP para mesmo assim causar metade do dano. Por mais que o ataque tenha sido um crítico, você causará apenas metade do dano de um ataque normal. É possível pegar esta habilidade uma segunda vez para que o dano seja completo, ao invés de apenas metade.",
        requisitos: "-",
        custo: "3 PP",
        isExample: false
    },

    {
        id: "golpe_imparavel",
        nome: "Golpe Imparável",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Quando usa Poder de Ataque, pode gastar +2 PP para ignorar qualquer resistência de dano do alvo.",
        requisitos: "50%",
        custo: "+2 PP",
        isExample: false
    },

    {
        id: "golpe_preciso_e_pesado",
        nome: "Golpe Preciso e Pesado",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Enquanto estiver empunhando uma arma corpo a corpo, o dano dela aumenta em mais um dado do mesmo tipo.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "gostoso",
        nome: "Gostoso",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você tem um corpo escultural. Você pode gastar 2 PP para substituir um teste de Carisma por Força ou Destreza.",
        requisitos: "-",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "grandao",
        nome: "Grandão",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você é considerado uma categoria maior de tamanho para Furtividade e testes de manobra. Isto também faz com que todos os seus ataques corpo a corpo recebam +5 na rolagem de dano.",
        requisitos: "For 3 e Con 3",
        custo: "-",
        isExample: false
    },

    {
        id: "grudar_o_cano",
        nome: "Grudar o Cano",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Quando realiza um ataque a distância contra um alvo em alcance adjacente, você adiciona sua Destreza na rolagem de dano, aumenta o dano da sua arma em um passo e adiciona mais um dado de dano do mesmo tipo na rolagem.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "instinto_de_fuga",
        nome: "Instinto de Fuga",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você tem um bom pressentimento da hora de fuga, já que sabe que nem todas as batalhas podem ser vencidas. Quando uma perseguição ou similar se inicia, você recebe +2 em todos os testes de perícia que fizer até o fim da cena.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "lideranca_motivadora",
        nome: "Liderança Motivadora",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Suas palavras animam as pessoas ao seu redor a darem seu melhor. No início de toda cena, você pode gastar uma ação de movimento fazendo um breve discurso motivacional ou puxando um grito de guerra, você e seus aliados em alcance médio recebem seu valor de Poder ou Inteligência em PP temporários.",
        requisitos: "General",
        custo: "-",
        isExample: false
    },

    {
        id: "lutador_marcial",
        nome: "Lutador Marcial",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você recebe +1 em testes de manobra e uma vez por rodada quando estiver agarrando um ser, pode gastar 1 PP para fazer uma manobra como uma ação livre contra ela.",
        requisitos: "-",
        custo: "1 PP",
        isExample: false
    },

    {
        id: "marca_da_morte",
        nome: "Marca da Morte",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Caso realize um ataque contra um alvo que está com a Marca, você aumenta o dano de sua arma em um passo.",
        requisitos: "Marca da Caça",
        custo: "-",
        isExample: false
    },

    {
        id: "paranoia_defensiva",
        nome: "Paranoia Defensiva",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você sabe que eles estão lá fora, esperando para avançar a qualquer momento. Você recebe +2 em Iniciativa e no início de cada cena, você pode gastar uma ação Padrão e 2 PP, anunciando a todos que algo pode acontecer. Se fizer isso, cada personagem presente (isso inclui você), escolhe entre receber +2 de Defesa contra o primeiro ataque que sofrer na cena ou receber +2 em um único teste de perícia até o fim da cena.",
        requisitos: "-",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "preparado_para_o_ataque",
        nome: "Preparado para o Ataque",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Quando for sofrer um ataque e estiver sem Reações, você pode gastar 2 PP para realizar uma reação contra este ataque.",
        requisitos: "30%",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "projeteis_de_luz",
        nome: "Projéteis de Luz",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você é capaz de flanquear mesmo que esteja utilizando uma arma a distância.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "quebra_tudo",
        nome: "Quebra Tudo",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Caso você acerte um golpe desarmado, você pode gastar 2 PP para fazer uma manobra de combate como ação livre, com um bônus de +5 no teste.",
        requisitos: "Porradeiro",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "rajada_de_disparos",
        nome: "Rajada de Disparos",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você pode gastar 3 PP e uma ação completa para fazer 3 ataques com uma arma de disparo que não seja de fogo. Você coloca três projéteis na arma ao mesmo tempo, perdendo precisão, mas ganhando dano, ao fazer isso, você ataca com -3 em todos os três ataques.",
        requisitos: "30%",
        custo: "3 PP",
        isExample: false
    },

    {
        id: "recuperar_folego",
        nome: "Recuperar Fôlego",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você consegue recuperar as suas energias. Uma vez por cena, você pode gastar 2 PP para recuperar pontos de vida um valor igual a 1d10 + seu limite de PP como uma ação livre.",
        requisitos: "-",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "reflexos_defensivos",
        nome: "Reflexos Defensivos",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você recebe +1 em Defesa e em Reflexos.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "reflexos_evasivos",
        nome: "Reflexos Evasivos",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você sabe como continuar dentro de uma luta. Você recebe RD a dano Ambiental e Físico igual a seu treinamento de Reflexos.",
        requisitos: "Des 3 e Treinado em Reflexos",
        custo: "-",
        isExample: false
    },

    {
        id: "reflexos_perfeitos",
        nome: "Reflexos Perfeitos",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você nunca fica parado dentro de uma briga, sempre conseguindo esquivar, mesmo que minimamente. Ao invés do padrão, você recebe RD igual ao dobro de seu treinamento em Reflexos. Adicionalmente, quando esquiva de um ataque, pode gastar 2 PP para dobrar o seu treinamento em Reflexos para essa esquiva.",
        requisitos: "Reflexos Evasivos e Versado em Reflexos",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "sacrificar_os_joelhos",
        nome: "Sacrificar os Joelhos",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Diante de algo que não pode ser superado, você supera seus próprios limites de fuga. Uma vez por cena de perseguição, quando faz a ação esforço extra, você pode gastar 2 PP para receber duas vantagens no teste (ao invés de uma) e se passar, recebe dois sucessos. Além disso, quando sofre dano de queda, pode gastar 2 PP reduzir o dano à metade. Por fim, pode gastar 2 PP quando realiza uma Investida para receber duas vantagens no teste (ao invés de apenas uma) e +2 em sua margem de ameaça.",
        requisitos: "Treinado em Atletismo",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "sem_tempo_irmao",
        nome: "Sem Tempo, Irmão",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você sabe que pistas são importantes, mas com o paranormal podendo surgir a qualquer momento, cada segundo conta. Uma vez por cena de investigação, quando usa facilitar investigação, você pode prestar ajuda de forma apressada e descuidada. Você passa automaticamente no teste para auxiliar seus aliados, fornecendo +3 no teste, mas faz uma rolagem adicional na tabela de eventos de investigação.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "segurar_o_gatilho",
        nome: "Segurar o Gatilho",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Ao acertar um ataque com uma arma de fogo, você pode fazer outro contra o mesmo alvo, pagando uma quantidade de PP igual à quantidade de ataques que você já realizou no turno. Ou seja, pode fazer o primeiro ataque extra gastando 1 PP e, se acertar, pode fazer um segundo ataque extra gastando mais 2 PP e assim por diante, até atingir seu limite de PP por turno ou atingir o máximo de ataques com a arma antes de precisar carregá-la.",
        requisitos: "50%",
        custo: "Variável",
        isExample: false
    },

    {
        id: "selvageria",
        nome: "Selvageria",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "A batalha já faz parte de seu ser. Você recebe +1 em Fortitude e +1 em rolagens de dano. Em 35%, ambos os bônus aumentam para +2 e em 70% para +3.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "tanque_de_guerra",
        nome: "Tanque de Guerra",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você se torna uma parede inabalável, quando usa uma armadura pesada, você aumenta o bônus de Defesa dela em +1 e recebe +2 em resistência de danos não elementais.",
        requisitos: "30%",
        custo: "-",
        isExample: false
    },

    {
        id: "taticamente_defensivo",
        nome: "Taticamente Defensivo",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você aprendeu a como se defender e se proteger de ataques os prevendo. Você recebe RD a dano Físico igual a sua Inteligência. Adicionalmente, pode trocar o seu modificador de Destreza por Inteligência na sua Defesa.",
        requisitos: "Taticamente Ofensivo",
        custo: "-",
        isExample: false
    },

    {
        id: "tiro_certeiro",
        nome: "Tiro Certeiro",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Se estiver usando uma arma de disparo ou fogo, você soma sua Destreza nas rolagens de dano e ignora a penalidade contra alvos envolvidos em combate corpo a corpo (sem usar a ação de mirar).",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "tudo_que_vai_volta",
        nome: "Tudo Que Vai, Volta",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Sempre que um aliado sofrer um ataque corpo-a-corpo, você pode gastar 2 PP para fazer um ataque no inimigo que o atacou como uma reação.",
        requisitos: "20%",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "valentao",
        nome: "Valentão",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "O seu treinamento árduo lhe ensinou que a brutalidade pode ser amedrontadora, e agora esse é seu principal idioma. Você pode adicionar Força ao invés de Carisma em seus testes de Intimidação. Adicionalmente, no início de cada cena, pode gastar 1 PP para fazer um teste de Intimidação para assustar como uma ação livre.",
        requisitos: "-",
        custo: "1 PP",
        isExample: false
    },

    {
        id: "vitalidade_aprimorada",
        nome: "Vitalidade Aprimorada",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "No início de uma cena de Descanso, você recupera PV e PP igual a sua Constituição. Você pode pegar esta habilidade uma segunda vez para que o bônus seja duplicado.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "vitalidade_perfeita",
        nome: "Vitalidade Perfeita",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você já levou porradas extremamente dolorosas, por isso, consegue aguentar baque. Você recebe +5 para resistir cair em morrendo quando sofre uma lesão grave. Além disso, quando resistir a uma lesão grave ou sair de Morrendo, você recebe +1 em Força e Destreza e PV temporários igual ao seu limite de PP.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },
    {
        id: "preco_de_bala",
        nome: "A Preço de Bala",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Sendo um duelista, você já sabe os melhores lugares para indicar a compra de seus produtos, principalmente as suas preciosas munições. Todas as munições têm seu Custo reduzidos pela metade para você. Adicionalmente, escolha um tipo de munição. Armas que as usam, recebem bônus de dano adicional igual ao Custo da munição que escolheu.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },
    {
        id: "duelista_acostumado_com_o_paranormal",
        nome: "Acostumado com o Paranormal",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Você já viu muitas anomalias nesta vida e querendo ou não, você não pode se deixar abalar na presença delas. Você recebe RD Mental igual ao seu bônus de treinamento em Fortitude.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },
    {
        id: "duelista_bloqueio_constante",
        nome: "Bloqueio Constante",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "Ao bloquear tantos golpes, você desenvolveu um instinto próprio que sempre usa seu próprio corpo para diminuir a letalidade de ataques. Você recebe RD a danos balísticos, de corte, de impacto e perfurante igual a sua Força. ",
        requisitos: "experiente em Fortitude",
        custo: "-",
        isExample: false
    },
    {
        id: "duelista_critico_brutal",
        nome: "Crítico Brutal",
        tipo: "habilidade",
        categoria: "duelista",
        descricao: "A brutalidade de seus golpes mais ferozes fez com que você ficasse vivo até aqui. Você adiciona metade do seu valor de Força em dados bônus quando realiza um golpe crítico com armas corpo a corpo. Por exemplo, caso tenha 5 de Força, você recebe +2d quando realiza um crítico. ",
        requisitos: "30%",
        custo: "-",
        isExample: false
    },
    // #endregion
    // #region Subclasses de Duelista
    {
    id: "marca_do_cacador",
    nome: "15% - Marca do Caçador",
    tipo: "subclasse",
    categoria: "duelista",
    descricao: "Na sua própria mente, um alvo não é nada mais que um animal para ser abatido. Você pode gastar uma ação livre e 2 PP para selecionar um alvo em alcance médio. Você recebe +1d8 de dano adicional em suas armas de arremesso, disparo e fogo em ataques contra este alvo. O dano adicional da Marca aumenta em mais um dado para cada outra habilidade que possuir desta subclasse. Você só pode ter um alvo com a marca de caçador.",
    requisitos: "-",
    custo: "2 PP",
    isExample: false
    },

    {
        id: "ponto_fraco",
        nome: "30% - Ponto Fraco",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Você aumenta sua margem de ameaça em 2 quando realiza um ataque em um ser que esteja com a marca de caçador. Além disso, quando realiza um acerto crítico em um alvo com a marca, o alvo recebe -1 em testes de atributos físicos até o fim de seu próximo turno.",
        requisitos: "Marca do Caçador",
        custo: "-",
        isExample: false
    },

    {
        id: "predador",
        nome: "45% - Predador",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Se você desferir um acerto crítico, com uma arma de fogo ou disparo, em qualquer criatura que esteja com a marca do caçador, você soma mais dois dados do mesmo tipo na rolagem de dano e adiciona sua Sabedoria na rolagem de dano na habilidade Marca do Caçador.",
        requisitos: "Ponto Fraco",
        custo: "-",
        isExample: false
    },

    {
        id: "presa_preferida",
        nome: "65% - Presa Preferida",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Você tem um ódio, ressentimento e mágoa de um elemento em específico. Escolha um elemento, contra anomalias e seres que têm este elemento como principal, os seus bônus de Marca do Caçador, Ponto Fraco e Predador são dobrados. Você pode gastar uma ação de Descanso para trocar o elemento.",
        requisitos: "Predador",
        custo: "-",
        isExample: false
    },

    {
        id: "mestre_cacador",
        nome: "99% - Mestre Caçador",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Você é o mestre da caça, tendo tanta experiência que cada tiro seu quando bem mirado é mortal. Quando você usa a ação mirar, você pode gastar 5 PP para que o dano da sua arma seja triplicado. Exemplo, se for 4d10, seria 12d10, se for 3d6 + 2d8, seria 9d6 + 2d8.",
        requisitos: "Presa Preferida",
        custo: "5 PP",
        isExample: false
    },

    {
        id: "taticamente_ofensivo",
        nome: "15% - Taticamente Ofensivo",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Treinado em diversos combates, você começou a perceber os padrões de seus inimigos. Você pode usar sua Inteligência em testes de ataque e rolagens de dano, ao invés de Força e Destreza. Adicionalmente, quando um aliado em alcance curto falhar em algum teste, pode gastar 2 PP para fazê-lo refazer o teste.",
        requisitos: "Treinado em Tática",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "inspirar_confianca",
        nome: "30% - Inspirar Confiança",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Só de estar ao seu lado, seus aliados se sentem revigorados para combate. Durante uma cena de ação, qualquer aliado adjacente a você recebe a sua Inteligência em suas rolagens de dano e testes de resistência. Adicionalmente, quando um aliado realizar um ataque contra um alvo, você pode gastar 2 PP e uma Reação para fazer com que esse aliado faça mais um ataque contra o mesmo alvo.",
        requisitos: "Taticamente Ofensivo",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "estrategista",
        nome: "45% - Estrategista",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Analisando o ambiente ao seu redor, você trata o campo de batalha com uma partida de xadrez. Durante uma cena de ação, pode gastar 1 PP por personagem em alcance curto para que até o final da próxima rodada, eles recebam uma reação adicional. Adicionalmente, quando você realiza um teste de perícia, pode gastar 2 PP para que seus aliados em um teste substituam um resultado deles para o seu resultado.",
        requisitos: "Inspirar Confiança",
        custo: "1 PP por personagem",
        isExample: false
    },

    {
        id: "general",
        nome: "65% - General",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Você se torna um general completo, motivando tanto você quanto seus aliados, por isso, adiciona sua Inteligência em sua Defesa e pode gastar uma ação livre e 3 PP para fornecer este bônus também para seus aliados adjacentes por uma rodada. Além disso, uma vez por rodada, quando um aliado realiza um ataque contra um alvo, você pode gastar 2 PP para que você ou outro aliado faça um ataque adicional contra o mesmo alvo. Por fim, o alcance de Taticamente Ofensivo aumenta para médio e o Inspirar Confiança para aliados em até 4,5m de você.",
        requisitos: "Estrategista",
        custo: "3 PP / 2 PP",
        isExample: false
    },

    {
        id: "marechal",
        nome: "99% - Marechal",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Você pode gastar uma ação padrão e 5 PP para que cada aliado que você possa ver em alcance médio receba uma ação Padrão adicional em seu próximo turno.",
        requisitos: "General",
        custo: "5 PP",
        isExample: false
    },

    {
        id: "bater_para_matar",
        nome: "15% - Bater para Matar",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Nos combates, você sabe que é você ou o inimigo, e você ainda não acabou a sua missão. Você recebe um aumento de +1 em sua margem de ameaça com ataques corpo a corpo. Esse bônus aumenta em +1 para cada duas outras habilidades desta subclasse que possuir.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "revidar",
        nome: "30% - Revidar",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Sempre que bloquear um ataque, você pode gastar 2 PP para realizar um ataque corpo a corpo no inimigo que o atacou.",
        requisitos: "Bater para Matar",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "adrenalina",
        nome: "45% - Adrenalina",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Ansioso e nervoso, porém animado e em êxtase, nada o deixa mais vigorado que ver um inimigo cair. Ao acertar um ataque crítico, você ganha 3 PP temporários. Você pode receber uma quantidade máxima de PP temporários em uma cena igual ao seu limite de PP.",
        requisitos: "Revidar",
        custo: "-",
        isExample: false
    },

    {
        id: "forca_opressora",
        nome: "65% - Força Opressora",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Quando acerta um golpe corpo a corpo, você pode gastar 1 PP para realizar uma manobra derrubar ou empurrar contra o alvo do ataque como ação livre. Se escolher empurrar, recebe um bônus de +2 para cada 10 pontos de dano que causou no alvo. Se escolher derrubar e vencer no teste oposto, você pode gastar 1 PP para fazer um ataque adicional contra o alvo caído, logo depois dele cair.",
        requisitos: "Adrenalina",
        custo: "1 PP",
        isExample: false
    },

    {
        id: "super_poder_de_ataque",
        nome: "99% - Super Poder de Ataque",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Quando você ataca, você não machuca, você destrói. Toda vez que utiliza Poder de Ataque, seus bônus são dobrados, por exemplo, se tivesse +4 no teste e +3d de dano, seria +8 no teste e +6d de dano.",
        requisitos: "Força Opressora",
        custo: "-",
        isExample: false
    },

    {
        id: "tecnica_secreta",
        nome: "15% - Técnica Secreta",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Realizar manobras para você não é nada mais que brincadeira de criança. Uma vez por turno, você pode gastar 2 PP para realizar uma manobra como ação livre. Adicionalmente, quando realiza um teste de manobra, você recebe +1 no teste. Esse bônus aumenta em +1 para cada outra habilidade desta subclasse que possuir.",
        requisitos: "-",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "tecnica_das_manobras",
        nome: "30% - Técnica das Manobras",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Quando é sucedido em um teste de manobra, pode gastar 1 PP para realizar um ataque como uma ação livre no mesmo alvo.",
        requisitos: "Técnica Secreta",
        custo: "1 PP",
        isExample: false
    },

    {
        id: "tecnica_sublime",
        nome: "45% - Técnica Sublime",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Quando faz um ataque, você pode gastar 2 PP para executar um dos efeitos a seguir como parte do ataque. Você pode adicionar mais efeitos gastando +2 PP por efeito adicional. AMPlO: O ataque pode atingir um alvo adicional em seu alcance e adjacente ao original, o mesmo teste é considerado para o outro alvo. PERFURANTE: Você ignora até 15 de resistência do alvo.",
        requisitos: "Técnica das Manobras",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "tecnica_excessiva",
        nome: "65% - Técnica Excessiva",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Você adiciona os seguintes efeitos à lista de Técnica Sublime: LETAL: Você aumenta a sua margem de ameaça em +1. Você pode gastar +2 PP para aumentar em +2. DESTRUIDOR: Você aumenta os dados de crítico em +3d. Você pode gastar +2 PP para aumentar em +6d.",
        requisitos: "Técnica Sublime",
        custo: "-",
        isExample: false
    },

    {
        id: "mestre_das_tecnicas",
        nome: "99% - Mestre das Técnicas",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Quando passa em um teste de manobra, você pode causar perda de PV no alvo igual ao resultado de seu teste. Por exemplo, se seu teste de manobra foi um resultado de 25, o alvo perde 25 PV. Além disso, o uso de Técnica Sublime reduz para 1 PP + 1 PP por efeito adicional.",
        requisitos: "Técnica Excessiva",
        custo: "-",
        isExample: false
    },

    {
        id: "porradeiro",
        nome: "15% - Porradeiro",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Seus ataques desarmados causam 1d6 pontos de dano de impacto, ao invés de 1d3, podem causar dano letal e se você não estiver usando nenhuma armadura, você recebe sua Constituição em sua Defesa. O dano aumenta em um passo para cada outra habilidade que possuir desta subclasse.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "lutador_marcial_subclasse",
        nome: "30% - Lutador Marcial",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Seus golpes são rápidos e precisos, sua margem de ameaça com ataques desarmados aumenta em 1. Adicionalmente, quando realiza um ataque desarmado, pode gastar 2 PP para realizar um ataque extra.",
        requisitos: "Porradeiro",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "persistencia",
        nome: "45% - Persistência",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Você bate até acertar, toda vez que erra um ataque contra um inimigo com um ataque desarmado, você recebe um bônus de +1 para seu próximo ataque desarmado que fizer, onde o bônus é cumulativo. Então se errar um primeiro golpe, você adiciona +1 em seu próximo teste de ataque desarmado, se errar este segundo golpe, recebe +2 em seu terceiro ataque, até acertar. Adicionalmente, se acertar um golpe crítico enquanto este efeito estiver ativo, você recebe uma quantidade de dados adicionais de dano igual ao bônus acumulado. Continuando o exemplo anterior, se acertou seu terceiro ataque e realizou um acerto crítico, recebe +2d em sua rolagem de dano.",
        requisitos: "Lutador Marcial",
        custo: "-",
        isExample: false
    },

    {
        id: "luta_suja",
        nome: "65% - Luta Suja",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Qualquer coisa é justificada em uma luta. Ao fazer um ataque corpo a corpo desarmado, você pode gastar 2 PP para usar um dos efeitos sujos abaixo. Os efeitos só funcionam caso acerte os ataques. Cabeçada: Você dá um golpe inesperado, batendo com a testa na testa de seu inimigo, o que o deixa desnorteado, ficando desprevenido até o fim do turno. Você pode gastar +2 PP para fazer com que o efeito dure até o início do próximo turno do alvo. Rasteira: Você faz uma rasteira, o que deixa o inimigo caído e incapaz de executar reações até o início do próximo turno do alvo. Voadora: Você, em vez de fazer uma ação de ataque, faz uma ação completa pegando distância para pular e chutar o inimigo com os dois pés, fazendo dois ataques desarmados em vez de um tendo um bônus de +2d6 em sua rolagem de dano com cada. O personagem fica caído após dar uma voadora.",
        requisitos: "Persistência",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "rei_do_ringue",
        nome: "99% - Rei do Ringue",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Quando realizar um ataque desarmado, você pode fazer um ataque desarmado adicional, que é cumulativo com todas as habilidades desta subclasse. Por exemplo, ao realizar um ataque desarmado, você realiza um adicional, e pode usar Lutador Marcial e 1 PP para realizar um ataque desarmado, você realiza outro ataque adicional e assim por diante. Além disso, seus ataques desarmados ignoram RD do alvo igual a sua Força e Constituição somadas.",
        requisitos: "Luta Suja",
        custo: "-",
        isExample: false
    },

    {
        id: "pele_de_ferro",
        nome: "15% - Pele de Ferro",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Você recebe +1 PV por NEX. A cada outra habilidade que possui desta subclasse, o ganho aumenta em +1 PV. Adicionalmente, soma a sua Constituição na RD que ganha quando realiza um bloqueio.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "escudo_humano",
        nome: "30% - Escudo Humano",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Seu corpo se mexe sozinho em frente a ver seus aliados se machucando. Se algum personagem em alcance curto sofrer algum ataque ou habilidade, você pode gastar 2 PP para sofrer o ataque ou habilidade por ele. Esta habilidade só funciona se você puder ser efetivamente atacado e estiver no alcance do ataque.",
        requisitos: "Pele de Ferro",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "feito_de_aco",
        nome: "45% - Feito de Aço",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Ao sofrer dano Físico, você pode gastar uma Reação para reduzir esse dano à metade. Em 65%, pode usar essa habilidade para reduzir qualquer tipo de dano.",
        requisitos: "Escudo Humano",
        custo: "1 Reação",
        isExample: false
    },

    {
        id: "paredao",
        nome: "65% - Paredão",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Você tem um corpo pesado e resistente, sendo como uma rocha viva. Após sofrer um tipo de dano pela primeira vez em um combate, recebe RD a dano igual a 1 + sua Constituição. Este valor é aplicado a este dano.",
        requisitos: "Feito de Aço",
        custo: "-",
        isExample: false
    },

    {
        id: "duro_como_ferro",
        nome: "99% - Duro Como Ferro",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Enquanto estiver Machucado, você recebe +2 em testes de ataque, +2 na Defesa e RD geral 5. Enquanto estiver morrendo, você não cai inconsciente, podendo agir normalmente enquanto está nesse estado, mas ainda sofre todos os efeitos de estar morrendo.",
        requisitos: "Paredão",
        custo: "-",
        isExample: false
    },

    {
        id: "preparado_ao_combate",
        nome: "15% - Preparado ao Combate",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Você se torna treinado em Iniciativa, se já for treinado, você duplica seu bônus de treinamento em testes de Iniciativa. Adicionalmente, seu deslocamento aumenta em +3m. Por fim, na primeira rodada de um combate, você recebe vantagem em testes de ataque contra alvos que ainda não realizaram seus turnos.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "ataque_extra",
        nome: "30% - Ataque Extra",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Uma vez por rodada, quando faz um ataque, você pode gastar 3 PP para fazer um ataque adicional.",
        requisitos: "Preparado ao Combate",
        custo: "3 PP",
        isExample: false
    },

    {
        id: "sempre_atento",
        nome: "45% - Sempre Atento",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Você recebe uma reação adicional dentro de uma rodada.",
        requisitos: "Ataque Extra",
        custo: "-",
        isExample: false
    },

    {
        id: "surto_de_adrenalina",
        nome: "65% - Surto de Adrenalina",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Uma vez por cena, você pode gastar 5 PP e uma ação de movimento para entrar em um frenesi de agilidade. Enquanto estiver com este efeito, quando faz um ataque, pode realizar um ataque extra com a mesma arma.",
        requisitos: "Sempre Atento",
        custo: "5 PP",
        isExample: false
    },

    {
        id: "elite_da_elite",
        nome: "99% - Elite da Elite",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Todas as habilidades dessa subclasse têm seu custo diminuído em -2 PP. Adicionalmente, você pode utilizar Ataque Extra duas vezes por rodada, ao invés de apenas um. Por fim, você recebe vantagem em testes de ataque contra todos os seres que estiverem abaixo de sua Iniciativa, não apenas na primeira rodada.",
        requisitos: "Surto de Adrenalina",
        custo: "-",
        isExample: false
    },

    {
        id: "audacia",
        nome: "15% - Audácia",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Quando faz um teste de perícia, você pode gastar 2 PP para adicionar seu Carisma no teste. Adicionalmente, você adiciona metade de seu Carisma em sua Defesa. Por fim, você pode gastar uma ação de descanso para praticar suas manobras e sagacidades, aumentando em +1 a sua margem de ameaça. A cada outra habilidade desta subclasse que possuir, este bônus aumenta em +1.",
        requisitos: "-",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "aparar",
        nome: "30% - Aparar",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Uma vez por turno, quando é atingido por um ataque corpo a corpo, você pode gastar 2 PP e uma reação para apará-lo. Faça um teste de ataque. Se o resultado do seu teste for maior que o do oponente, você o apara e acerta um ataque no alvo, porém, se falhar, o ataque contra você é acertado normalmente. Adicionalmente, adiciona o seu modificador de Carisma nas rolagens de dano.",
        requisitos: "Audácia",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "cacoar_e_finalizar",
        nome: "45% - Caçoar e Finalizar",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Você sabe como fazer qualquer pessoa ficar com raiva e ódio da sua cara, porém também sabe que esse é o momento perfeito para atacar. Uma vez por cena, você pode gastar uma ação completa e 5 PP para selecionar um alvo para caçoar e zoar, fazendo com que fique em uma fúria interminável. O alvo recebe +5 em testes de ataque contra você, margem de crítico aumentada em +2 e +2d na rolagem de dano, porém, seu próximo ataque contra o alvo tem +10 no teste, é considerado um crítico indiferente da rolagem e você triplica o dano contra o alvo.",
        requisitos: "Aparar",
        custo: "5 PP",
        isExample: false
    },

    {
        id: "bufao",
        nome: "65% - Bufão",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Sua presença no campo de batalha é capaz de fazer até o aliado mais tenso ficar mais confiante. Todos os seus aliados adjacentes recebem metade do seu modificador de Carisma em testes e resistência a dano. Adicionalmente, quando faz um ataque, adiciona o seu modificador de Carisma e pode gastar 3 PP para adicionar dados de acordo com seu Carisma na rolagem de dano (+3d caso 3 de Carisma, +5d caso 5 de Carisma).",
        requisitos: "Caçoar e Finalizar",
        custo: "3 PP",
        isExample: false
    },

    {
        id: "marca_registrada",
        nome: "99% - Marca Registrada",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Você com o tempo, desenvolveu um padrão de golpes que consegue executar com maestria em qualquer alvo. Uma vez por cena, você pode com uma ação livre e 5 PP fazer ataques contra um ou mais seres ao seu alcance igual ao seu modificador de Carisma.",
        requisitos: "Bufão",
        custo: "5 PP",
        isExample: false
    },

    {
        id: "amante_de_armas",
        nome: "15% - Amante de Armas",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Você é bem conhecido no mundo das armas, por ser esse cliente fiel, você recebe um desconto de 3 de Créditos na compra de todas as armas, incluído modificações. Além disso, uma vez por rodada, você pode gastar 2 PP e trocar a sua arma para realizar um Ataque Rápido, porém, seu dano é reduzido pela metade. Ataque Rápido: adiciona +2 de dano do tipo de arma para cada acerto consecutivo com armas diferentes, mas só pode ser usado com ataques de Destreza.",
        requisitos: "-",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "armas_para_que_te_quero",
        nome: "30% - Armas para que te quero",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Você ataca o seu alvo, deixando com milésimos de segundos para desviar de seus ataques. Quando você trocar a sua arma, você pode gastar 2 PP para realizar um Ataque Rápido com essa arma.",
        requisitos: "Amante de Armas",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "furia_velocista",
        nome: "45% - Fúria Velocista",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Quanto mais ataques fizer de uma vez, menor vai ser a chance do oponente permanecer vivo. Uma vez por rodada, você pode gastar 3 PP para trocar a arma que está segurando e realizar um Ataque Rápido sem consumir qualquer tipo de ação.",
        requisitos: "Armas para que te quero",
        custo: "3 PP",
        isExample: false
    },

    {
        id: "reflexos_ofensivos",
        nome: "65% - Reflexos Ofensivos",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Reagir a um ataque é uma oportunidade de atingir seu ponto fraco. Quando realizar um teste de esquiva bem-sucedido, você pode gastar 2 PP e sua ação de movimento do próximo turno, para trocar a sua arma e realizar um Ataque Rápido contra seu oponente, recebendo +2 no teste para acertar.",
        requisitos: "Fúria Velocista",
        custo: "2 PP",
        isExample: false
    },

    {
        id: "impeto_feroz",
        nome: "99% - Ímpeto Feroz",
        tipo: "subclasse",
        categoria: "duelista",
        descricao: "Você é o mestre das armas e sabe como finalizar os seus ataques com estilo e poder. Quando realiza um Ataque Rápido, pode gastar +1 PP para fazer com que o ataque cause dano normal.",
        requisitos: "Reflexos Ofensivos",
        custo: "+1 PP",
        isExample: false
    },

    {
        id: "aumento_de_atributo",
        nome: "Aumento de Atributo",
        tipo: "habilidade",
        categoria: "-",
        descricao: "Em 20%, e novamente em 50%, 80% e 90%, aumente dois atributos a sua escolha em 1 ou um atributo em 2. Você não pode aumentar um atributo além de 5 desta forma.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "treinamento_melhorado",
        nome: "Treinamento Melhorado",
        tipo: "habilidade",
        categoria: "-",
        descricao: "Em 35%, e novamente em 70%, escolha um número de perícias treinadas igual a 3 + Inteligência. Seu grau de treinamento nessas perícias aumenta em um, de treinado para experiente ou de experiente para versado.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "ascensao",
        nome: "Ascensão",
        tipo: "habilidade",
        categoria: "-",
        descricao: "Em 50%, você pode escolher entre ganhar uma habilidade de classe, habilidade de poder, uma habilidade inicial de alguma subclasse da sua classe ou criar uma Ascensão da individualidade de seu personagem caso possua os requisitos. Veja Ascensão ao Inexistente.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },

    {
        id: "ascensao_absoluta",
        nome: "Ascensão Absoluta",
        tipo: "habilidade",
        categoria: "-",
        descricao: "Em 99%, você chega no ápice do poder sobrenatural que seu ser pode aguentar. Você pode escolher entre ganhar uma nova habilidade de subclasse que não possui, ou pegar a segunda habilidade de uma subclasse que já possui, uma habilidade de classe ou geral, ou criar uma Ascensão Infinita. Se possui Ascensão Elemental com algum elemento, você passa a receber apenas metade do dano deste elemento e seu bônus em testes de resistência contra efeitos dele aumenta para +10, porém, você sofre vulnerabilidade a dano de seu elemento opressor e -10 em testes de resistência contra efeitos dele. Por fim, você passa a ser considerado uma pessoa e uma anomalia de seu elemento ao mesmo tempo para todos os efeitos e você recebe um ponto de atributo adicional para distribuir a sua escolha.",
        requisitos: "-",
        custo: "-",
        isExample: false
    },
    // #endregion
    {
        id: "-",
        nome: "-",
        tipo: "habilidade",
        categoria: "-",
        descricao: "-",
        requisitos: "-",
        custo: "-",
        isExample: false
    },
    {
        id: "-",
        nome: "-",
        tipo: "habilidade",
        categoria: "-",
        descricao: "-",
        requisitos: "-",
        custo: "-",
        isExample: false
    },
    {
        id: "-",
        nome: "-",
        tipo: "habilidade",
        categoria: "-",
        descricao: "-",
        requisitos: "-",
        custo: "-",
        isExample: false
    },
    {
        id: "-",
        nome: "-",
        tipo: "habilidade",
        categoria: "-",
        descricao: "-",
        requisitos: "-",
        custo: "-",
        isExample: false
    },
    {
        id: "-",
        nome: "-",
        tipo: "habilidade",
        categoria: "-",
        descricao: "-",
        requisitos: "-",
        custo: "-",
        isExample: false
    },
    {
        id: "especialista_conhecimento_amplo",
        nome: "Conhecimento Amplo (exemplo)",
        tipo: "habilidade",
        categoria: "especialista",
        descricao: "Placeholder de teste — o Especialista pode realizar testes de perícias em que não é treinado sem sofrer a penalidade usual de destreinado.",
        requisitos: "Especialista, NEX 5%+",
        custo: "—",
        isExample: true
    },
    {
        id: "individualista_furia_paranormal",
        nome: "Fúria Paranormal (exemplo)",
        tipo: "habilidade",
        categoria: "individualista",
        descricao: "Placeholder de teste — uma vez por cena, o Individualista pode entrar em fúria, ganhando bônus em testes de Força e Fortitude por algumas rodadas.",
        requisitos: "Individualista, NEX 10%+",
        custo: "3 PP",
        isExample: true
    }
];

const PODERES_DB = [
    {
        id: "transformacao_pele_de_ferro",
        nome: "Pele de Ferro (exemplo)",
        tipo: "poder",
        elemento: "transformacao",
        descricao: "Placeholder de teste — o corpo do usuário endurece momentaneamente, concedendo bônus de Defesa até o início do próximo turno.",
        requisitos: "NEX 5%+",
        custo: "2 PP",
        isExample: true
    },
    {
        id: "mente_sussurro_convincente",
        nome: "Sussurro Convincente (exemplo)",
        tipo: "poder",
        elemento: "mente",
        descricao: "Placeholder de teste — o usuário planta uma sugestão simples na mente de um alvo próximo, que deve resistir com Vontade ou obedecer.",
        requisitos: "NEX 10%+",
        custo: "3 PP",
        isExample: true
    },
    {
        id: "espaco_passo_curto",
        nome: "Passo Curto (exemplo)",
        tipo: "poder",
        elemento: "espaco",
        descricao: "Placeholder de teste — o usuário se teleporta instantaneamente para um ponto visível a curta distância.",
        requisitos: "NEX 5%+",
        custo: "2 PP",
        isExample: true
    },
    {
        id: "realidade_fenda_menor",
        nome: "Fenda Menor (exemplo)",
        tipo: "poder",
        elemento: "realidade",
        descricao: "Placeholder de teste — abre uma pequena fenda instável que causa dano a quem estiver por perto quando se fecha.",
        requisitos: "NEX 15%+",
        custo: "4 PP",
        isExample: true
    }
];

// Junta os dois bancos numa lista só, útil pra busca/filtro genéricos.
function getTodosEfeitos() {
    return [...HABILIDADES_DB, ...PODERES_DB];
}

function getEfeitoPorId(id) {
    return getTodosEfeitos().find(e => e.id === id) || null;
}
