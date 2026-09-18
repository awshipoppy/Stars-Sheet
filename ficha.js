// =========================================
// CONFIGURAÇÃO
// =========================================

const STORAGE_KEY = "reino-alem-ficha";

const ATTRIBUTES = [
    "forca",
    "destreza",
    "constituicao",
    "poder",
    "inteligencia",
    "sabedoria",
    "carisma"
];

const ATTRIBUTE_LABELS = {
    forca: "Força",
    destreza: "Destreza",
    constituicao: "Constituição",
    poder: "Poder",
    inteligencia: "Inteligência",
    sabedoria: "Sabedoria",
    carisma: "Carisma"
};

const ATTRIBUTE_COLORS = {
    forca: "#c0392b",
    destreza: "#3d7dc9",
    constituicao: "#d97a3d",
    poder: "#d9c23d",
    inteligencia: "#3dbf6b",
    sabedoria: "#3dc7c9",
    carisma: "#9b3dc9"
};

// ELEMENT_LABELS e getElementColor agora moram em elementos.js (compartilhado
// com o bestiário de ameaças).

// Fórmulas de PV / PP / Sanidade por classe, em NEX 5% (base) e o quanto
// cada recurso aumenta a cada novo nível de NEX (10%, 15%, 20%...).
const CLASS_VITALITY = {
    duelista: { pv: 20, pvInc: 5, pp: 3, ppInc: 3, san: 12, sanInc: 4 },
    especialista: { pv: 16, pvInc: 4, pp: 4, ppInc: 4, san: 16, sanInc: 4 },
    individualista: { pv: 12, pvInc: 3, pp: 5, ppInc: 5, san: 20, sanInc: 4 }
};

// Pontos de Crédito máximos por Rank (Z é ilimitado)
const RANK_CREDITS = { E: 20, D: 40, C: 60, B: 80, A: 120, S: 200, Z: Infinity };

// Todas as perícias do sistema, com o atributo que cada uma usa.
const SKILLS = [
    { key: "acrobacia", name: "Acrobacia", attr: "destreza" },
    { key: "adestramento", name: "Adestramento", attr: "sabedoria" },
    { key: "atletismo", name: "Atletismo", attr: "forca" },
    { key: "atuacao", name: "Atuação", attr: "carisma" },
    { key: "ciencia", name: "Ciência", attr: "inteligencia" },
    { key: "diplomacia", name: "Diplomacia", attr: "carisma" },
    { key: "enganacao", name: "Enganação", attr: "carisma" },
    { key: "fortitude", name: "Fortitude", attr: "constituicao" },
    { key: "furtividade", name: "Furtividade", attr: "destreza" },
    { key: "historia", name: "História", attr: "inteligencia" },
    { key: "intimidacao", name: "Intimidação", attr: "carisma" },
    { key: "intuicao", name: "Intuição", attr: "sabedoria" },
    { key: "iniciativa", name: "Iniciativa", attr: "destreza" },
    { key: "investigacao", name: "Investigação", attr: "inteligencia" },
    { key: "luta", name: "Luta", attr: "forca" },
    { key: "manufatura", name: "Manufatura", attr: "inteligencia" },
    { key: "medicina", name: "Medicina", attr: "inteligencia" },
    { key: "ocultismo", name: "Ocultismo", attr: "inteligencia" },
    { key: "percepcao", name: "Percepção", attr: "sabedoria" },
    { key: "pilotagem", name: "Pilotagem", attr: "destreza" },
    { key: "pontaria", name: "Pontaria", attr: "destreza" },
    { key: "prestidigitacao", name: "Prestidigitação", attr: "destreza" },
    { key: "reflexos", name: "Reflexos", attr: "destreza" },
    { key: "religiao", name: "Religião", attr: "inteligencia" },
    { key: "sobrevivencia", name: "Sobrevivência", attr: "sabedoria" },
    { key: "tatica", name: "Tática", attr: "inteligencia" },
    { key: "tecnologia", name: "Tecnologia", attr: "inteligencia" },
    { key: "vontade", name: "Vontade", attr: "sabedoria" }
];

// NEX vai de 0% a 95% em passos de 5%, e depois salta para 99%.
function buildNexOptions() {
    const options = [];
    for (let n = 0; n <= 95; n += 5) options.push(n);
    options.push(99);
    return options;
}

const NEX_OPTIONS = buildNexOptions();

function defaultSkills() {
    const obj = {};
    SKILLS.forEach(skill => {
        obj[skill.key] = { training: 0, other: 0, attrOverride: null };
    });
    return obj;
}

function defaultState() {
    return {
        name: "",
        antepassado: "",
        classe: "",
        subclasse: "",
        poderParanormal: "",
        elemento: "",
        rank: "",
        nex: 0,
        portrait: null,
        attributes: {
            forca: 0,
            destreza: 0,
            constituicao: 0,
            poder: 0,
            inteligencia: 0,
            sabedoria: 0,
            carisma: 0
        },
        defenseBonus: 0,
        ppLimitBonus: 0,
        dtPoderesBonus: 0,
        dtPoderesAttr: "poder",
        capacidadeCarga: 7,
        esquiva: 0,
        bloqueio: 0,
        deslocamento: { metros: 9, quadrados: 6 },
        pv: { current: 0, max: 0 },
        pp: { current: 0, max: 0 },
        sanidade: { current: 0, max: 0 },
        proficiencias: "",
        resistencias: "",
        skills: defaultSkills(),
        abilities: [],
        powers: [],
        characteristics: [],
        affinities: {
            realidade: 0,
            tempo: 0,
            transformacao: 0,
            poder: 0,
            mente: 0,
            espaco: 0,
            alma: 0
        },
        equipment: [],
        extras: {
            anotacoes: "",
            aparencia: "",
            personalidade: "",
            historico: "",
            objetivos: ""
        },
        accent: "vermelho",
        accentCustomHex: "#c0392b",
        collapsedSections: {
            dados: false,
            atributos: false,
            pericias: false,
            caracteristicas: false,
            recursos: false,
            habilidades: false,
            poderes: false,
            afinidades: false,
            equipamentos: false,
            extras: false
        }
    };
}


// =========================================
// ESTADO
// =========================================

let state = loadState();

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultState();

        const saved = JSON.parse(raw);
        const base = defaultState();

        return {
            ...base,
            ...saved,
            attributes: { ...base.attributes, ...(saved.attributes || {}) },
            pv: { ...base.pv, ...(saved.pv || {}) },
            pp: { ...base.pp, ...(saved.pp || {}) },
            sanidade: { ...base.sanidade, ...(saved.sanidade || {}) },
            deslocamento: { ...base.deslocamento, ...(saved.deslocamento || {}) },
            skills: { ...base.skills, ...(saved.skills || {}) },
            extras: { ...base.extras, ...(saved.extras || {}) },
            collapsedSections: { ...base.collapsedSections, ...(saved.collapsedSections || {}) },
            affinities: { ...base.affinities, ...(saved.affinities || {}) },
            abilities: Array.isArray(saved.abilities) ? saved.abilities : [],
            powers: Array.isArray(saved.powers) ? saved.powers : [],
            characteristics: Array.isArray(saved.characteristics) ? saved.characteristics : [],
            equipment: Array.isArray(saved.equipment) ? saved.equipment : []
        };
    } catch (e) {
        return defaultState();
    }
}

function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        // armazenamento indisponível (ex: foto grande demais) — a ficha
        // continua funcionando nesta sessão mesmo assim
    }
}


// =========================================
// ELEMENTOS
// =========================================

const nameInput = document.getElementById("char-name");
const antepassadoInput = document.getElementById("char-antepassado");
const classeSelect = document.getElementById("char-classe");
const subclasseInput = document.getElementById("char-subclasse");
const poderInput = document.getElementById("char-poder");
const elementoInput = document.getElementById("char-elemento");
const rankSelect = document.getElementById("char-rank");
const nexSelect = document.getElementById("char-nex");

const portraitBox = document.getElementById("identity-portrait");
const portraitImg = document.getElementById("portrait-img");
const portraitInput = document.getElementById("portrait-input");

