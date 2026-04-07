// ===== Traduções =====
const translations = {
    pt: {
        pageTitle: "Clean Paste — Limpeza de Texto",
        headerTitle: "Clean Paste",
        subtitle: "Cole, limpe e copie textos sem formatação indesejada",
        inputLabel: "📥 Texto original",
        inputHint: "Cole aqui o texto que deseja limpar (de e-mails, PDFs, sites, IAs, etc.)",
        inputPlaceholder: "Cole seu texto aqui...",
        optionsLabel: "⚙️ Opções de limpeza",
        optionsHint: "Escolha quais transformações aplicar ao texto",
        selectAll: "Selecionar Todos",
        deselectAll: "Desselecionar Todos",
        btnClean: "🧹 Limpar texto",
        btnCleanCopy: "🧹📋 Limpar e copiar",
        btnCopyResult: "📋 Copiar resultado",
        outputLabel: "📤 Resultado",
        outputHint: "Texto processado aparece aqui",
        historyLabel: "🕘 Histórico",
        clearHistory: "🗑️ Limpar Todo o Histórico",
        clearHistoryConfirm: "Tem certeza que deseja apagar todo o histórico? Esta ação não pode ser desfeita.",
        noHistory: "Sem histórico ainda.",
        optionsUsed: "Opções usadas:",
        original: "Original:",
        cleaned: "Limpo:",
        copyBtn: "Copiar",
        deleteBtn: "🗑️ Excluir",
        notifCleaned: "Texto limpo com sucesso!",
        notifCopied: "Resultado copiado!",
        notifCleanedCopied: "Texto limpo e copiado!",
        notifCleanedCopyError: "Texto limpo, mas erro ao copiar.",
        notifHistoryCopied: "Texto copiado!",
        notifCopyError: "Erro ao copiar. Tente manualmente.",
        notifPasteFirst: "Cole um texto antes de limpar.",
        notifSelectOption: "Selecione ao menos uma opção de limpeza.",
        notifNothingToCopy: "Nenhum texto para copiar.",
        tipCleanBtn: "Aplica as opções de limpeza selecionadas ao texto",
        tipCleanCopyBtn: "Limpa o texto e copia o resultado automaticamente",
        tipCopyBtn: "Copia o resultado já processado para a área de transferência",
        tipCopyHistBtn: "Copiar texto limpo",
        tipDeleteHistBtn: "Excluir este item",
    },
    en: {
        pageTitle: "Clean Paste — Text Cleaner",
        headerTitle: "Clean Paste",
        subtitle: "Paste, clean, and copy text without unwanted formatting",
        inputLabel: "📥 Original text",
        inputHint: "Paste the text you want to clean (from emails, PDFs, sites, AIs, etc.)",
        inputPlaceholder: "Paste your text here...",
        optionsLabel: "⚙️ Cleaning options",
        optionsHint: "Choose which transformations to apply",
        selectAll: "Select All",
        deselectAll: "Deselect All",
        btnClean: "🧹 Clean text",
        btnCleanCopy: "🧹📋 Clean & copy",
        btnCopyResult: "📋 Copy result",
        outputLabel: "📤 Result",
        outputHint: "Processed text appears here",
        historyLabel: "🕘 History",
        clearHistory: "🗑️ Clear All History",
        clearHistoryConfirm: "Are you sure you want to delete all history? This action cannot be undone.",
        noHistory: "No history yet.",
        optionsUsed: "Options used:",
        original: "Original:",
        cleaned: "Cleaned:",
        copyBtn: "Copy",
        deleteBtn: "🗑️ Delete",
        notifCleaned: "Text cleaned successfully!",
        notifCopied: "Result copied!",
        notifCleanedCopied: "Text cleaned and copied!",
        notifCleanedCopyError: "Text cleaned, but copy failed.",
        notifHistoryCopied: "Text copied!",
        notifCopyError: "Copy failed. Try manually.",
        notifPasteFirst: "Paste some text before cleaning.",
        notifSelectOption: "Select at least one cleaning option.",
        notifNothingToCopy: "Nothing to copy.",
        tipCleanBtn: "Apply selected cleaning options to the text",
        tipCleanCopyBtn: "Clean the text and copy the result automatically",
        tipCopyBtn: "Copy the already processed result to the clipboard",
        tipCopyHistBtn: "Copy cleaned text",
        tipDeleteHistBtn: "Delete this item",
    }
};

