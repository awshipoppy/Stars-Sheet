// =========================================
// BESTIARIO.JS
// =========================================
//
// Reaproveita: dice.js (rolagens e pop-up), elementos.js (nomes/cores de
// elemento), e os estilos .attribute-card / .resource-bar-* / .ability-card
// / .secondary-button / .primary-button já definidos em ficha.css/style.css.

const BESTIARIO_STATE_KEY = "reino-alem-bestiario-estado";
const COMBATE_KEY = "reino-alem-combate";

const ATTRIBUTES = ["forca", "destreza", "constituicao", "poder", "inteligencia", "sabedoria", "carisma"];
const ATTRIBUTE_LABELS = {
    forca: "Força", destreza: "Destreza", constituicao: "Constituição",
    poder: "Poder", inteligencia: "Inteligência", sabedoria: "Sabedoria", carisma: "Carisma"
};
const ATTRIBUTE_COLORS = {
    forca: "#c0392b", destreza: "#3d7dc9", constituicao: "#d97a3d",
    poder: "#d9c23d", inteligencia: "#3dbf6b", sabedoria: "#3dc7c9", carisma: "#9b3dc9"
};


// =========================================
// ESTADO POR AMEAÇA (PV atual) — separado do banco de dados
// =========================================

function loadBestiarioState() {
    try {
        return JSON.parse(localStorage.getItem(BESTIARIO_STATE_KEY)) || {};
    } catch (e) {
        return {};
    }
}

function saveBestiarioState(state) {
    try {
        localStorage.setItem(BESTIARIO_STATE_KEY, JSON.stringify(state));
    } catch (e) {
        // armazenamento indisponível — segue funcionando só nesta sessão
    }
}

function getPvAtual(monstro) {
    const state = loadBestiarioState();
    const entry = state[monstro.id];
    return entry && typeof entry.pvAtual === "number" ? entry.pvAtual : monstro.pv;
}

function setPvAtual(monstroId, valor) {
    const state = loadBestiarioState();
    if (!state[monstroId]) state[monstroId] = {};
    state[monstroId].pvAtual = valor;
    saveBestiarioState(state);
}

// Campos de texto editáveis (Imunidades, Resistências, Vulnerabilidades,
// outros sentidos) — o valor de partida vem do banco de dados, mas o
// mestre pode ajustar durante a sessão; o ajuste fica salvo por ameaça.
function getCampoTexto(monstro, campo, valorPadraoExtra) {
    const state = loadBestiarioState();
    const entry = state[monstro.id];
    if (entry && typeof entry[campo] === "string") return entry[campo];
    if (typeof monstro[campo] === "string") return monstro[campo];
    return valorPadraoExtra || "";
}

function setCampoTexto(monstroId, campo, valor) {
    const state = loadBestiarioState();
    if (!state[monstroId]) state[monstroId] = {};
    state[monstroId][campo] = valor;
    saveBestiarioState(state);
}


// =========================================
// ELEMENTOS — refs e filtros
// =========================================

const searchInput = document.getElementById("ameaca-search");
const categoriaFilters = document.getElementById("categoria-filters");
const elementoFilter = document.getElementById("elemento-filter");
const vdFilter = document.getElementById("vd-filter");
const ameacasGrid = document.getElementById("ameacas-grid");
const ameacasEmpty = document.getElementById("ameacas-empty");

const modalOverlay = document.getElementById("ameaca-modal-overlay");
const modalContent = document.getElementById("ameaca-modal-content");
const modalCloseBtn = document.getElementById("ameaca-modal-close");

let filtroCategoria = "todos";

function popularSelects() {
    Object.keys(ELEMENT_LABELS).forEach(key => {
        if (key === "primordial" && !AMEACAS.some(a => a.elemento === "primordial")) return;
        const opt = document.createElement("option");
        opt.value = key;
        opt.textContent = ELEMENT_LABELS[key];
        elementoFilter.appendChild(opt);
    });

    VD_TIERS.forEach(tier => {
        const opt = document.createElement("option");
        opt.value = tier.key;
        opt.textContent = tier.label;
        vdFilter.appendChild(opt);
    });
}


