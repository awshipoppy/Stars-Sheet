// =========================================
// ELEMENTOS.JS — nomes e cores compartilhados
// =========================================
//
// Usado pela ficha de personagem (poderes/afinidades) e pelo
// bestiário de ameaças (elemento de cada ameaça).

const ELEMENT_LABELS = {
    alma: "Alma",
    espaco: "Espaço",
    mente: "Mente",
    poder: "Poder",
    realidade: "Realidade",
    tempo: "Tempo",
    transformacao: "Transformação",
    primordial: "Primordial",
    nenhum: "Nenhum"
};

const ELEMENT_COLORS = {
    alma: "#3dc7c9",
    espaco: "#1e5fd9",
    mente: "#3dbf6b",
    poder: "#d9c23d",
    realidade: "#c0392b",
    tempo: "#4c0072",
    transformacao: "#d97a3d",
    primordial: "#eeeeee",
    nenhum: "#2b2626",
    soberano: "#b9e8ea"
};

function getElementColor(key) {
    return ELEMENT_COLORS[key] || "#333333";
}