let currentLang = localStorage.getItem('cleanpaste-lang') || 'pt';

function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || translations['pt'][key] || key;
}

function toggleLang() {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    localStorage.setItem('cleanpaste-lang', currentLang);
    applyTranslations();
    renderOptions();
    renderHistory();
    updateLangButton();
}

function updateLangButton() {
    const btn = document.getElementById('langToggle');
    if (btn) btn.textContent = currentLang === 'pt' ? '🌐 EN' : '🌐 PT';
}

function applyTranslations() {
    document.title = t('pageTitle');
    const h1 = document.querySelector('.header-content h1');
    if (h1) h1.textContent = t('headerTitle');
    const sub = document.querySelector('.subtitle');
    if (sub) sub.textContent = t('subtitle');

    const inputLabelText = document.querySelector('.input-label-text');
    if (inputLabelText) inputLabelText.textContent = t('inputLabel').replace('📥 ', '');
    const inputHint = document.querySelector('.input-hint');
    if (inputHint) inputHint.textContent = t('inputHint');
    const inputTA = document.getElementById('inputText');
    if (inputTA) inputTA.placeholder = t('inputPlaceholder');

    const optLabel = document.querySelector('.options-label-text');
    if (optLabel) optLabel.textContent = t('optionsLabel');
    const optHint = document.querySelector('.options-hint');
    if (optHint) optHint.textContent = t('optionsHint');

    const btnClean = document.getElementById('btnClean');
    if (btnClean) { btnClean.textContent = t('btnClean'); btnClean.title = t('tipCleanBtn'); }
    const btnCleanCopy = document.getElementById('btnCleanCopy');
    if (btnCleanCopy) { btnCleanCopy.textContent = t('btnCleanCopy'); btnCleanCopy.title = t('tipCleanCopyBtn'); }
    const btnCopy = document.getElementById('btnCopyResult');
    if (btnCopy) { btnCopy.textContent = t('btnCopyResult'); btnCopy.title = t('tipCopyBtn'); }

    const outLabel = document.querySelector('.output-label');
    if (outLabel) outLabel.textContent = t('outputLabel');
    const outHint = document.querySelector('.output-hint');
    if (outHint) outHint.textContent = t('outputHint');

    const histLabel = document.querySelector('.history-label-text');
    if (histLabel) histLabel.textContent = t('historyLabel');

    const footerDev = document.querySelector('.footer-dev');
    if (footerDev) footerDev.textContent = t('footerDev') || 'Desenvolvido por Thiago Traue';
    const footerGH = document.querySelector('.footer-gh');
    if (footerGH) footerGH.textContent = currentLang === 'en' ? 'View on GitHub' : 'Ver no GitHub';
}

// ===== Tema claro/escuro =====
let currentTheme = localStorage.getItem('cleanpaste-theme') || 'dark';

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
    localStorage.setItem('cleanpaste-theme', theme);
    updateThemeButton();
}

