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
        label: "Substituir espaços não separáveis",
        tip: "Converte espaços não separáveis (&nbsp;) em espaços comuns.",
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
        label: "Remover travessões (— e –)",
        tip: "Remove travessões em-dash (—) e en-dash (–).",
        fn: text => text.replace(/[\u2013\u2014]/g, '')
    },
    {
        id: "stripEmojis",
        label: "Remover emojis",
        tip: "Remove todos os emojis do texto.",
        fn: text => text.replace(/\p{Emoji_Presentation}/gu, '')
            .replace(/\p{Emoji}\uFE0F/gu, '')
            .replace(/\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?/gu, '')
            .replace(/\p{Emoji}\u200D/gu, '')
    },
    {
        id: "replaceBullets",
        label: "Substituir marcadores por traços",
        tip: "Troca marcadores (•, ◦, ▪, ▸, ►, ➤, ➜, ○) por traços.",
        fn: text => text.replace(/[•◦▪▸►➤➜○]/g, "-")
    },
    {
        id: "normalizeEllipses",
        label: "Normalizar reticências (…)",
        tip: "Normaliza reticências para '...'.",
        fn: text => text.replace(/\u2026/g, '...')
    },
    {
        id: "collapseSpaces",
        label: "Reduzir espaços múltiplos",
        tip: "Converte sequências de espaços em um único espaço.",
        fn: text => text.replace(/ {2,}/g, ' ')
    },
    {
        id: "trimLines",
        label: "Remover espaços no início/fim das linhas",
        tip: "Remove espaços em branco extras no início e fim de cada linha.",
        fn: text => text.split('\n').map(line => line.trim()).join('\n')
    },
    {
        id: "collapseBlankLines",
        label: "Reduzir linhas em branco consecutivas",
        tip: "Substitui múltiplas linhas em branco por uma única.",
        fn: text => text.replace(/\n{3,}/g, '\n\n')
    },
    {
        id: "stripMarkdown",
        label: "Remover artefatos de Markdown",
        tip: "Remove artefatos comuns de Markdown.",
        fn: text => text
            .replace(/^#{1,6}\s?/gm, '')         // # títulos (até h6)
            .replace(/^\*\s+/gm, '')              // * listas
            .replace(/^-\s+/gm, '')               // - listas
            .replace(/^\d+\.\s+/gm, '')           // listas numeradas
            .replace(/\*\*([^*]+)\*\*/g, '$1')    // **negrito**
            .replace(/__([^_]+)__/g, '$1')         // __negrito__
            .replace(/\*([^*]+)\*/g, '$1')         // *itálico*
            .replace(/_([^_]+)_/g, '$1')           // _itálico_
            .replace(/~~([^~]+)~~/g, '$1')         // ~~tachado~~
            .replace(/`([^`]+)`/g, '$1')           // `código inline`
            .replace(/!\[[^\]]*\]\([^)]+\)/g, '')  // imagens
            .replace(/\[[^\]]*\]\([^)]+\)/g, '')   // links
            .replace(/^>\s?/gm, '')                // > blockquotes
            .replace(/^---+$/gm, '')               // --- separadores
    }
];

// Escapar HTML para evitar XSS
function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// Mostrar notificação temporária
function showNotification(message, type = 'success') {
    // Remove notificação anterior, se existir
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const el = document.createElement('div');
    el.className = `notification notification-${type}`;
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2200);
}

// Gera opções dinamicamente
function renderOptions() {
    const el = document.getElementById('options');
    // Botão selecionar/desselecionar tudo
    let html = `<div class="options-toolbar">
        <button class="btn btn-small" onclick="toggleAllOptions(true)">Selecionar Todos</button>
        <button class="btn btn-small" onclick="toggleAllOptions(false)">Desselecionar Todos</button>
    </div>`;
    options.forEach(opt => {
        html += `
            <label class="option">
                <input type="checkbox" id="${opt.id}" checked>
                ${opt.label}
                <span class="tooltip">ⓘ
                    <span class="tooltip-text">${opt.tip}</span>
                </span>
            </label>
        `;
    });
    el.innerHTML = html;
}

function toggleAllOptions(state) {
    options.forEach(opt => {
        document.getElementById(opt.id).checked = state;
    });
}

renderOptions();

// Função principal de limpeza
function processText() {
    const inputEl = document.getElementById('inputText');
    let text = inputEl.value;
    if (!text.trim()) {
        showNotification('Cole um texto antes de limpar.', 'error');
        return;
    }
    const selected = options.filter(opt => document.getElementById(opt.id).checked);
    if (!selected.length) {
        showNotification('Selecione ao menos uma opção de limpeza.', 'error');
        return;
    }
    selected.forEach(opt => { text = opt.fn(text); });
    document.getElementById('outputText').textContent = text;
    addToHistory(inputEl.value, text, selected.map(o => o.label));
    showNotification('Texto limpo com sucesso!');
}

// Copiar resultado
function copyOutput() {
    const text = document.getElementById('outputText').textContent;
    if (!text) {
        showNotification('Nenhum texto para copiar.', 'error');
        return;
    }
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Resultado copiado!');
    }).catch(() => {
        showNotification('Erro ao copiar. Tente manualmente.', 'error');
    });
}

// Copiar item do histórico pelo índice
function copyHistoryItem(index) {
    const hist = JSON.parse(localStorage.getItem('textCleanerHistory') || "[]");
    if (hist[index]) {
        navigator.clipboard.writeText(hist[index].cleaned).then(() => {
            showNotification('Texto copiado!');
        }).catch(() => {
            showNotification('Erro ao copiar.', 'error');
        });
    }
}

// Salvar e mostrar histórico no localStorage
function addToHistory(orig, cleaned, opts) {
    let hist = JSON.parse(localStorage.getItem('textCleanerHistory') || "[]");
    hist.unshift({ orig, cleaned, opts, date: new Date().toLocaleString() });
    hist = hist.slice(0, 10); // só últimos 10
    localStorage.setItem('textCleanerHistory', JSON.stringify(hist));
    renderHistory();
}

// Remover item individual
function removeHistoryItem(index) {
    let hist = JSON.parse(localStorage.getItem('textCleanerHistory') || "[]");
    hist.splice(index, 1);
    localStorage.setItem('textCleanerHistory', JSON.stringify(hist));
    renderHistory();
}

// Limpar todo histórico (com confirmação)
function clearHistory() {
    if (confirm('Tem certeza que deseja apagar todo o histórico? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('textCleanerHistory');
        renderHistory();
    }
}

function renderHistory() {
    const hist = JSON.parse(localStorage.getItem('textCleanerHistory') || "[]");
    const el = document.getElementById('history');
    const countEl = document.getElementById('historyCount');

    if (!hist.length) {
        el.innerHTML = "<em>Sem histórico ainda.</em>";
        countEl.textContent = '';
        return;
    }

    countEl.textContent = `(${hist.length})`;

    // Botão para limpar todo o histórico
    let html = `<button class="btn" onclick="clearHistory()" style="margin-bottom:16px;">Limpar Todo o Histórico</button>`;
    html += hist.map((item, i) => {
        const safeOrig = escapeHTML(item.orig);
        const safeCleaned = escapeHTML(item.cleaned);
        const safeOpts = escapeHTML(item.opts.join(", "));
        const safeDate = escapeHTML(item.date);
        const origPreview = safeOrig.length > 80 ? safeOrig.substring(0, 80) + "..." : safeOrig;
        return `
    <details class="history-entry-accordion">
        <summary class="history-entry-summary">
            <span class="history-entry-date">${safeDate}</span>
            <span class="history-entry-preview">${origPreview}</span>
        </summary>
        <div class="history-entry-body">
            <div class="history-detail">
                <strong>Opções usadas:</strong> ${safeOpts}
            </div>
            <div class="history-detail">
                <strong>Original:</strong>
                <pre class="history-text">${safeOrig}</pre>
            </div>
            <div class="history-detail">
                <strong>Limpo:</strong>
                <pre class="history-text">${safeCleaned}</pre>
            </div>
            <div class="history-entry-actions">
                <button class="copy-btn" onclick="copyHistoryItem(${i})" title="Copiar texto limpo">Copiar</button>
                <button class="copy-btn btn-delete" onclick="removeHistoryItem(${i})" title="Excluir este item">🗑️ Excluir</button>
            </div>
        </div>
    </details>`;
    }).join('');
    el.innerHTML = html;
}
renderHistory();