// =========================================
// FILTRAGEM E BUSCA
// =========================================

function getFiltered() {
    const termo = searchInput.value.trim().toLowerCase();
    const elemento = elementoFilter.value;
    const vdTier = vdFilter.value;

    return AMEACAS.filter(ameaca => {
        if (filtroCategoria !== "todos" && ameaca.categoria !== filtroCategoria) return false;
        if (elemento !== "todos" && ameaca.elemento !== elemento) return false;
        if (vdTier !== "todos" && getVdTier(ameaca.vd).key !== vdTier) return false;

        if (termo) {
            const alvo = [
                ameaca.nome,
                ELEMENT_LABELS[ameaca.elemento] || "",
                CATEGORIA_LABELS[ameaca.categoria] || "",
                ameaca.tipo || "",
                String(ameaca.vd)
            ].join(" ").toLowerCase();

            if (!alvo.includes(termo)) return false;
        }

        return true;
    });
}


// =========================================
// RENDER — LISTA DE CARDS
// =========================================

function elementoIconSrc(key) {
    if (key === "primordial") return null;
    return `assets/elemento-${key}.png`;
}

function renderGrid() {
    const lista = getFiltered();

    ameacasGrid.innerHTML = "";
    ameacasEmpty.style.display = lista.length === 0 ? "block" : "none";

    lista.forEach(ameaca => {
        const card = document.createElement("article");
        card.className = "monster-card ameaca-card";
        card.dataset.id = ameaca.id;

        const catColor = CATEGORIA_COLORS[ameaca.categoria] || "#888";
        const iconSrc = elementoIconSrc(ameaca.elemento);
        const iconHtml = iconSrc
            ? `<img src="${iconSrc}" alt="${escapeHtml(ELEMENT_LABELS[ameaca.elemento] || "")}" class="ameaca-symbol-img">`
            : "✦";

        card.innerHTML = `
            <div class="ameaca-card-top">
                <div class="monster-symbol" style="border-color:${catColor}55;">
                    ${iconHtml}
                </div>
                <div class="ameaca-card-title">
                    <span class="danger" style="color:${catColor};">
                        VD ${ameaca.vd} · ${escapeHtml(CATEGORIA_LABELS[ameaca.categoria] || "")}
                    </span>
                    <h3>${escapeHtml(ameaca.nome)}</h3>
                    <span class="ameaca-card-meta">${escapeHtml(ameaca.tipo || "")} · ${escapeHtml(ELEMENT_LABELS[ameaca.elemento] || "")}</span>
                </div>
            </div>

            <p class="ameaca-card-desc">${escapeHtml(ameaca.descricao || "")}</p>

            <button type="button" class="secondary-button ver-ficha-btn" data-id="${ameaca.id}">
                Ver ficha
            </button>
        `;

        ameacasGrid.appendChild(card);
    });
}


// =========================================
// RENDER — FICHA INDIVIDUAL (MODAL)
// =========================================

// Um campo de texto simples (imunidades/resistencias/vulnerabilidades) só
// existe na ficha se o banco de dados o definiu (mesmo que como ""); um
// campo aninhado (ex: sentidos.outros) usa valorPadraoExtra para checar o
// valor original guardado em outro lugar do objeto.
function campoTextoDefinido(ameaca, campo, valorPadraoExtra) {
    const state = loadBestiarioState();
    const entry = state[ameaca.id];
    if (entry && typeof entry[campo] === "string") return true;
    if (typeof ameaca[campo] === "string") return true;
    return typeof valorPadraoExtra === "string";
}

