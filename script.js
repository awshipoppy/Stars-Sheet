// =========================================
// MENU MOBILE
// =========================================

function toggleMenu() {
    const nav = document.getElementById("main-nav");
    nav.classList.toggle("active");
}


// =========================================
// ROLAGEM DE DADOS
// =========================================

function rollDice(sides) {
    const resultEl = document.getElementById("dice-result");

    // pequena animação de "rolando" antes de mostrar o resultado final
    resultEl.classList.add("rolling");

    let ticks = 0;
    const maxTicks = 8;

    const interval = setInterval(() => {
        resultEl.textContent = Math.floor(Math.random() * sides) + 1;
        ticks++;

        if (ticks >= maxTicks) {
            clearInterval(interval);

            const finalValue = Math.floor(Math.random() * sides) + 1;
            resultEl.textContent = finalValue;

            resultEl.classList.remove("rolling");
        }
    }, 60);
}


// =========================================
// FECHAR MENU MOBILE AO CLICAR EM UM LINK
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("main-nav");

    if (nav) {
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
            });
        });
    }
});


// =========================================
// COR DE TEMA DO SITE (compartilhada entre páginas)
// =========================================

const SITE_ACCENT_KEY = "reino-alem-site-accent";

const SITE_ACCENT_COLORS = {
    amarelo: "#d9c23d",
    verde: "#3dbf6b",
    ciano: "#3dc7c9",
    "azul-escuro": "#234a7a",
    roxo: "#9b3dc9",
    vermelho: "#c0392b",
    laranja: "#d97a3d"
};

function getSiteAccentName() {
    try {
        return localStorage.getItem(SITE_ACCENT_KEY) || "vermelho";
    } catch (e) {
        return "vermelho";
    }
}

function setSiteAccentName(name) {
    try {
        localStorage.setItem(SITE_ACCENT_KEY, name);
    } catch (e) {
        // armazenamento indisponível — o tema só vale para esta sessão
    }
    applySiteAccent();
}

function applySiteAccent() {
    const name = getSiteAccentName();
    const hex = SITE_ACCENT_COLORS[name] || SITE_ACCENT_COLORS.vermelho;
    document.documentElement.style.setProperty("--site-accent", hex);
}

applySiteAccent();