function toggleTheme() {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function updateThemeButton() {
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

// ===== Opções de limpeza =====
function getOptions() {
    return [
        {
            id: "stripInvisible",
            label: { pt: "Remover caracteres invisíveis", en: "Remove invisible characters" },
            tip: { pt: "Remove caracteres invisíveis como zero-width space, etc.", en: "Removes invisible characters such as zero-width spaces." },
            fn: text => text.replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '')
        },
        {
            id: "stripNBSP",
            label: { pt: "Substituir espaços não separáveis", en: "Replace non-breaking spaces" },
            tip: { pt: "Converte espaços não separáveis (&nbsp;) em espaços comuns.", en: "Converts non-breaking spaces to regular spaces." },
            fn: text => text.replace(/\u00A0/g, ' ')
        },
        {
            id: "normalizeUnicode",
            label: { pt: "Normalizar espaços Unicode", en: "Normalize Unicode spaces" },
            tip: { pt: "Converte espaços unicode incomuns para espaços normais.", en: "Converts unusual Unicode spaces to normal spaces." },
            fn: text => text.replace(/[\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]/g, ' ')
        },
        {
            id: "stripSmartQuotes",
            label: { pt: "Remover aspas tipográficas", en: "Remove smart quotes" },
            tip: { pt: "Converte aspas tipográficas para aspas comuns.", en: "Converts curly/smart quotes to straight quotes." },
            fn: text => text.replace(/[\u2018\u2019\u201A\u201B\u2039\u203A]/g, "'")
                .replace(/[\u201C\u201D\u201E\u201F\u00AB\u00BB]/g, '"')
        },
        {
            id: "removeEmDashes",
            label: { pt: "Substituir travessões (— e –) por hífen", en: "Replace em/en dashes with hyphen" },
            tip: { pt: "Substitui travessões em-dash (—) e en-dash (–) por hífen (-).", en: "Replaces em-dash and en-dash with a regular hyphen." },
            fn: text => text.replace(/[\u2013\u2014]/g, '-')
        },
        {
            id: "stripEmojis",
            label: { pt: "Remover emojis", en: "Remove emojis" },
            tip: { pt: "Remove todos os emojis do texto.", en: "Removes all emojis from the text." },
            fn: text => text.replace(/\p{Emoji_Presentation}/gu, '')
                .replace(/\p{Emoji}\uFE0F/gu, '')
                .replace(/\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?/gu, '')
                .replace(/\p{Emoji}\u200D/gu, '')
        },
        {
            id: "replaceBullets",
            label: { pt: "Substituir marcadores por traços", en: "Replace bullet chars with dashes" },
            tip: { pt: "Troca marcadores (•, ◦, ▪, ▸, ►, ➤, ➜, ○) por traços.", en: "Replaces bullet characters with dashes." },
            fn: text => text.replace(/[•◦▪▸►➤➜○]/g, "-")
        },
        {
            id: "normalizeEllipses",
            label: { pt: "Normalizar reticências (…)", en: "Normalize ellipses (…)" },
            tip: { pt: "Normaliza reticências para '...'.", en: "Normalizes ellipsis character to '...'." },
            fn: text => text.replace(/\u2026/g, '...')
        },
        {
            id: "collapseSpaces",
            label: { pt: "Reduzir espaços múltiplos", en: "Collapse multiple spaces" },
            tip: { pt: "Converte sequências de espaços em um único espaço.", en: "Collapses sequences of spaces into a single space." },
            fn: text => text.replace(/ {2,}/g, ' ')
        },
        {
            id: "trimLines",
            label: { pt: "Remover espaços no início/fim das linhas", en: "Trim whitespace from lines" },
            tip: { pt: "Remove espaços em branco extras no início e fim de cada linha.", en: "Removes extra whitespace from the start/end of each line." },
            fn: text => text.split('\n').map(line => line.trim()).join('\n')
        },
        {
            id: "collapseBlankLines",
            label: { pt: "Reduzir linhas em branco consecutivas", en: "Collapse consecutive blank lines" },
            tip: { pt: "Substitui múltiplas linhas em branco por uma única.", en: "Replaces multiple blank lines with a single one." },
            fn: text => text.replace(/\n{3,}/g, '\n\n')
        },
        {
            id: "stripMarkdown",
            label: { pt: "Remover artefatos de Markdown", en: "Remove Markdown artifacts" },
            tip: { pt: "Remove artefatos comuns de Markdown (títulos, negrito, itálico, links, etc.).", en: "Removes common Markdown artifacts (headings, bold, italic, links, etc.)." },
            fn: text => text
                .replace(/^#{1,6}\s?/gm, '')
                .replace(/^\*\s+/gm, '')
                .replace(/^-\s+/gm, '')
                .replace(/^\d+\.\s+/gm, '')
                .replace(/\*\*([^*]+)\*\*/g, '$1')
                .replace(/__([^_]+)__/g, '$1')
                .replace(/\*([^*]+)\*/g, '$1')
                .replace(/_([^_]+)_/g, '$1')
                .replace(/~~([^~]+)~~/g, '$1')
                .replace(/`([^`]+)`/g, '$1')
                .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
                .replace(/\[[^\]]*\]\([^)]+\)/g, '')
                .replace(/^>\s?/gm, '')
                .replace(/^---+$/gm, '')
        },
        {
            id: "stripCodeBlocks",
            label: { pt: "Remover blocos de código (```)", en: "Remove code blocks (```)" },
            tip: { pt: "Remove delimitadores de blocos de código usados por IAs.", en: "Removes code block delimiters used by AIs." },
            fn: text => text.replace(/^```[\w-]*\s*$/gm, '')
        },
        {
            id: "stripUrls",
            label: { pt: "Remover URLs", en: "Remove URLs" },
            tip: { pt: "Remove links http/https do texto.", en: "Removes http/https links from the text." },
            fn: text => text.replace(/https?:\/\/[^\s)>\]]+/g, '')
        },
        {
            id: "stripBoldAsterisks",
            label: { pt: "Remover asteriscos soltos (* e **)", en: "Remove stray asterisks (* and **)" },
            tip: { pt: "Remove asteriscos usados como negrito/itálico em textos de IA.", en: "Removes asterisks used as bold/italic in AI text." },
            fn: text => text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1')
        },
        {
            id: "stripHtmlTags",
            label: { pt: "Remover tags HTML", en: "Remove HTML tags" },
            tip: { pt: "Remove todas as tags HTML, mantendo apenas o texto.", en: "Strips all HTML tags, keeping only text content." },
            fn: text => text.replace(/<[^>]*>/g, '')
        },
        {
            id: "normalizeLineBreaks",
            label: { pt: "Normalizar quebras de linha (\\r\\n → \\n)", en: "Normalize line breaks (\\r\\n → \\n)" },
            tip: { pt: "Converte quebras de linha Windows para Unix.", en: "Converts Windows line breaks to Unix format." },
            fn: text => text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
        },
        {
            id: "stripLeadingSymbols",
            label: { pt: "Remover símbolos decorativos no início das linhas", en: "Remove decorative leading symbols" },
            tip: { pt: "Remove símbolos como ✅, ❌, ⚡, ➡, 🔹 no início das linhas.", en: "Removes symbols like ✅, ❌, ⚡, ➡, 🔹 at line starts." },
            fn: text => text.split('\n').map(line =>
                line.replace(/^[\s]*[\u2700-\u27BF\u2600-\u26FF\u2B50\u2705\u274C\u274E\u2728\u2734\u2747\u2764\u2795-\u2797\u27A1\u27B0\u27BF\uFE0F\u200D]+[\s]*/, '')
            ).join('\n')
        }
    ];
}