function renderAmeacaSheet(ameaca) {
    const pvAtual = getPvAtual(ameaca);
    const pct = ameaca.pv > 0 ? Math.max(0, Math.min(100, (pvAtual / ameaca.pv) * 100)) : 0;
    const catColor = CATEGORIA_COLORS[ameaca.categoria] || "#888";
    const elementoColor = getElementColor(ameaca.elemento);
    const iconSrc = elementoIconSrc(ameaca.elemento);

    const teste = ameaca.testesResistencia || {};
    const sentidos = ameaca.sentidos || {};

    // -------- tags do cabeçalho (elemento principal + complementares + tamanho) --------

    const complementaresTags = (ameaca.elementosComplementares || [])
        .map(key => `<span class="ameaca-tag ameaca-tag-elemento" style="border-color:${getElementColor(key)}; color:${getElementColor(key)};">+ ${escapeHtml(ELEMENT_LABELS[key] || key)}</span>`)
        .join("");

    const tagsHtml = `
        <span class="ameaca-tag" style="border-color:${catColor}; color:${catColor};">VD ${ameaca.vd}</span>
        <span class="ameaca-tag" style="border-color:${catColor}; color:${catColor};">${escapeHtml(CATEGORIA_LABELS[ameaca.categoria] || "")}</span>
        <span class="ameaca-tag ameaca-tag-elemento" style="border-color:${elementoColor}; color:${elementoColor};">${escapeHtml(ELEMENT_LABELS[ameaca.elemento] || "")}</span>
        ${complementaresTags}
        ${ameaca.tipo ? `<span class="ameaca-tag">${escapeHtml(ameaca.tipo)}</span>` : ""}
        ${ameaca.tamanho ? `<span class="ameaca-tag">${escapeHtml(ameaca.tamanho)}</span>` : ""}
    `;

    // -------- Presença Caótica (opcional, acima do Status) --------

    const pc = ameaca.presencaCaotica;
    const presencaCaoticaHtml = pc ? `
        <div class="ameaca-sheet-section">
            <p class="ameaca-sheet-section-title">Presença Caótica</p>
            <div class="ameaca-presenca-grid">
                ${typeof pc.dt === "number" ? `
                    <div class="derived-stat">
                        <span class="derived-label">DT</span>
                        <span class="derived-value ameaca-substat-value">${pc.dt}</span>
                    </div>
                ` : ""}
                ${pc.danoMental ? `
                    <div class="derived-stat">
                        <span class="derived-label">Dano Mental</span>
                        <span class="derived-value ameaca-substat-value">${escapeHtml(pc.danoMental)}</span>
                    </div>
                ` : ""}
                ${typeof pc.nexIgnorar === "number" ? `
                    <div class="derived-stat">
                        <span class="derived-label">Ignora a partir de</span>
                        <span class="derived-value ameaca-substat-value">NEX ${pc.nexIgnorar}%</span>
                    </div>
                ` : ""}
            </div>
        </div>
    ` : "";

    // -------- textos livres (Imunidades / Resistências / Vulnerabilidades) --------

    const camposTexto = ["imunidades", "resistencias", "vulnerabilidades"]
        .filter(campo => campoTextoDefinido(ameaca, campo))
        .map(campo => `
            <label>${campo.charAt(0).toUpperCase() + campo.slice(1)}
                <input type="text" class="ameaca-text-field" data-campo="${campo}" value="${escapeHtml(getCampoTexto(ameaca, campo))}">
            </label>
        `).join("");

    // -------- Deslocamento + testes de resistência (só o que existir) --------

    const substatsPecas = [];
    if (ameaca.deslocamento) {
        substatsPecas.push(`
            <div class="derived-stat">
                <span class="derived-label">Deslocamento</span>
                <span class="derived-value ameaca-substat-value">${escapeHtml(ameaca.deslocamento)}</span>
            </div>
        `);
    }
    [["fortitude", "Fortitude"], ["reflexos", "Reflexos"], ["vontade", "Vontade"]].forEach(([key, label]) => {
        if (typeof teste[key] !== "number") return;
        substatsPecas.push(`
            <button type="button" class="derived-stat ameaca-save-btn" data-save="${key}" data-bonus="${teste[key]}">
                <span class="derived-label">${label}</span>
                <span class="derived-value ameaca-substat-value">${teste[key] >= 0 ? "+" : ""}${teste[key]}</span>
            </button>
        `);
    });

    // -------- Sentidos (só se houver algo pra mostrar) --------

    const temOutrosSentidos = campoTextoDefinido(ameaca, "sentidosOutros", sentidos.outros);
    const temSentidos = typeof sentidos.iniciativa === "number" || typeof sentidos.percepcao === "number" || temOutrosSentidos;

    const sentidosHtml = temSentidos ? `
        <div class="ameaca-senses-card">
            <span class="derived-label">Sentidos</span>

            ${(typeof sentidos.iniciativa === "number" || typeof sentidos.percepcao === "number") ? `
                <div class="ameaca-senses-row">
                    ${typeof sentidos.iniciativa === "number" ? `
                        <button type="button" class="ameaca-sense-btn" data-save="iniciativa" data-bonus="${sentidos.iniciativa}">
                            Iniciativa ${sentidos.iniciativa >= 0 ? "+" : ""}${sentidos.iniciativa}
                        </button>
                    ` : ""}
                    ${typeof sentidos.percepcao === "number" ? `
                        <button type="button" class="ameaca-sense-btn" data-save="percepcao" data-bonus="${sentidos.percepcao}">
                            Percepção ${sentidos.percepcao >= 0 ? "+" : ""}${sentidos.percepcao}
                        </button>
                    ` : ""}
                </div>
            ` : ""}

            ${temOutrosSentidos ? `
                <label class="ameaca-senses-other">Outros sentidos
                    <input type="text" class="ameaca-text-field" data-campo="sentidosOutros" value="${escapeHtml(getCampoTexto(ameaca, "sentidosOutros", sentidos.outros))}">
                </label>
            ` : ""}
        </div>
    ` : "";

    // -------- Perícias (pastilhas clicáveis, só se houver alguma) --------

    const periciasHtml = (ameaca.pericias && ameaca.pericias.length > 0) ? `
        <div class="ameaca-pericias-card">
            <span class="derived-label">Perícias</span>
            <div class="ameaca-senses-row">
                ${ameaca.pericias.map((p, i) => `
                    <button type="button" class="ameaca-sense-btn ameaca-pericia-btn" data-index="${i}">
                        ${escapeHtml(p.nome)} ${p.bonus >= 0 ? "+" : ""}${p.bonus}
                    </button>
                `).join("")}
            </div>
        </div>
    ` : "";

    // -------- Atributos --------

    const atributosHtml = ATTRIBUTES.map(attr => {
        const value = ameaca.atributos[attr] || 0;
        return `
            <div class="attribute-card" style="--attr-color:${ATTRIBUTE_COLORS[attr]}">
                <span class="attribute-label">${ATTRIBUTE_LABELS[attr]}</span>
                <span class="attribute-value${value < 0 ? " negative" : ""}">${value}</span>
            </div>
        `;
    }).join("");

    // -------- Ações (só a seção se houver alguma) --------

    const acoesHtml = (ameaca.acoes || []).map((acao, i) => {
        const temAtaque = typeof acao.bonus === "number";
        const temDano = !!acao.dano;

        const stats = [
            temAtaque ? `Ataque: ${acao.bonus >= 0 ? "+" : ""}${acao.bonus}` : null,
            temDano ? `Dano: ${escapeHtml(acao.dano)}` : null
        ].filter(Boolean).join(" · ");

        const botoes = (temAtaque || temDano) ? `
            <div class="attack-card-buttons">
                ${temAtaque ? `<button type="button" class="secondary-button attack-roll-btn" data-index="${i}">Rolar ataque</button>` : ""}
                ${temDano ? `<button type="button" class="secondary-button damage-roll-btn" data-index="${i}">Rolar dano</button>` : ""}
            </div>
        ` : "";

        return `
            <div class="attack-card">
                <div class="attack-card-top">
                    <h4>${escapeHtml(acao.nome)}</h4>
                    ${stats ? `<span class="attack-stats">${stats}</span>` : ""}
                </div>
                ${acao.descricao ? `<p class="attack-card-desc">${escapeHtml(acao.descricao)}</p>` : ""}
                ${botoes}
            </div>
        `;
    }).join("");

    const acoesSectionHtml = acoesHtml ? `
        <div class="ameaca-sheet-section">
            <p class="ameaca-sheet-section-title">Ações</p>
            <div class="ameaca-attacks-list">${acoesHtml}</div>
        </div>
    ` : "";

    // -------- Habilidades (só a seção se houver alguma) --------

    const habilidadesHtml = (ameaca.habilidades || []).map(hab => `
        <div class="ability-card">
            <h4 style="font-family:'Cinzel',serif; font-size:17px; margin-bottom:10px;">${escapeHtml(hab.nome)}</h4>
            <p style="color:#999; font-size:14px; line-height:1.7;">${escapeHtml(hab.descricao || "")}</p>
        </div>
    `).join("");

    const habilidadesSectionHtml = habilidadesHtml ? `
        <div class="ameaca-sheet-section">
            <p class="ameaca-sheet-section-title">Habilidades</p>
            <div class="ameaca-abilities-list">${habilidadesHtml}</div>
        </div>
    ` : "";

    modalContent.innerHTML = `
        <div class="ameaca-sheet-header">
            <div class="ameaca-sheet-title">
                ${iconSrc ? `<img src="${iconSrc}" alt="" class="ameaca-sheet-icon">` : ""}
                <h2>${escapeHtml(ameaca.nome)}</h2>
            </div>

            <div class="ameaca-sheet-tags">${tagsHtml}</div>

            <p class="ameaca-sheet-desc">${escapeHtml(ameaca.descricao || "")}</p>
        </div>

        ${presencaCaoticaHtml}

        <div class="ameaca-sheet-section">
            <p class="ameaca-sheet-section-title">Status</p>

            <div class="ameaca-status-grid">

                <div class="resource-bar-card pv-card">
                    <div class="resource-bar-top">
                        <span class="resource-bar-label">Pontos de Vida</span>
                        <div class="resource-bar-inputs">
                            <input type="number" id="ameaca-pv-current" value="${pvAtual}">
                            <span>/</span>
                            <span>${ameaca.pv}</span>
                        </div>
                    </div>
                    <div class="resource-bar-track">
                        <div class="resource-bar-fill pv-fill" id="ameaca-pv-fill" style="width:${pct}%;"></div>
                    </div>
                </div>

                <div class="derived-stat defense-stat">
                    <span class="derived-label">Defesa</span>
                    <span class="derived-value">${ameaca.defesa}</span>
                </div>

            </div>

            ${camposTexto ? `<div class="ameaca-text-fields-grid">${camposTexto}</div>` : ""}

            ${substatsPecas.length > 0 ? `<div class="ameaca-substats-grid">${substatsPecas.join("")}</div>` : ""}

            ${sentidosHtml}
            ${periciasHtml}

            <div class="ameaca-attributes-row">
                ${atributosHtml}
            </div>
        </div>

        ${acoesSectionHtml}
        ${habilidadesSectionHtml}

        <div class="ameaca-sheet-actions">
            <button type="button" class="primary-button" id="add-to-combat-btn">
                + Adicionar ao combate
            </button>
        </div>
    `;

    // -------- brilho da ficha na cor do elemento --------

    document.getElementById("ameaca-modal").style.setProperty("--elemento-glow", elementoColor);

    // -------- eventos da ficha aberta --------

    const pvInput = document.getElementById("ameaca-pv-current");
    const pvFill = document.getElementById("ameaca-pv-fill");

    pvInput.addEventListener("input", () => {
        const valor = Number(pvInput.value) || 0;
        setPvAtual(ameaca.id, valor);

        const pct2 = ameaca.pv > 0 ? Math.max(0, Math.min(100, (valor / ameaca.pv) * 100)) : 0;
        pvFill.style.width = pct2 + "%";
    });

    modalContent.querySelectorAll(".ameaca-text-field").forEach(input => {
        input.addEventListener("input", () => {
            setCampoTexto(ameaca.id, input.dataset.campo, input.value);
        });
    });

    modalContent.querySelectorAll(".attack-roll-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const acao = ameaca.acoes[Number(btn.dataset.index)];
            if (!acao) return;
            // testes de ataque seguem a mesma base do sistema: 1d10 + bônus
            performRoll(`${ameaca.nome} — ${acao.nome} (ataque)`, acao.bonus);
        });
    });

    modalContent.querySelectorAll(".damage-roll-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const acao = ameaca.acoes[Number(btn.dataset.index)];
            if (!acao) return;
            rollCustomDice(acao.dano, `${ameaca.nome} — ${acao.nome} (dano)`);
        });
    });

    modalContent.querySelectorAll(".ameaca-save-btn, .ameaca-sense-btn:not(.ameaca-pericia-btn)").forEach(btn => {
        btn.addEventListener("click", () => {
            const nomes = { fortitude: "Fortitude", reflexos: "Reflexos", vontade: "Vontade", iniciativa: "Iniciativa", percepcao: "Percepção" };
            const chave = btn.dataset.save;
            performRoll(`${ameaca.nome} — ${nomes[chave] || chave}`, Number(btn.dataset.bonus) || 0);
        });
    });

    modalContent.querySelectorAll(".ameaca-pericia-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const pericia = ameaca.pericias[Number(btn.dataset.index)];
            if (!pericia) return;
            performRoll(`${ameaca.nome} — ${pericia.nome}`, Number(pericia.bonus) || 0);
        });
    });

    document.getElementById("add-to-combat-btn").addEventListener("click", () => {
        adicionarAoCombate(ameaca);
    });
}