const themeSwatches = document.getElementById("theme-swatches");
const themeCustomColorInput = document.getElementById("theme-custom-color");

const attributesGrid = document.getElementById("attributes-grid");
const resourceBars = document.getElementById("resource-bars");

const defenseBonusInput = document.getElementById("defesa-bonus");
const esquivaInput = document.getElementById("esquiva-input");
const bloqueioInput = document.getElementById("bloqueio-input");
const pplimitMinusBtn = document.getElementById("pplimit-minus");
const pplimitPlusBtn = document.getElementById("pplimit-plus");
const descMetrosInput = document.getElementById("desloc-metros");
const descQuadrosInput = document.getElementById("desloc-quadrados");
const dtpoderesMinusBtn = document.getElementById("dtpoderes-minus");
const dtpoderesPlusBtn = document.getElementById("dtpoderes-plus");
const dtpoderesAttrSelect = document.getElementById("dtpoderes-attr");
const proficienciasInput = document.getElementById("proficiencias-input");
const resistenciasInput = document.getElementById("resistencias-input");

const diceQuickButtons = document.querySelectorAll(".dice-quick-btn");
const diceCustomInput = document.getElementById("dice-custom-input");
const diceCustomRollBtn = document.getElementById("dice-custom-roll");

const skillsList = document.getElementById("skills-list");

const abilitiesList = document.getElementById("abilities-list");
const addAbilityBtn = document.getElementById("add-ability");

const powersList = document.getElementById("powers-list");
const addPowerBtn = document.getElementById("add-power");

const characteristicsList = document.getElementById("characteristics-list");
const addCharacteristicBtn = document.getElementById("add-characteristic");

const affinitiesGrid = document.querySelector(".affinities-grid");

const capacidadeInput = document.getElementById("capacidade-carga");
const creditsValueEl = document.getElementById("credits-value");
const equipmentRows = document.getElementById("equipment-rows");
const addEquipmentBtn = document.getElementById("add-equipment");

const extraInputs = {
    anotacoes: document.getElementById("extra-anotacoes"),
    aparencia: document.getElementById("extra-aparencia"),
    personalidade: document.getElementById("extra-personalidade"),
    historico: document.getElementById("extra-historico"),
    objetivos: document.getElementById("extra-objetivos")
};

const resetBtn = document.getElementById("reset-sheet");

const efeitoModalOverlay = document.getElementById("efeito-modal-overlay");
const efeitoModalContent = document.getElementById("efeito-modal-content");
const efeitoModalClose = document.getElementById("efeito-modal-close");
const exportBtn = document.getElementById("export-sheet");
const importBtn = document.getElementById("import-sheet");
const importFileInput = document.getElementById("import-file-input");


// =========================================
// ROLAGEM DE DADOS
// =========================================
// rollD10, performRoll, showRollToast, mountToast, parseDiceExpression,
// parseDiceTerm e rollCustomDice agora moram em dice.js (compartilhado
// com o bestiário de ameaças). Veja esse arquivo para os detalhes.


// =========================================
// RENDER — TEMA DO SITE
// =========================================

function applyTheme() {
    // aplica no armazenamento compartilhado do site inteiro (script.js)
    if (state.accent === "custom") {
        if (typeof setSiteAccentCustomHex === "function") {
            setSiteAccentCustomHex(state.accentCustomHex);
        }
    } else if (typeof setSiteAccentName === "function") {
        setSiteAccentName(state.accent);
    }

    themeSwatches.querySelectorAll(".theme-swatch").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.theme === state.accent);
    });

    themeCustomColorInput.value = state.accentCustomHex;
}


// =========================================
// RENDER — IDENTIDADE
// =========================================

function renderIdentity() {
    nameInput.value = state.name || "";
    antepassadoInput.value = state.antepassado || "";
    classeSelect.value = state.classe || "";
    subclasseInput.value = state.subclasse || "";
    poderInput.value = state.poderParanormal || "";
    elementoInput.value = state.elemento || "";
    rankSelect.value = state.rank || "";

    if (!nexSelect.dataset.built) {
        NEX_OPTIONS.forEach(n => {
            const opt = document.createElement("option");
            opt.value = n;
            opt.textContent = `${n}%`;
            nexSelect.appendChild(opt);
        });
        nexSelect.dataset.built = "true";
    }
    nexSelect.value = state.nex;

    portraitImg.src = state.portrait || "assets/personagem-exemplo.png";
}


// =========================================
// RENDER — ATRIBUTOS
// =========================================

function renderAttributes() {
    attributesGrid.innerHTML = "";

    ATTRIBUTES.forEach(attr => {
        const value = state.attributes[attr] || 0;

        const card = document.createElement("div");
        card.className = "attribute-card";
        card.dataset.attr = attr;
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `Testar ${ATTRIBUTE_LABELS[attr]}`);

        card.innerHTML = `
            <span class="attribute-label">${ATTRIBUTE_LABELS[attr]}</span>
            <span class="attribute-value${value < 0 ? " negative" : ""}">${value}</span>
            <div class="attribute-control">
                <button type="button" class="attr-btn attr-minus" aria-label="Diminuir ${ATTRIBUTE_LABELS[attr]}">–</button>
                <button type="button" class="attr-btn attr-plus" aria-label="Aumentar ${ATTRIBUTE_LABELS[attr]}">+</button>
            </div>
        `;

        attributesGrid.appendChild(card);
    });
}


// =========================================
// VITALIDADE (PV / PP / SANIDADE) — automática por Classe + NEX
// =========================================

function recalcVitality() {
    const formula = CLASS_VITALITY[state.classe];
    if (!formula) return; // sem classe escolhida: valores ficam sob controle manual

    let levelIndex = NEX_OPTIONS.indexOf(Number(state.nex));
    if (levelIndex < 1) levelIndex = 1; // NEX 0% (ou valor inválido) usa a base de NEX 5%
    const increments = levelIndex - 1;
    const totalLevels = increments + 1; // quantas vezes o atributo entra na conta (1 na base + 1 por novo nível)

    const attrs = state.attributes;

    state.pv.max = formula.pv + increments * formula.pvInc + attrs.constituicao * totalLevels;
    state.pp.max = formula.pp + increments * formula.ppInc + attrs.poder * totalLevels;
    state.sanidade.max = formula.san + increments * formula.sanInc + attrs.sabedoria * totalLevels;

    state.pv.current = state.pv.max;
    state.pp.current = state.pp.max;
    state.sanidade.current = state.sanidade.max;
}

function recalcCapacity() {
    const forca = state.attributes.forca || 0;
    state.capacidadeCarga = forca >= 0 ? 7 + forca * 2 : 7 + forca;
}

function recalcEsquivaBloqueio() {
    const reflexosTraining = Number(state.skills.reflexos && state.skills.reflexos.training) || 0;
    const fortitudeTraining = Number(state.skills.fortitude && state.skills.fortitude.training) || 0;
    const forca = state.attributes.forca || 0;

    state.esquiva = reflexosTraining;
    state.bloqueio = forca + fortitudeTraining;
}


// =========================================
// RENDER — RECURSOS (PV / PP / SANIDADE / DEFESA / LIMITE DE PP / DT)
// =========================================

const RESOURCE_DEFS = [
    { key: "pv", label: "Pontos de Vida", fillClass: "pv-fill" },
    { key: "pp", label: "Pontos de Poder", fillClass: "pp-fill" },
    { key: "sanidade", label: "Sanidade", fillClass: "sanidade-fill" }
];