// Escapar HTML para evitar XSS
function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// Mostrar notificação temporária
function showNotification(message, type = 'success') {
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
    const opts = getOptions();
    let html = `<div class="options-toolbar">
        <button class="btn btn-small" onclick="toggleAllOptions(true)">${t('selectAll')}</button>
        <button class="btn btn-small" onclick="toggleAllOptions(false)">${t('deselectAll')}</button>
    </div>`;
    opts.forEach(opt => {
        const label = opt.label[currentLang] || opt.label.pt;
        const tip = opt.tip[currentLang] || opt.tip.pt;
        const cb = document.getElementById(opt.id);
        const checked = cb ? cb.checked : true;
        html += `
            <label class="option">
                <input type="checkbox" id="${opt.id}" ${checked ? 'checked' : ''}>
                ${escapeHTML(label)}
                <span class="tooltip">ⓘ
                    <span class="tooltip-text">${escapeHTML(tip)}</span>
                </span>
            </label>
        `;
    });
    el.innerHTML = html;
}

function toggleAllOptions(state) {
    getOptions().forEach(opt => {
        const cb = document.getElementById(opt.id);
        if (cb) cb.checked = state;
    });
}

// Função principal de limpeza
function processText() {
    const inputEl = document.getElementById('inputText');
    let text = inputEl.value;
    if (!text.trim()) {
        showNotification(t('notifPasteFirst'), 'error');
        return;
    }
    const opts = getOptions();
    const selected = opts.filter(opt => {
        const cb = document.getElementById(opt.id);
        return cb && cb.checked;
    });
    if (!selected.length) {
        showNotification(t('notifSelectOption'), 'error');
        return;
    }
    selected.forEach(opt => { text = opt.fn(text); });
    document.getElementById('outputText').textContent = text;
    const labels = selected.map(o => o.label[currentLang] || o.label.pt);
    addToHistory(inputEl.value, text, labels);
    showNotification(t('notifCleaned'));
}

