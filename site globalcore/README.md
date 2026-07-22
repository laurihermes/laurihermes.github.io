# GlobalCore — Site Institucional

Site estático (HTML + CSS + JS puro, sem build) da **GlobalCore** — tecnologia,
desenvolvimento de software e hardware, conectividade via satélite e IoT.

## Estrutura

```
index.html        → página única
css/style.css     → tema futurista (dark, glassmorphism, gradientes neon)
js/main.js        → partículas de fundo, animações, contadores
assets/logo.png   → logo da empresa
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `globalcore-site` ou `seuusuario.github.io`).
2. Envie todos estes arquivos para a branch `main`.
3. No repositório: **Settings → Pages → Build and deployment**.
4. Selecione **Deploy from a branch** → branch `main` → pasta `/ (root)` → **Save**.
5. Em alguns minutos o site estará em `https://seuusuario.github.io/<repo>/`.

## Testar localmente

Basta abrir o `index.html` no navegador, ou rodar um servidor simples:

```bash
npx serve .
```

## Personalizar

- **E-mail de contato**: procure `contato@globalcore.dev` no `index.html` (marcado com comentário `AJUSTE`).
- **Estatísticas**: edite os atributos `data-target` na seção `stats` do `index.html` (marcado com comentário `AJUSTE`).
- **Cores do tema**: variáveis CSS no início de `css/style.css` (`:root`).