function renderResourceBars() {
    if (!resourceBars.dataset.built) {
        resourceBars.innerHTML = RESOURCE_DEFS.map(def => `
            <div class="resource-bar-card ${def.key}-card">
                <div class="resource-bar-top">
                    <span class="resource-bar-label">${def.label}</span>
                    <div class="resource-bar-inputs">
                        <input type="number" id="${def.key}-current" aria-label="${def.label} atual">
                        <span>/</span>
                        <input type="number" id="${def.key}-max" aria-label="${def.label} máximo">
                    </div>
                </div>
                <div class="resource-bar-track">
                    <div class="resource-bar-fill ${def.fillClass}" id="${def.key}-fill"></div>
                </div>
            </div>
        `).join("");

        resourceBars.dataset.built = "true";

        RESOURCE_DEFS.forEach(def => {
            document.getElementById(`${def.key}-current`).addEventListener("input", (e) => {
                state[def.key].current = Number(e.target.value) || 0;
                saveState();
                renderResourceBars();
            });
            document.getElementById(`${def.key}-max`).addEventListener("input", (e) => {
                state[def.key].max = Number(e.target.value) || 0;
                saveState();
                renderResourceBars();
            });
        });
    }

    RESOURCE_DEFS.forEach(def => {
        const data = state[def.key];
        document.getElementById(`${def.key}-current`).value = data.current;
        document.getElementById(`${def.key}-max`).value = data.max;

        const pct = data.max > 0 ? Math.max(0, Math.min(100, (data.current / data.max) * 100)) : 0;
        document.getElementById(`${def.key}-fill`).style.width = pct + "%";

        const card = document.getElementById(`${def.key}-current`).closest(".resource-bar-card");
        const isLow = data.max > 0 && pct <= 50;
        const isCritical = data.max > 0 && pct <= 25;

        card.classList.toggle("is-low", isLow && !isCritical);
        card.classList.toggle("is-critical", isCritical);
    });
}

function computePpLimit() {
    const nex = Number(state.nex) || 0;
    const nexForCalc = nex >= 99 ? 100 : nex; // 99% conta como 100% pra esse cálculo
    return Math.floor(nexForCalc / 5) + (Number(state.ppLimitBonus) || 0);
}

function renderDerived() {
    const attrs = state.attributes;

    const bonus = Number(state.defenseBonus) || 0;
    const defesa = 5 + attrs.destreza + bonus;

    document.getElementById("defesa-value").textContent = defesa;
    defenseBonusInput.value = bonus;

    esquivaInput.value = state.esquiva;
    bloqueioInput.value = state.bloqueio;

    const ppLimit = computePpLimit();
    document.getElementById("pplimit-value").textContent = ppLimit;
    document.getElementById("pplimit-bonus-display").textContent =
        state.ppLimitBonus > 0 ? `+${state.ppLimitBonus}` : state.ppLimitBonus;

    descMetrosInput.value = state.deslocamento.metros;
    descQuadrosInput.value = state.deslocamento.quadrados;

    if (!dtpoderesAttrSelect.dataset.built) {
        ATTRIBUTES.forEach(a => {
            const opt = document.createElement("option");
            opt.value = a;
            opt.textContent = ATTRIBUTE_LABELS[a];
            dtpoderesAttrSelect.appendChild(opt);
        });
        dtpoderesAttrSelect.dataset.built = "true";
    }
    dtpoderesAttrSelect.value = state.dtPoderesAttr;

    const dtAttrValue = state.attributes[state.dtPoderesAttr] || 0;
    const dtPoderes = 5 + Math.floor(ppLimit / 2) + dtAttrValue + (Number(state.dtPoderesBonus) || 0);
    document.getElementById("dtpoderes-value").textContent = dtPoderes;
    document.getElementById("dtpoderes-bonus-display").textContent =
        state.dtPoderesBonus > 0 ? `+${state.dtPoderesBonus}` : state.dtPoderesBonus;

    proficienciasInput.value = state.proficiencias || "";
    resistenciasInput.value = state.resistencias || "";

    capacidadeInput.value = state.capacidadeCarga;

    const rankMax = RANK_CREDITS[state.rank];
    const spent = state.equipment.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);
    const maxText = rankMax === undefined ? "—" : (rankMax === Infinity ? "Ilimitado" : rankMax);
    creditsValueEl.textContent = `${spent} / ${maxText}`;
}


// =========================================
// RENDER — PERÍCIAS
// =========================================

const TRAINING_OPTIONS = [0, 2, 4, 6, 8];

function renderSkills() {
    skillsList.innerHTML = "";

    SKILLS.forEach(skill => {
        const data = state.skills[skill.key] || { training: 0, other: 0, attrOverride: null };
        const effectiveAttr = data.attrOverride || skill.attr;
        const attrValue = state.attributes[effectiveAttr] || 0;
        const total = attrValue + (Number(data.training) || 0) + (Number(data.other) || 0);
        const color = ATTRIBUTE_COLORS[effectiveAttr];

        const row = document.createElement("div");
        row.className = "skill-row";
        row.dataset.skill = skill.key;
        row.style.setProperty("--skill-color", color);

        row.innerHTML = `
            <div class="skill-name-group">
                <span class="skill-name">${escapeHtml(skill.name)}</span>
                <select class="skill-attr-select" aria-label="Atributo usado em ${escapeHtml(skill.name)}">
                    ${ATTRIBUTES.map(a => `<option value="${a}" ${effectiveAttr === a ? "selected" : ""}>${ATTRIBUTE_LABELS[a]}</option>`).join("")}
                </select>
            </div>
            <div class="skill-inputs">
                <label>Trein.
                    <select class="skill-training">
                        ${TRAINING_OPTIONS.map(v => `<option value="${v}" ${Number(data.training) === v ? "selected" : ""}>${v === 0 ? "0" : "+" + v}</option>`).join("")}
                    </select>
                </label>
                <label>Outros
                    <input type="number" class="skill-other" value="${Number(data.other) || 0}">
                </label>
            </div>
            <span class="skill-total">${total}</span>
        `;

        skillsList.appendChild(row);
    });
}

// Atualiza só o total/cor de UMA linha, sem recriar o DOM — evita perder o
// foco do campo e o "pulo" de rolagem que acontecia ao digitar.
function updateSkillRowDisplay(key) {
    const row = skillsList.querySelector(`[data-skill="${key}"]`);
    if (!row) return;

    const skill = SKILLS.find(s => s.key === key);
    if (!skill) return;

    const data = state.skills[key] || { training: 0, other: 0, attrOverride: null };
    const effectiveAttr = data.attrOverride || skill.attr;
    const color = ATTRIBUTE_COLORS[effectiveAttr];
    const total = (state.attributes[effectiveAttr] || 0) + (Number(data.training) || 0) + (Number(data.other) || 0);

    row.style.setProperty("--skill-color", color);

    const totalEl = row.querySelector(".skill-total");
    if (totalEl) totalEl.textContent = total;
}

function updateAllSkillRowDisplays() {
    SKILLS.forEach(skill => updateSkillRowDisplay(skill.key));
}


// =========================================
// RENDER — HABILIDADES
// =========================================

