// Lista das opções de limpeza, com função, nome e tooltip
const options = [
    {
        id: "stripInvisible",
        label: "Remover caracteres invisíveis",
        tip: "Remove caracteres invisíveis como zero-width space, etc.",
        fn: text => text.replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '')
    },
    {
        id: "stripNBSP",
        label: "Remover espaços não separáveis",
        tip: "Remove todos os espaços não separáveis (&nbsp;).",
        fn: text => text.replace(/\u00A0/g, ' ')
    },
    {
        id: "normalizeUnicode",
        label: "Normalizar espaços Unicode",
        tip: "Converte espaços unicode incomuns para espaços normais.",
        fn: text => text.replace(/[\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]/g, ' ')
    },
    {
        id: "stripSmartQuotes",
        label: "Remover aspas tipográficas",
        tip: "Converte aspas tipográficas para aspas comuns.",
        fn: text => text.replace(/[\u2018\u2019\u201A\u201B\u2039\u203A]/g, "'")
            .replace(/[\u201C\u201D\u201E\u201F\u00AB\u00BB]/g, '"')
    },
    {
        id: "removeEmDashes",
        label: "Remover travessões (—)",
        tip: "Remove travessões (—).",
        fn: text => text.replace(/\u2014/g, '')
    },
    {
        id: "stripEmojis",
        label: "Remover emojis",
        tip: "Remove todos os emojis do texto.",
        fn: text => text.replace(/([\u231A-\u231B]|\u23E9|\u23EA|\u23EB|\u23EC|\u23F0|\u23F3|\u25FD|\u25FE|\u2614|\u2615|\u2648-\u2653|\u267F|\u2693|\u26A1|\u26AA|\u26AB|\u26BD|\u26BE|\u26C4|\u26C5|\u26CE|\u26D4|\u26EA|\u26F2|\u26F3|\u26F5|\u26FA|\u26FD|\u2705|\u270A|\u270B|\u2728|\u274C|\u274E|\u2753-\u2755|\u2757|\u2795-\u2797|\u27B0|\u27BF|\u2B1B|\u2B1C|\u2B50|\u2B55|\u2934|\u2935|\u3030|\u303D|\u3297|\u3299|[\uD83C-\uDBFF][\uDC00-\uDFFF])/g, '')
    },
    {
        id: "replaceBullets",
        label: "Substituir marcadores por traços",
        tip: "Troca marcadores por traços.",
        fn: text => text.replace(/•/g, "-")
    },
    {
        id: "normalizeEllipses",
        label: "Normalizar reticências (…)",
        tip: "Normaliza reticências para '...'.",
        fn: text => text.replace(/\u2026/g, '...')
    },
    {
        id: "stripMarkdown",
        label: "Remover artefatos de Markdown",
        tip: "Remove artefatos comuns de Markdown.",
        fn: text => text
            .replace(/^#+\s?/gm, '')    // # títulos
            .replace(/^\*\s+/gm, '')    // * listas
            .replace(/^\d+\.\s+/gm, '') // listas numeradas
            .replace(/\*\*([^\*]+)\*\*/g, '$1') // **negrito**
            .replace(/\*([^\*]+)\*/g, '$1')     // *itálico*
            .replace(/!\[[^\]]*\]\([^)]+\)/g, '') // imagens
            .replace(/\[[^\]]*\]\([^)]+\)/g, '') // links
    }
];

// Gera opções dinamicamente
function renderOptions() {
    const el = document.getElementById('options');
    el.innerHTML = '';
    options.forEach(opt => {
        el.innerHTML += `
            <label class="option">
                <input type="checkbox" id="${opt.id}" checked>
                ${opt.label}
                <span class="tooltip">ⓘ
                    <span class="tooltip-text">${opt.tip}</span>
                </span>
            </label>
        `;
    });
}
renderOptions();

// Função principal de limpeza
function processText() {
    let text = document.getElementById('inputText').value;
    const selected = options.filter(opt => document.getElementById(opt.id).checked);
    selected.forEach(opt => { text = opt.fn(text); });
    document.getElementById('outputText').textContent = text;
    addToHistory(document.getElementById('inputText').value, text, selected.map(o => o.label));
}

// Copiar resultado
function copyOutput() {
    const text = document.getElementById('outputText').textContent;
    navigator.clipboard.writeText(text);
}

// Salvar e mostrar histórico no localStorage
function addToHistory(orig, cleaned, opts) {
    let hist = JSON.parse(localStorage.getItem('textCleanerHistory') || "[]");
    hist.unshift({ orig, cleaned, opts, date: new Date().toLocaleString() });
    hist = hist.slice(0, 10); // só últimos 10
    localStorage.setItem('textCleanerHistory', JSON.stringify(hist));
    renderHistory();
}

// NOVO: Remover item individual
function removeHistoryItem(index) {
    let hist = JSON.parse(localStorage.getItem('textCleanerHistory') || "[]");
    hist.splice(index, 1);
    localStorage.setItem('textCleanerHistory', JSON.stringify(hist));
    renderHistory();
}

// NOVO: Limpar todo histórico (com confirmação)
function clearHistory() {
    if (confirm('Tem certeza que deseja apagar todo o histórico? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('textCleanerHistory');
        renderHistory();
    }
}

function renderHistory() {
    let hist = JSON.parse(localStorage.getItem('textCleanerHistory') || "[]");
    const el = document.getElementById('history');
    if (!hist.length) {
        el.innerHTML = "<em>Sem histórico ainda.</em>";
        return;
    }
    // Botão para limpar todo o histórico
    el.innerHTML = `<button class="btn" onclick="clearHistory()" style="margin-bottom:16px;">Limpar Todo o Histórico</button>`;
    el.innerHTML += hist.map((item, i) => `
    <div class="history-entry">
        <small>${item.date}<br><strong>Opções:</strong> ${item.opts.join(", ")}</small>
        <span><strong>Original:</strong> ${item.orig.length > 60 ? item.orig.substring(0, 60) + "..." : item.orig}</span><br>
        <span><strong>Limpo:</strong> ${item.cleaned.length > 60 ? item.cleaned.substring(0, 60) + "..." : item.cleaned}</span>
        <button class="copy-btn" onclick="navigator.clipboard.writeText(\`${item.cleaned.replace(/`/g, "\\`")}\`)">Copiar</button>
        <button class="copy-btn" style="right:90px;background:#ff5252cc;" onclick="removeHistoryItem(${i})" title="Excluir este item">🗑️</button>
    </div>
`).join('');
}
renderHistory();