function openAmeacaModal(id) {
    const ameaca = AMEACAS.find(a => a.id === id);
    if (!ameaca) return;

    renderAmeacaSheet(ameaca);
    modalOverlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
}

function closeAmeacaModal() {
    modalOverlay.classList.remove("is-open");
    document.body.style.overflow = "";
}


// =========================================
// COMBATE — estrutura inicial (Fase 4)
// =========================================
//
// Apenas a infraestrutura de dados por enquanto: guarda os combatentes
// num localStorage próprio, pronto para um futuro painel de combate ler
// e exibir. Nenhuma UI de combate ainda.

function loadCombate() {
    try {
        return JSON.parse(localStorage.getItem(COMBATE_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function saveCombate(lista) {
    try {
        localStorage.setItem(COMBATE_KEY, JSON.stringify(lista));
    } catch (e) {
        // armazenamento indisponível
    }
}

function adicionarAoCombate(ameaca) {
    const combate = loadCombate();

    combate.push({
        id: `${ameaca.id}-${Date.now()}`,
        refId: ameaca.id,
        tipo: "ameaca",
        nome: ameaca.nome,
        pvAtual: getPvAtual(ameaca),
        pvMax: ameaca.pv,
        defesa: ameaca.defesa
    });

    saveCombate(combate);

    mountToast(`
        <div class="roll-toast-title">Adicionado ao combate</div>
        <div class="roll-toast-dice">${escapeHtml(ameaca.nome)} entrou na lista de combatentes.</div>
    `);
}


// =========================================
// EVENTOS
// =========================================

searchInput.addEventListener("input", renderGrid);
elementoFilter.addEventListener("change", renderGrid);
vdFilter.addEventListener("change", renderGrid);

categoriaFilters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-pill");
    if (!btn) return;

    filtroCategoria = btn.dataset.categoria;

    categoriaFilters.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");

    renderGrid();
});

ameacasGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".ver-ficha-btn");
    if (!btn) return;
    openAmeacaModal(btn.dataset.id);
});

modalCloseBtn.addEventListener("click", closeAmeacaModal);

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeAmeacaModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("is-open")) {
        closeAmeacaModal();
    }
});


// =========================================
// INICIALIZAÇÃO
// =========================================

popularSelects();
renderGrid();