function renderAbilities() {
    abilitiesList.innerHTML = "";

    if (state.abilities.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "Nenhuma habilidade registrada ainda.";
        abilitiesList.appendChild(empty);
        return;
    }

    state.abilities.forEach((ability, index) => {
        const card = document.createElement("div");
        card.dataset.index = index;

        const collapsed = !!ability.collapsed;

        // Itens antigos (de antes deste sistema existir) não têm "origem" —
        // continuam tratados como personalizados, sem perder nada.
        if (ability.origem === "database") {
            const dados = getEfeitoPorId(ability.habilidadeId);
            card.className = "ability-card efeito-db-card";

            if (!dados) {
                card.innerHTML = `
                    <p class="empty-state">Habilidade não encontrada no banco (id: ${escapeHtml(ability.habilidadeId || "?")}).</p>
                    <button type="button" class="ability-remove" aria-label="Remover habilidade">✕</button>
                `;
            } else {
                card.innerHTML = `
                    <div class="ability-header">
                        <div class="efeito-db-title">
                            <span class="efeito-badge efeito-badge-sistema">Sistema</span>
                            ${dados.isExample ? `<span class="efeito-badge efeito-badge-exemplo">Exemplo</span>` : ""}
                            <h4>${escapeHtml(dados.nome)}</h4>
                            <span class="efeito-db-meta">${escapeHtml(HABILIDADE_CATEGORIAS[dados.categoria] || dados.categoria)}</span>
                        </div>
                    </div>
                    <p class="efeito-db-desc${collapsed ? " is-hidden" : ""}">${escapeHtml(dados.descricao || "")}</p>
                    <p class="efeito-db-submeta${collapsed ? " is-hidden" : ""}">Requisitos: ${escapeHtml(dados.requisitos || "—")} · Custo: ${escapeHtml(dados.custo || "—")}</p>
                    <label class="efeito-anotacao${collapsed ? " is-hidden" : ""}">Anotação pessoal
                        <input type="text" class="ability-anotacao" placeholder="Ex: aprendi com o Mestre X" value="${escapeHtml(ability.anotacao || "")}">
                    </label>
                    <button type="button" class="ability-toggle" aria-label="${collapsed ? "Mostrar" : "Ocultar"} descrição">${collapsed ? "▸" : "▾"}</button>
                    <button type="button" class="ability-remove" aria-label="Remover habilidade">✕</button>
                `;
            }
        } else {
            card.className = "ability-card";
            card.innerHTML = `
                <div class="ability-header">
                    <input
                        type="text"
                        class="ability-title"
                        placeholder="Nome da habilidade"
                        value="${escapeHtml(ability.title || "")}"
                    >
                    <input
                        type="text"
                        class="ability-source"
                        placeholder="Fonte"
                        value="${escapeHtml(ability.source || "")}"
                    >
                </div>
                <textarea
                    class="ability-desc${collapsed ? " is-hidden" : ""}"
                    placeholder="Descreva o que essa habilidade faz..."
                >${escapeHtml(ability.desc || "")}</textarea>
                <button type="button" class="ability-toggle" aria-label="${collapsed ? "Mostrar" : "Ocultar"} descrição">${collapsed ? "▸" : "▾"}</button>
                <button type="button" class="ability-remove" aria-label="Remover habilidade">✕</button>
            `;
        }

        abilitiesList.appendChild(card);
    });
}


// =========================================
// RENDER — PODERES
// =========================================

function renderPowers() {
    powersList.innerHTML = "";

    if (state.powers.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "Nenhum poder registrado ainda.";
        powersList.appendChild(empty);
        return;
    }

    state.powers.forEach((power, index) => {
        const collapsed = !!power.collapsed;
        const card = document.createElement("div");
        card.dataset.index = index;

        if (power.origem === "database") {
            const dados = getEfeitoPorId(power.poderId);
            const elementColor = dados ? getElementColor(dados.elemento) : "#333";
            card.className = "power-card efeito-db-card";
            card.style.setProperty("--element-color", elementColor);

            if (!dados) {
                card.innerHTML = `
                    <p class="empty-state">Poder não encontrado no banco (id: ${escapeHtml(power.poderId || "?")}).</p>
                    <button type="button" class="power-remove" aria-label="Remover poder">✕</button>
                `;
            } else {
                const stars = Array.from({ length: 7 }, (_, i) => {
                    const value = i + 1;
                    const filled = value <= (Number(power.stars) || 0);
                    return `<button type="button" class="power-star${filled ? " filled" : ""}" data-value="${value}" aria-label="Grau ${value}">★</button>`;
                }).join("");

                card.innerHTML = `
                    <div class="power-header">
                        <div class="efeito-db-title">
                            <span class="efeito-badge efeito-badge-sistema">Sistema</span>
                            ${dados.isExample ? `<span class="efeito-badge efeito-badge-exemplo">Exemplo</span>` : ""}
                            <h4>${escapeHtml(dados.nome)}</h4>
                            <span class="efeito-db-meta">${escapeHtml(ELEMENT_LABELS[dados.elemento] || dados.elemento)}</span>
                        </div>
                        <div class="power-stars">${stars}</div>
                    </div>
                    <p class="efeito-db-desc${collapsed ? " is-hidden" : ""}">${escapeHtml(dados.descricao || "")}</p>
                    <p class="efeito-db-submeta${collapsed ? " is-hidden" : ""}">Requisitos: ${escapeHtml(dados.requisitos || "—")} · Custo: ${escapeHtml(dados.custo || "—")}</p>
                    <label class="efeito-anotacao${collapsed ? " is-hidden" : ""}">Anotação pessoal
                        <input type="text" class="power-anotacao" placeholder="Ex: aprendi com o Mestre X" value="${escapeHtml(power.anotacao || "")}">
                    </label>
                    <button type="button" class="power-toggle" aria-label="${collapsed ? "Mostrar" : "Ocultar"} descrição">${collapsed ? "▸" : "▾"}</button>
                    <button type="button" class="power-remove" aria-label="Remover poder">✕</button>
                `;
            }
        } else {
            const elementColor = power.element ? getElementColor(power.element) : "#333";
            card.className = "power-card";
            card.style.setProperty("--element-color", elementColor);

            const stars = Array.from({ length: 7 }, (_, i) => {
                const value = i + 1;
                const filled = value <= (Number(power.stars) || 0);
                return `<button type="button" class="power-star${filled ? " filled" : ""}" data-value="${value}" aria-label="Grau ${value}">★</button>`;
            }).join("");

            card.innerHTML = `
                <div class="power-header">
                    <input
                        type="text"
                        class="power-title"
                        placeholder="Nome do poder"
                        value="${escapeHtml(power.title || "")}"
                    >
                    <div class="power-stars">${stars}</div>
                </div>

                <div class="power-fields-grid${collapsed ? " is-hidden" : ""}">
                    <label>Elemento
                        <select class="power-element" data-element="${power.element || ""}">
                            <option value="">Selecione</option>
                            ${Object.entries(ELEMENT_LABELS).map(([key, label]) =>
                                `<option value="${key}" ${power.element === key ? "selected" : ""}>${label}</option>`
                            ).join("")}
                        </select>
                    </label>
                    <label>Execução
                        <input type="text" class="power-execucao" value="${escapeHtml(power.execucao || "")}">
                    </label>
                    <label>Alcance
                        <input type="text" class="power-alcance" value="${escapeHtml(power.alcance || "")}">
                    </label>
                    <label>Alvo ou Área
                        <input type="text" class="power-alvo" value="${escapeHtml(power.alvo || "")}">
                    </label>
                    <label>Duração
                        <input type="text" class="power-duracao" value="${escapeHtml(power.duracao || "")}">
                    </label>
                    <label>Resistência
                        <input type="text" class="power-resistencia" value="${escapeHtml(power.resistencia || "")}">
                    </label>
                </div>

                <textarea class="power-desc${collapsed ? " is-hidden" : ""}" placeholder="Descrição do poder...">${escapeHtml(power.desc || "")}</textarea>

                <button type="button" class="power-toggle" aria-label="${collapsed ? "Mostrar" : "Ocultar"} descrição">${collapsed ? "▸" : "▾"}</button>
                <button type="button" class="power-remove" aria-label="Remover poder">✕</button>
            `;
        }

        powersList.appendChild(card);
    });
}

// getElementColor agora mora em elementos.js (compartilhado)


// =========================================
// RENDER — CARACTERÍSTICAS
// =========================================

const CHARACTERISTIC_COLORS = {
    positiva: "#3dbf6b",
    negativa: "#c0392b",
    anatema: "#9b3dc9"
};

function renderCharacteristics() {
    characteristicsList.innerHTML = "";

    if (state.characteristics.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "Nenhuma característica registrada ainda.";
        characteristicsList.appendChild(empty);
        return;
    }

    state.characteristics.forEach((item, index) => {
        const color = CHARACTERISTIC_COLORS[item.type] || "#333333";

        const card = document.createElement("div");
        card.className = "characteristic-card";
        card.dataset.index = index;
        card.style.setProperty("--char-color", color);

        card.innerHTML = `
            <div class="characteristic-header">
                <input
                    type="text"
                    class="characteristic-title"
                    placeholder="Nome da característica"
                    value="${escapeHtml(item.title || "")}"
                >
                <select class="characteristic-type">
                    <option value="">Selecione</option>
                    <option value="positiva" ${item.type === "positiva" ? "selected" : ""}>Positiva</option>
                    <option value="negativa" ${item.type === "negativa" ? "selected" : ""}>Negativa</option>
                    <option value="anatema" ${item.type === "anatema" ? "selected" : ""}>Anátema</option>
                </select>
            </div>
            <textarea
                class="characteristic-desc"
                placeholder="Como ela funciona..."
            >${escapeHtml(item.desc || "")}</textarea>
            <button type="button" class="characteristic-remove" aria-label="Remover característica">✕</button>
        `;

        characteristicsList.appendChild(card);
    });
}


