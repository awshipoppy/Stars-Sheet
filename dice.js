// =========================================
// DICE.JS — motor de rolagem compartilhado
// =========================================
//
// Usado tanto pela ficha de personagem (ficha.js) quanto pelo
// bestiário de ameaças (bestiario.js). Qualquer página que use este
// arquivo precisa ter um elemento:
//   <div class="roll-toast-container" id="roll-toast-container"></div>
// em algum lugar do HTML, e incluir ficha.css ou bestiario.css (ambos
// compartilham as classes .roll-toast*).

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

function rollD10() {
    return Math.floor(Math.random() * 10) + 1;
}

// Rolagem simples de "1d10 + bônus", usada pelos testes de atributo/perícia
// da ficha e pode ser reaproveitada por qualquer teste rápido de ameaças.
function performRoll(label, bonus) {
    const die = rollD10();
    const total = die + bonus;
    showRollToast(label, die, bonus, total);
}

function showRollToast(label, die, bonus, total) {
    const bonusText = bonus === 0 ? "" : (bonus > 0 ? ` + ${bonus}` : ` − ${Math.abs(bonus)}`);

    mountToast(`
        <div class="roll-toast-title">${escapeHtml(label)}</div>
        <div class="roll-toast-dice">1d10: ${die}${escapeHtml(bonusText)}</div>
        <div class="roll-toast-total">Total: <strong>${total}</strong></div>
    `);
}

function mountToast(innerHtml, isError) {
    const container = document.getElementById("roll-toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "roll-toast" + (isError ? " is-error" : "");
    toast.innerHTML = innerHtml;

    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.add("hide");
        setTimeout(() => toast.remove(), 350);
    }, 10000);
}


// =========================================
// ROLAGEM CUSTOMIZADA (NdM, NdM+K, NdMdX...)
// =========================================

// Aceita expressões com vários termos somados/subtraídos, cada um sendo um
// dado (NdM ou NdMdX, que descarta os X piores) ou um número fixo.
// Ex: "1d10", "1d12 + 5", "3d8d2", "2d8+4", "1d8 + 1d10 + 2d4d1 + 5 - 2"
function parseDiceExpression(raw) {
    const normalized = String(raw).replace(/\s+/g, "");
    if (!normalized) return null;

    const termRegex = /([+-]?)(\d*d\d+(?:d\d+)?|\d+)/gi;
    const terms = [];
    let lastIndex = 0;
    let match;

    while ((match = termRegex.exec(normalized)) !== null) {
        if (match.index !== lastIndex) return null; // caractere inesperado entre os termos
        lastIndex = termRegex.lastIndex;

        const sign = match[1] === "-" ? -1 : 1;
        const parsedTerm = parseDiceTerm(match[2], sign);
        if (!parsedTerm) return null;

        terms.push(parsedTerm);
    }

    if (lastIndex !== normalized.length || terms.length === 0) return null;

    return terms;
}

function parseDiceTerm(body, sign) {
    const diceMatch = body.match(/^(\d*)d(\d+)(?:d(\d+))?$/i);

    if (diceMatch) {
        const count = diceMatch[1] ? parseInt(diceMatch[1], 10) : 1;
        const sides = parseInt(diceMatch[2], 10);
        const drop = diceMatch[3] ? parseInt(diceMatch[3], 10) : 0;

        if (count < 1 || count > 100) return null;
        if (sides < 2 || sides > 1000) return null;
        if (drop < 0 || drop >= count) return null; // sempre precisa sobrar ao menos 1 dado

        return { type: "dice", sign, count, sides, drop };
    }

    if (/^\d+$/.test(body)) {
        return { type: "flat", sign, value: parseInt(body, 10) };
    }

    return null;
}

// Rola uma expressão em texto e já mostra o pop-up com o resultado.
// label (opcional): título mostrado no toast. Se omitido, usa a própria notação.
function rollCustomDice(raw, label) {
    const notation = String(raw).trim();
    const terms = parseDiceExpression(notation);

    if (!terms) {
        mountToast(`
            <div class="roll-toast-title">Rolagem inválida</div>
            <div class="roll-toast-error">"${escapeHtml(notation)}" não é uma notação reconhecida. Use algo como 1d10, 1d12 + 5 ou 1d8 + 2d4d1 - 2.</div>
        `, true);
        return null;
    }

    let total = 0;
    const pieces = [];

    terms.forEach((term, index) => {
        let piece;

        if (term.type === "dice") {
            const rolls = Array.from({ length: term.count }, () => Math.floor(Math.random() * term.sides) + 1);

            const droppedSet = new Set(
                rolls
                    .map((v, i) => ({ v, i }))
                    .sort((a, b) => a.v - b.v)
                    .slice(0, term.drop)
                    .map(x => x.i)
            );

            const kept = rolls.filter((v, i) => !droppedSet.has(i));
            const sum = kept.reduce((a, b) => a + b, 0);
            total += term.sign * sum;

            const diceText = rolls
                .map((v, i) => droppedSet.has(i) ? `<span class="die-dropped">${v}</span>` : v)
                .join(", ");

            const termLabel = `${term.count}d${term.sides}${term.drop ? "d" + term.drop : ""}`;
            piece = `${termLabel}: [${diceText}]`;
        } else {
            total += term.sign * term.value;
            piece = `${term.value}`;
        }

        const prefix = index === 0
            ? (term.sign < 0 ? "− " : "")
            : (term.sign < 0 ? " − " : " + ");

        pieces.push(prefix + piece);
    });

    mountToast(`
        <div class="roll-toast-title">${escapeHtml(label || notation)}</div>
        <div class="roll-toast-dice">${pieces.join("")}</div>
        <div class="roll-toast-total">Total: <strong>${total}</strong></div>
    `);

    return total;
}
