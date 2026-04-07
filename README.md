# Web Clean Paste

**Ferramenta web para limpar e normalizar textos copiados de qualquer fonte.**

Ao copiar textos de PDFs, sites, editores de texto, apresentações ou chats, é comum que venham com caracteres invisíveis, formatações estranhas e artefatos indesejados. O **Web Clean Paste** resolve isso em um clique.

**Exemplo:** [traue.com.br/clean-paste](https://traue.com.br/clean-paste)

---

## Funcionalidades

| Opção | Descrição |
|-------|-----------|
| Remover caracteres invisíveis | Zero-width spaces, BOM, marcadores direcionais |
| Substituir espaços não separáveis | Converte `&nbsp;` em espaços comuns |
| Normalizar espaços Unicode | Converte espaços Unicode incomuns (em-space, thin space, etc.) |
| Remover aspas tipográficas | Converte aspas curvas ("") para retas ("") |
| Substituir travessões por hífen | Substitui em-dash (—) e en-dash (–) por hífen (-) |
| Remover emojis | Remove todos os emojis, incluindo compostos e flags |
| Substituir marcadores | Troca bullets (•, ◦, ▪, ▸, etc.) por traços |
| Normalizar reticências | Converte `…` para `...` |
| Reduzir espaços múltiplos | Colapsa sequências de espaços em um só |
| Remover espaços de borda | Remove espaços extras no início/fim de cada linha |
| Reduzir linhas em branco | Substitui linhas em branco consecutivas por uma única |
| Remover artefatos Markdown | Remove títulos, negrito, itálico, links, blockquotes, etc. |
| Remover blocos de código (```) | Remove delimitadores de blocos de código usados por IAs |
| Remover URLs | Remove links http/https do texto |
| Remover asteriscos soltos | Remove `*` e `**` usados como negrito/itálico por IAs |
| Remover tags HTML | Remove todas as tags HTML, mantendo apenas o texto |
| Normalizar quebras de linha | Converte `\r\n` (Windows) para `\n` (Unix) |
| Remover símbolos decorativos | Remove ✅, ❌, ⚡, ➡, 🔹, etc. no início das linhas |

## Recursos extras

- **Tema claro / escuro** — Alternância com botão no header, preferência salva no navegador
- **Tradução PT / EN** — Interface disponível em português e inglês, preferência salva no navegador
- **Seleção granular** — Ative/desative cada opção individualmente
- **Selecionar/Desselecionar tudo** — Controle rápido de todas as opções
- **Histórico local** — Últimas 10 limpezas salvas no navegador (accordion colapsável)
- **Copiar com um clique** — Resultado e itens do histórico
- **Notificações visuais** — Feedback em cada ação
- **100% client-side** — Nenhum dado sai do seu navegador, sem backend
- **Responsivo** — Funciona em desktop e mobile

## Tecnologias

- HTML5
- CSS3  
- JavaScript (Vanilla — sem dependências)

## Estrutura do projeto

```
web-clean-paste/
├── index.html          # Página principal
├── js/
│   └── script.js       # Lógica de limpeza, histórico e UI
├── style/
│   └── style.css       # Estilos e responsividade
├── LICENSE             # Licença MIT
└── README.md
```

## Como usar localmente

```bash
git clone https://github.com/traue/web-clean-paste.git
cd web-clean-paste
```

Abra o arquivo `index.html` no navegador — não requer servidor, build ou instalação.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Desenvolvido por [Thiago Traue](https://github.com/traue)