// =========================================
// RENDER — AFINIDADES
// =========================================

function renderAffinities() {
    if (!affinitiesGrid) return;

    affinitiesGrid.querySelectorAll(".affinity-item").forEach(item => {
        const key = item.dataset.element;
        const value = Number(state.affinities[key]) || 0;

        item.querySelector(".affinity-value").textContent = value;

        const nameEl = item.querySelector(".affinity-name");
        const color = getElementColor(key);
        const glow = Math.min(6 + value * 3, 60);

        if (value > 0) {
            nameEl.style.textShadow = `0 0 ${glow}px ${color}, 0 0 ${glow / 2}px ${color}`;
        } else {
            nameEl.style.textShadow = "none";
        }
    });
}


// =========================================
// RENDER — EQUIPAMENTOS
// =========================================

function renderEquipment() {
    equipmentRows.innerHTML = "";

    if (state.equipment.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "Nenhum equipamento adicionado ainda.";
        equipmentRows.appendChild(empty);
    } else {
        state.equipment.forEach((item, index) => {
            const row = document.createElement("div");
            row.className = "equipment-row";
            row.dataset.index = index;

            row.innerHTML = `
                <input
                    type="text"
                    data-field="name"
                    placeholder="Nome do item"
                    value="${escapeHtml(item.name || "")}"
                >
                <input
                    type="number"
                    data-field="cost"
                    min="0"
                    placeholder="0"
                    value="${item.cost || 0}"
                >
                <input
                    type="number"
                    data-field="slots"
                    min="0"
                    placeholder="0"
                    value="${item.slots || 0}"
                >
                <button type="button" class="equipment-remove" aria-label="Remover item">✕</button>
            `;

            equipmentRows.appendChild(row);
        });
    }

    updateEquipmentTotal();
}

function updateEquipmentTotal() {
    const total = state.equipment.reduce((sum, item) => sum + (Number(item.slots) || 0), 0);
    document.getElementById("equipment-total-slots").textContent = total;
}


// =========================================
// RENDER — EXTRAS
// =========================================

function renderExtras() {
    Object.keys(extraInputs).forEach(key => {
        extraInputs[key].value = state.extras[key] || "";
    });
}


// =========================================
// RENDER — TUDO
// =========================================

function renderAll() {
    applyTheme();
    renderIdentity();
    renderAttributes();
    renderResourceBars();
    renderDerived();
    renderSkills();
    renderCharacteristics();
    renderAbilities();
    renderPowers();
    renderAffinities();
    renderEquipment();
    renderExtras();
    applySectionCollapse();
}


// =========================================
// SEÇÕES RECOLHÍVEIS
// =========================================

function applySectionCollapse() {
    document.querySelectorAll("[data-section-toggle]").forEach(btn => {
        const key = btn.dataset.sectionToggle;
        const collapsed = !!state.collapsedSections[key];
        const content = document.querySelector(`[data-section="${key}"]`);

        if (content) content.classList.toggle("is-section-hidden", collapsed);
        btn.classList.toggle("is-collapsed", collapsed);
        btn.setAttribute("aria-expanded", String(!collapsed));
    });
}

document.querySelectorAll("[data-section-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
        const key = btn.dataset.sectionToggle;
        state.collapsedSections[key] = !state.collapsedSections[key];
        saveState();
        applySectionCollapse();
    });
});


// =========================================
// UTIL
// =========================================
// escapeHtml agora mora em dice.js (compartilhado)


// =========================================
// EVENTOS — TEMA
// =========================================

themeSwatches.addEventListener("click", (e) => {
    const btn = e.target.closest(".theme-swatch");
    if (!btn) return;

    state.accent = btn.dataset.theme;
    saveState();
    applyTheme();
});

themeCustomColorInput.addEventListener("input", () => {
    state.accent = "custom";
    state.accentCustomHex = themeCustomColorInput.value;
    saveState();
    applyTheme();
});


// =========================================
// EVENTOS — IDENTIDADE
// =========================================

nameInput.addEventListener("input", () => {
    state.name = nameInput.value;
    saveState();
});

antepassadoInput.addEventListener("input", () => {
    state.antepassado = antepassadoInput.value;
    saveState();
});

classeSelect.addEventListener("change", () => {
    state.classe = classeSelect.value;
    recalcVitality();
    saveState();
    renderResourceBars();
    renderDerived();
});

subclasseInput.addEventListener("input", () => {
    state.subclasse = subclasseInput.value;
    saveState();
});

poderInput.addEventListener("input", () => {
    state.poderParanormal = poderInput.value;
    saveState();
});

elementoInput.addEventListener("input", () => {
    state.elemento = elementoInput.value;
    saveState();
});

rankSelect.addEventListener("change", () => {
    state.rank = rankSelect.value;
    saveState();
    renderDerived();
});

nexSelect.addEventListener("change", () => {
    state.nex = Number(nexSelect.value) || 0;
    recalcVitality();
    saveState();
    renderResourceBars();
    renderDerived();
});


// =========================================
// EVENTOS — FOTO DO PERSONAGEM
// =========================================

portraitBox.addEventListener("click", () => {
    portraitInput.click();
});

portraitInput.addEventListener("change", () => {
    const file = portraitInput.files && portraitInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        state.portrait = reader.result;
        saveState();
        renderIdentity();
    };
    reader.readAsDataURL(file);
});


// =========================================
// EVENTOS — ATRIBUTOS (ajuste e rolagem)
// =========================================

attributesGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".attribute-card");
    if (!card) return;

    const attr = card.dataset.attr;
    const btn = e.target.closest(".attr-btn");

    if (btn) {
        const delta = btn.classList.contains("attr-plus") ? 1 : -1;
        state.attributes[attr] = (state.attributes[attr] || 0) + delta;

        recalcVitality();
        if (attr === "forca") {
            recalcCapacity();
            recalcEsquivaBloqueio();
        }

        saveState();

        renderAttributes();
        renderResourceBars();
        renderDerived();
        updateAllSkillRowDisplays();
        return;
    }

    // clique fora dos botões +/- = rolar teste do atributo
    const value = state.attributes[attr] || 0;
    performRoll(ATTRIBUTE_LABELS[attr], value);
});

attributesGrid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;

    const card = e.target.closest(".attribute-card");
    if (!card || e.target !== card) return;

    e.preventDefault();
    const attr = card.dataset.attr;
    performRoll(ATTRIBUTE_LABELS[attr], state.attributes[attr] || 0);
});


// =========================================
// EVENTOS — DEFESA / LIMITE DE PP / DT PARA PODERES
// =========================================

defenseBonusInput.addEventListener("input", () => {
    state.defenseBonus = Number(defenseBonusInput.value) || 0;
    saveState();
    renderDerived();
});

esquivaInput.addEventListener("input", () => {
    state.esquiva = Number(esquivaInput.value) || 0;
    saveState();
});

bloqueioInput.addEventListener("input", () => {
    state.bloqueio = Number(bloqueioInput.value) || 0;
    saveState();
});

descMetrosInput.addEventListener("input", () => {
    state.deslocamento.metros = Number(descMetrosInput.value) || 0;
    saveState();
});

descQuadrosInput.addEventListener("input", () => {
    state.deslocamento.quadrados = Number(descQuadrosInput.value) || 0;
    saveState();
});

pplimitMinusBtn.addEventListener("click", () => {
    state.ppLimitBonus = (Number(state.ppLimitBonus) || 0) - 1;
    saveState();
    renderDerived();
});