// Copiar resultado
function copyOutput() {
    const text = document.getElementById('outputText').textContent;
    if (!text) {
        showNotification(t('notifNothingToCopy'), 'error');
        return;
    }
    navigator.clipboard.writeText(text).then(() => {
        showNotification(t('notifCopied'));
    }).catch(() => {
        showNotification(t('notifCopyError'), 'error');
    });
}

// Limpar e copiar em uma única ação
function processAndCopy() {
    const inputEl = document.getElementById('inputText');
    let text = inputEl.value;
    if (!text.trim()) {
        showNotification(t('notifPasteFirst'), 'error');
        return;
    }
    const opts = getOptions();
    const selected = opts.filter(opt => {
        const cb = document.getElementById(opt.id);
        return cb && cb.checked;
    });
    if (!selected.length) {
        showNotification(t('notifSelectOption'), 'error');
        return;
    }
    selected.forEach(opt => { text = opt.fn(text); });
    document.getElementById('outputText').textContent = text;
    const labels = selected.map(o => o.label[currentLang] || o.label.pt);
    addToHistory(inputEl.value, text, labels);
    navigator.clipboard.writeText(text).then(() => {
        showNotification(t('notifCleanedCopied'));
    }).catch(() => {
        showNotification(t('notifCleanedCopyError'), 'error');
    });
}

// Copiar item do histórico pelo índice
function copyHistoryItem(index) {
    const hist = JSON.parse(localStorage.getItem('textCleanerHistory') || "[]");
    if (hist[index]) {
        navigator.clipboard.writeText(hist[index].cleaned).then(() => {
            showNotification(t('notifHistoryCopied'));
        }).catch(() => {
            showNotification(t('notifCopyError'), 'error');
        });
    }
}

// Salvar e mostrar histórico no localStorage
function addToHistory(orig, cleaned, opts) {
    let hist = JSON.parse(localStorage.getItem('textCleanerHistory') || "[]");
    hist.unshift({ orig, cleaned, opts, date: new Date().toLocaleString() });
    hist = hist.slice(0, 10);
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
    if (confirm(t('clearHistoryConfirm'))) {
        localStorage.removeItem('textCleanerHistory');
        renderHistory();
    }
}

function renderHistory() {
    const hist = JSON.parse(localStorage.getItem('textCleanerHistory') || "[]");
    const el = document.getElementById('history');
    const countEl = document.getElementById('historyCount');

    if (!hist.length) {
        el.innerHTML = `<em>${t('noHistory')}</em>`;
        countEl.textContent = '';
        return;
    }

    countEl.textContent = `(${hist.length})`;

    let html = `<button class="btn btn-secondary" onclick="clearHistory()" style="margin-bottom:16px;">${t('clearHistory')}</button>`;
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
                <strong>${t('optionsUsed')}</strong> ${safeOpts}
            </div>
            <div class="history-detail">
                <strong>${t('original')}</strong>
                <pre class="history-text">${safeOrig}</pre>
            </div>
            <div class="history-detail">
                <strong>${t('cleaned')}</strong>
                <pre class="history-text">${safeCleaned}</pre>
            </div>
            <div class="history-entry-actions">
                <button class="copy-btn" onclick="copyHistoryItem(${i})" title="${t('tipCopyHistBtn')}">${t('copyBtn')}</button>
                <button class="copy-btn btn-delete" onclick="removeHistoryItem(${i})" title="${t('tipDeleteHistBtn')}">${t('deleteBtn')}</button>
            </div>
        </div>
    </details>`;
    }).join('');
    el.innerHTML = html;
}

// ===== Inicialização =====
applyTheme(currentTheme);
updateLangButton();
applyTranslations();
renderOptions();
renderHistory();