pplimitPlusBtn.addEventListener("click", () => {
    state.ppLimitBonus = (Number(state.ppLimitBonus) || 0) + 1;
    saveState();
    renderDerived();
});

dtpoderesMinusBtn.addEventListener("click", () => {
    state.dtPoderesBonus = (Number(state.dtPoderesBonus) || 0) - 1;
    saveState();
    renderDerived();
});

dtpoderesPlusBtn.addEventListener("click", () => {
    state.dtPoderesBonus = (Number(state.dtPoderesBonus) || 0) + 1;
    saveState();
    renderDerived();
});

dtpoderesAttrSelect.addEventListener("change", () => {
    state.dtPoderesAttr = dtpoderesAttrSelect.value;
    saveState();
    renderDerived();
});

proficienciasInput.addEventListener("input", () => {
    state.proficiencias = proficienciasInput.value;
    saveState();
});

resistenciasInput.addEventListener("input", () => {
    state.resistencias = resistenciasInput.value;
    saveState();
});


// =========================================
// EVENTOS — PERÍCIAS
// =========================================

skillsList.addEventListener("input", (e) => {
    const row = e.target.closest(".skill-row");
    if (!row) return;

    const key = row.dataset.skill;
    if (!state.skills[key]) state.skills[key] = { training: 0, other: 0, attrOverride: null };

    if (e.target.classList.contains("skill-training")) {
        state.skills[key].training = Number(e.target.value) || 0;
        if (key === "reflexos" || key === "fortitude") {
            recalcEsquivaBloqueio();
            renderDerived();
        }
    } else if (e.target.classList.contains("skill-other")) {
        state.skills[key].other = Number(e.target.value) || 0;
    } else if (e.target.classList.contains("skill-attr-select")) {
        state.skills[key].attrOverride = e.target.value;
    } else {
        return;
    }

    saveState();
    updateSkillRowDisplay(key);
});

skillsList.addEventListener("click", (e) => {
    const row = e.target.closest(".skill-row");
    if (!row) return;

    if (e.target.closest(".skill-inputs")) return;
    if (e.target.closest(".skill-attr-select")) return;

    const key = row.dataset.skill;
    const skill = SKILLS.find(s => s.key === key);
    if (!skill) return;

    const data = state.skills[key] || { training: 0, other: 0, attrOverride: null };
    const effectiveAttr = data.attrOverride || skill.attr;
    const attrValue = state.attributes[effectiveAttr] || 0;
    const total = attrValue + (Number(data.training) || 0) + (Number(data.other) || 0);

    performRoll(skill.name, total);
});


// =========================================
// EVENTOS — HABILIDADES
// =========================================

addAbilityBtn.addEventListener("click", () => {
    openEfeitoPicker("habilidade");
});

document.getElementById("collapse-all-abilities").addEventListener("click", () => {
    state.abilities.forEach(a => { a.collapsed = true; });
    saveState();
    renderAbilities();
});

document.getElementById("expand-all-abilities").addEventListener("click", () => {
    state.abilities.forEach(a => { a.collapsed = false; });
    saveState();
    renderAbilities();
});

abilitiesList.addEventListener("input", (e) => {
    const card = e.target.closest(".ability-card");
    if (!card) return;

    const index = Number(card.dataset.index);
    if (!state.abilities[index]) return;

    if (e.target.classList.contains("ability-title")) {
        state.abilities[index].title = e.target.value;
    } else if (e.target.classList.contains("ability-source")) {
        state.abilities[index].source = e.target.value;
    } else if (e.target.classList.contains("ability-desc")) {
        state.abilities[index].desc = e.target.value;
    } else if (e.target.classList.contains("ability-anotacao")) {
        state.abilities[index].anotacao = e.target.value;
    }

    saveState();
});

abilitiesList.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest(".ability-toggle");
    if (toggleBtn) {
        const card = e.target.closest(".ability-card");
        const index = Number(card.dataset.index);

        state.abilities[index].collapsed = !state.abilities[index].collapsed;
        saveState();
        renderAbilities();
        return;
    }

    const removeBtn = e.target.closest(".ability-remove");
    if (!removeBtn) return;

    const card = e.target.closest(".ability-card");
    const index = Number(card.dataset.index);

    state.abilities.splice(index, 1);
    saveState();
    renderAbilities();
});


// =========================================
// EVENTOS — PODERES
// =========================================

addPowerBtn.addEventListener("click", () => {
    openEfeitoPicker("poder");
});

document.getElementById("collapse-all-powers").addEventListener("click", () => {
    state.powers.forEach(p => { p.collapsed = true; });
    saveState();
    renderPowers();
});

document.getElementById("expand-all-powers").addEventListener("click", () => {
    state.powers.forEach(p => { p.collapsed = false; });
    saveState();
    renderPowers();
});

powersList.addEventListener("input", (e) => {
    const card = e.target.closest(".power-card");
    if (!card) return;

    const index = Number(card.dataset.index);
    if (!state.powers[index]) return;

    const fieldMap = {
        "power-title": "title",
        "power-execucao": "execucao",
        "power-alcance": "alcance",
        "power-alvo": "alvo",
        "power-duracao": "duracao",
        "power-resistencia": "resistencia",
        "power-desc": "desc"
    };

    for (const cls in fieldMap) {
        if (e.target.classList.contains(cls)) {
            state.powers[index][fieldMap[cls]] = e.target.value;
            saveState();
            return;
        }
    }

    if (e.target.classList.contains("power-anotacao")) {
        state.powers[index].anotacao = e.target.value;
        saveState();
    }
});

powersList.addEventListener("change", (e) => {
    const card = e.target.closest(".power-card");
    if (!card) return;

    const index = Number(card.dataset.index);
    if (!state.powers[index]) return;

    if (e.target.classList.contains("power-element")) {
        state.powers[index].element = e.target.value;
        saveState();
        renderPowers();
    }
});

powersList.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest(".power-toggle");
    if (toggleBtn) {
        const card = e.target.closest(".power-card");
        const index = Number(card.dataset.index);

        state.powers[index].collapsed = !state.powers[index].collapsed;
        saveState();
        renderPowers();
        return;
    }

    const removeBtn = e.target.closest(".power-remove");
    if (removeBtn) {
        const card = e.target.closest(".power-card");
        const index = Number(card.dataset.index);

        state.powers.splice(index, 1);
        saveState();
        renderPowers();
        return;
    }

    const star = e.target.closest(".power-star");
    if (star) {
        const card = e.target.closest(".power-card");
        const index = Number(card.dataset.index);
        const value = Number(star.dataset.value);

        // clicar na mesma estrela que já é o grau atual zera (permite desmarcar)
        state.powers[index].stars = state.powers[index].stars === value ? value - 1 : value;

        saveState();
        renderPowers();
    }
});


// =========================================
// EVENTOS — CARACTERÍSTICAS
// =========================================

addCharacteristicBtn.addEventListener("click", () => {
    state.characteristics.push({ title: "", type: "", desc: "" });
    saveState();
    renderCharacteristics();

    const cards = characteristicsList.querySelectorAll(".characteristic-card");
    const last = cards[cards.length - 1];
    if (last) last.querySelector(".characteristic-title").focus();
});

characteristicsList.addEventListener("input", (e) => {
    const card = e.target.closest(".characteristic-card");
    if (!card) return;

    const index = Number(card.dataset.index);
    if (!state.characteristics[index]) return;

    if (e.target.classList.contains("characteristic-title")) {
        state.characteristics[index].title = e.target.value;
    } else if (e.target.classList.contains("characteristic-desc")) {
        state.characteristics[index].desc = e.target.value;
    } else {
        return;
    }

    saveState();
});

characteristicsList.addEventListener("change", (e) => {
    const card = e.target.closest(".characteristic-card");
    if (!card) return;

    const index = Number(card.dataset.index);
    if (!state.characteristics[index]) return;

    if (e.target.classList.contains("characteristic-type")) {
        state.characteristics[index].type = e.target.value;
        saveState();
        renderCharacteristics();
    }
});

characteristicsList.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".characteristic-remove");
    if (!removeBtn) return;

    const card = e.target.closest(".characteristic-card");
    const index = Number(card.dataset.index);

    state.characteristics.splice(index, 1);
    saveState();
    renderCharacteristics();
});


// =========================================
// EVENTOS — AFINIDADES
// =========================================

if (affinitiesGrid) {
    affinitiesGrid.addEventListener("click", (e) => {
        const item = e.target.closest(".affinity-item");
        if (!item) return;

        const key = item.dataset.element;
        if (!(key in state.affinities)) return;

        if (e.target.closest(".affinity-plus")) {
            state.affinities[key] = (Number(state.affinities[key]) || 0) + 1;
        } else if (e.target.closest(".affinity-minus")) {
            state.affinities[key] = (Number(state.affinities[key]) || 0) - 1;
        } else {
            return;
        }

        saveState();
        renderAffinities();
    });
}


// =========================================
// EVENTOS — EQUIPAMENTOS
// =========================================

capacidadeInput.addEventListener("input", () => {
    state.capacidadeCarga = Number(capacidadeInput.value) || 0;
    saveState();
});

addEquipmentBtn.addEventListener("click", () => {
    state.equipment.push({ name: "", cost: 0, slots: 0 });
    saveState();
    renderEquipment();
    renderDerived();

    const rows = equipmentRows.querySelectorAll(".equipment-row");
    const last = rows[rows.length - 1];
    if (last) last.querySelector('[data-field="name"]').focus();
});

equipmentRows.addEventListener("input", (e) => {
    const row = e.target.closest(".equipment-row");
    if (!row) return;

    const index = Number(row.dataset.index);
    if (!state.equipment[index]) return;

    const field = e.target.dataset.field;
    if (!field) return;

    if (field === "slots") {
        state.equipment[index].slots = Number(e.target.value) || 0;
        updateEquipmentTotal();
    } else if (field === "cost") {
        state.equipment[index].cost = Number(e.target.value) || 0;
        renderDerived();
    } else {
        state.equipment[index][field] = e.target.value;
    }

    saveState();
});

equipmentRows.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".equipment-remove");
    if (!removeBtn) return;

    const row = e.target.closest(".equipment-row");
    const index = Number(row.dataset.index);

    state.equipment.splice(index, 1);
    saveState();
    renderEquipment();
    renderDerived();
});


// =========================================
// EVENTOS — EXTRAS
// =========================================

Object.keys(extraInputs).forEach(key => {
    extraInputs[key].addEventListener("input", () => {
        state.extras[key] = extraInputs[key].value;
        saveState();
    });
});


// =========================================
// EVENTOS — ROLAGEM DE DADOS
// =========================================

diceQuickButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const sides = btn.dataset.sides;
        rollCustomDice(`1d${sides}`);
    });
});

diceCustomRollBtn.addEventListener("click", () => {
    if (!diceCustomInput.value.trim()) return;
    rollCustomDice(diceCustomInput.value);
});

diceCustomInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    if (!diceCustomInput.value.trim()) return;
    rollCustomDice(diceCustomInput.value);
});


// =========================================
// SELETOR DE HABILIDADE/PODER (banco de dados)
// =========================================
//
// A ficha nunca copia os dados do banco pra dentro dela: guarda só
// {origem:"database", habilidadeId/poderId, anotacao}. Os dados
// completos (nome, descrição, custo...) são sempre lidos de
// habilidades-poderes-data.js na hora de renderizar.

const pickerState = { tipo: "habilidade", termo: "", filtro: "todos", view: "lista" };

function abrirEfeitoModal() {
    efeitoModalOverlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
}

function fecharEfeitoModal() {
    efeitoModalOverlay.classList.remove("is-open");
    document.body.style.overflow = "";
}

function openEfeitoPicker(tipo) {
    pickerState.tipo = tipo;
    pickerState.termo = "";
    pickerState.filtro = "todos";
    pickerState.view = "lista";
    renderEfeitoModal();
    abrirEfeitoModal();
}

function getEfeitoDb() {
    return pickerState.tipo === "habilidade" ? HABILIDADES_DB : PODERES_DB;
}

function getEfeitosFiltrados() {
    const termo = pickerState.termo.trim().toLowerCase();

    return getEfeitoDb().filter(item => {
        if (pickerState.filtro !== "todos") {
            const chaveFiltro = pickerState.tipo === "habilidade" ? item.categoria : item.elemento;
            if (chaveFiltro !== pickerState.filtro) return false;
        }

        if (termo) {
            const rotulo = pickerState.tipo === "habilidade"
                ? (HABILIDADE_CATEGORIAS[item.categoria] || "")
                : (ELEMENT_LABELS[item.elemento] || "");

            const alvo = [item.nome, item.descricao, rotulo].join(" ").toLowerCase();
            if (!alvo.includes(termo)) return false;
        }

        return true;
    });
}

function renderEfeitoModal() {
    if (pickerState.view === "preview") {
        renderEfeitoPreview();
    } else if (pickerState.view === "criar") {
        renderEfeitoCriar();
    } else {
        renderEfeitoLista();
    }
}

function renderEfeitoLista() {
    const tipo = pickerState.tipo;
    const titulo = tipo === "habilidade" ? "Adicionar Habilidade" : "Adicionar Poder";

    const filtroOptions = tipo === "habilidade"
        ? Object.entries(HABILIDADE_CATEGORIAS)
        : Object.entries(ELEMENT_LABELS).filter(([key]) => key !== "primordial");

    const filtroLabel = tipo === "habilidade" ? "Categoria" : "Elemento";

    const itens = getEfeitosFiltrados();

    // agrupa por categoria (habilidade) ou elemento (poder)
    const grupos = {};
    itens.forEach(item => {
        const chave = tipo === "habilidade" ? item.categoria : item.elemento;
        if (!grupos[chave]) grupos[chave] = [];
        grupos[chave].push(item);
    });

    const gruposHtml = Object.keys(grupos).length === 0
        ? `<p class="empty-state">Nenhum item encontrado com esses filtros.</p>`
        : Object.entries(grupos).map(([chave, lista]) => `
            <div class="efeito-grupo">
                <p class="efeito-grupo-titulo">${escapeHtml(tipo === "habilidade" ? (HABILIDADE_CATEGORIAS[chave] || chave) : (ELEMENT_LABELS[chave] || chave))}</p>
                <div class="efeito-picker-list">
                    ${lista.map(item => `
                        <button type="button" class="efeito-picker-item" data-id="${item.id}">
                            <span>${escapeHtml(item.nome)}</span>
                            ${item.isExample ? `<span class="efeito-badge efeito-badge-exemplo">Exemplo</span>` : ""}
                        </button>
                    `).join("")}
                </div>
            </div>
        `).join("");

    efeitoModalContent.innerHTML = `
        <p class="section-label">${tipo === "habilidade" ? "HABILIDADES" : "PODERES"}</p>
        <h2 style="font-family:'Cinzel',serif; font-size:28px; margin-bottom:25px;">${titulo}</h2>

        <div class="efeito-picker-controls">
            <input type="text" id="efeito-search" class="efeito-search-input" placeholder="Pesquisar por nome ou descrição..." value="${escapeHtml(pickerState.termo)}">

            <select id="efeito-filtro">
                <option value="todos">${filtroLabel}: Todos</option>
                ${filtroOptions.map(([key, label]) => `<option value="${key}" ${pickerState.filtro === key ? "selected" : ""}>${escapeHtml(label)}</option>`).join("")}
            </select>
        </div>

        <div class="efeito-picker-groups">
            ${gruposHtml}
        </div>

        <div class="efeito-picker-footer">
            <button type="button" class="secondary-button" id="efeito-criar-btn">
                + Criar ${tipo === "habilidade" ? "habilidade" : "poder"} personalizado
            </button>
        </div>
    `;

    document.getElementById("efeito-search").addEventListener("input", (e) => {
        pickerState.termo = e.target.value;
        renderEfeitoLista();
    });
    document.getElementById("efeito-search").focus();
    // devolve o cursor pro fim do texto já digitado
    const searchEl = document.getElementById("efeito-search");
    searchEl.setSelectionRange(searchEl.value.length, searchEl.value.length);

    document.getElementById("efeito-filtro").addEventListener("change", (e) => {
        pickerState.filtro = e.target.value;
        renderEfeitoLista();
    });

    efeitoModalContent.querySelectorAll(".efeito-picker-item").forEach(btn => {
        btn.addEventListener("click", () => {
            pickerState.view = "preview";
            pickerState.previewId = btn.dataset.id;
            renderEfeitoModal();
        });
    });

    document.getElementById("efeito-criar-btn").addEventListener("click", () => {
        pickerState.view = "criar";
        renderEfeitoModal();
    });
}

function renderEfeitoPreview() {
    const item = getEfeitoPorId(pickerState.previewId);
    const tipo = pickerState.tipo;

    if (!item) {
        pickerState.view = "lista";
        renderEfeitoModal();
        return;
    }

    const rotulo = tipo === "habilidade"
        ? (HABILIDADE_CATEGORIAS[item.categoria] || item.categoria)
        : (ELEMENT_LABELS[item.elemento] || item.elemento);

    efeitoModalContent.innerHTML = `
        <button type="button" class="ghost-button" id="efeito-voltar-btn" style="margin-bottom:25px;">← Voltar</button>

        <div class="efeito-preview">
            <div class="efeito-db-title" style="margin-bottom:10px;">
                <span class="efeito-badge efeito-badge-sistema">Sistema</span>
                ${item.isExample ? `<span class="efeito-badge efeito-badge-exemplo">Exemplo</span>` : ""}
            </div>
            <h2 style="font-family:'Cinzel',serif; font-size:26px; margin-bottom:6px;">${escapeHtml(item.nome)}</h2>
            <p class="efeito-db-meta" style="margin-bottom:20px;">${escapeHtml(rotulo)}</p>

            <p style="color:#bbb; font-size:14px; line-height:1.7; margin-bottom:18px;">${escapeHtml(item.descricao || "")}</p>
            <p class="efeito-db-submeta">Requisitos: ${escapeHtml(item.requisitos || "—")} · Custo: ${escapeHtml(item.custo || "—")}</p>
        </div>

        <div class="efeito-picker-footer">
            <button type="button" class="primary-button" id="efeito-adicionar-btn">Adicionar à ficha</button>
        </div>
    `;

    document.getElementById("efeito-voltar-btn").addEventListener("click", () => {
        pickerState.view = "lista";
        renderEfeitoModal();
    });

    document.getElementById("efeito-adicionar-btn").addEventListener("click", () => {
        if (tipo === "habilidade") {
            state.abilities.push({ origem: "database", habilidadeId: item.id, anotacao: "", collapsed: false });
            saveState();
            renderAbilities();
        } else {
            state.powers.push({ origem: "database", poderId: item.id, stars: 0, anotacao: "", collapsed: false });
            saveState();
            renderPowers();
        }
        fecharEfeitoModal();
    });
}

function renderEfeitoCriar() {
    const tipo = pickerState.tipo;

    efeitoModalContent.innerHTML = `
        <button type="button" class="ghost-button" id="efeito-voltar-btn" style="margin-bottom:25px;">← Voltar</button>

        <p class="section-label">${tipo === "habilidade" ? "HABILIDADE" : "PODER"} PERSONALIZADA</p>
        <h2 style="font-family:'Cinzel',serif; font-size:26px; margin-bottom:15px;">Criar ${tipo === "habilidade" ? "habilidade" : "poder"} personalizado</h2>

        <p class="sheet-block-hint" style="margin-bottom:20px;">
            Só o nome é obrigatório aqui — depois de criar, o card já aparece na ficha pronto pra você preencher descrição${tipo === "poder" ? ", elemento, execução e o resto" : " e fonte"} direto ali.
        </p>

        <label class="field-group" style="max-width:none; margin-bottom:25px;">
            <span style="font-size:11px; text-transform:uppercase; letter-spacing:2px; color:#777;">Nome</span>
            <input type="text" id="efeito-custom-nome" placeholder="Nome ${tipo === "habilidade" ? "da habilidade" : "do poder"}">
        </label>

        <div class="efeito-picker-footer">
            <button type="button" class="primary-button" id="efeito-custom-adicionar-btn">Adicionar à ficha</button>
        </div>
    `;

    document.getElementById("efeito-voltar-btn").addEventListener("click", () => {
        pickerState.view = "lista";
        renderEfeitoModal();
    });

    const nomeInput = document.getElementById("efeito-custom-nome");
    nomeInput.focus();

    function confirmarCriacao() {
        const nome = nomeInput.value.trim();
        if (!nome) {
            nomeInput.focus();
            return;
        }

        if (tipo === "habilidade") {
            state.abilities.push({ title: nome, source: "", desc: "", collapsed: false });
            saveState();
            renderAbilities();
        } else {
            state.powers.push({
                title: nome, stars: 0, element: "",
                execucao: "", alcance: "", alvo: "", duracao: "", resistencia: "",
                desc: "", collapsed: false
            });
            saveState();
            renderPowers();
        }
        fecharEfeitoModal();
    }

    document.getElementById("efeito-custom-adicionar-btn").addEventListener("click", confirmarCriacao);
    nomeInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") confirmarCriacao();
    });
}

efeitoModalClose.addEventListener("click", fecharEfeitoModal);

efeitoModalOverlay.addEventListener("click", (e) => {
    if (e.target === efeitoModalOverlay) fecharEfeitoModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && efeitoModalOverlay.classList.contains("is-open")) {
        fecharEfeitoModal();
    }
});


// =========================================
// EVENTOS — REINICIAR FICHA
// =========================================

resetBtn.addEventListener("click", () => {
    const confirmed = window.confirm(
        "Isso vai apagar todos os dados desta ficha. Deseja continuar?"
    );

    if (!confirmed) return;

    state = defaultState();
    saveState();

    resourceBars.dataset.built = "";
    nexSelect.dataset.built = "";

    renderAll();
});


// =========================================
// EVENTOS — EXPORTAR / IMPORTAR FICHA
// =========================================

exportBtn.addEventListener("click", () => {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const fileName = (state.name || "ficha").trim().replace(/[^\w\-]+/g, "_").toLowerCase() || "ficha";

    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
});

importBtn.addEventListener("click", () => {
    importFileInput.click();
});

importFileInput.addEventListener("change", () => {
    const file = importFileInput.files && importFileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        try {
            const parsed = JSON.parse(reader.result);
            const base = defaultState();

            state = {
                ...base,
                ...parsed,
                attributes: { ...base.attributes, ...(parsed.attributes || {}) },
                pv: { ...base.pv, ...(parsed.pv || {}) },
                pp: { ...base.pp, ...(parsed.pp || {}) },
                sanidade: { ...base.sanidade, ...(parsed.sanidade || {}) },
                deslocamento: { ...base.deslocamento, ...(parsed.deslocamento || {}) },
                skills: { ...base.skills, ...(parsed.skills || {}) },
                extras: { ...base.extras, ...(parsed.extras || {}) },
                collapsedSections: { ...base.collapsedSections, ...(parsed.collapsedSections || {}) },
                affinities: { ...base.affinities, ...(parsed.affinities || {}) },
                abilities: Array.isArray(parsed.abilities) ? parsed.abilities : [],
                powers: Array.isArray(parsed.powers) ? parsed.powers : [],
                characteristics: Array.isArray(parsed.characteristics) ? parsed.characteristics : [],
                equipment: Array.isArray(parsed.equipment) ? parsed.equipment : []
            };

            saveState();

            resourceBars.dataset.built = "";
            nexSelect.dataset.built = "";

            renderAll();
        } catch (err) {
            mountToast(`
                <div class="roll-toast-title">Importação falhou</div>
                <div class="roll-toast-error">O arquivo selecionado não é uma ficha válida.</div>
            `, true);
        }

        importFileInput.value = "";
    };
    reader.readAsText(file);
});


// =========================================
// INICIALIZAÇÃO
// =========================================

renderAll();
