# 🎨 Site de Aniversário para a Mãezinha — Guia Rápido

Feito com carinho pra você personalizar em minutos.

## 1. Nomes já estão prontos
Já troquei tudo pelos nomes reais: **Mãezinha**, **André** e **Noemir**.
Se quiser ajustar algum (por exemplo, usar "Mainha" em vez de "Mãezinha"),
abra o `index.html` num editor de texto e use Ctrl+F para achar e trocar.

## 2. Escreva as memórias
No `index.html`, procure pelos textos entre chaves duplas `{{ }}` dentro da
seção **"nossa galeria"** (momentos 01 a 04) e das **cartas das filhas**.
Apague o texto de exemplo e escreva as lembranças de verdade. São só
4 pequenos textos + 2 cartas.

> 💡 Dica: os textos também são editáveis direto no navegador (toque neles
> e digite), mas isso não fica salvo depois — o ideal é editar no arquivo.

## 3. Fotos — IMPORTANTE, leia com atenção

**As fotos agora funcionam só de um jeito: arquivo fixo na pasta `images/`.**
Não tem mais botão de trocar foto no site (isso não ficava salvo entre
visitas, então tirei). Agora é bem simples e definitivo:

Coloque suas fotos dentro da pasta `images/` com **estes nomes exatos**:

| Nome do arquivo               | Onde aparece                                |
|--------------------------------|----------------------------------------------|
| `capa-mae.jpg`                  | Foto principal, seção "quem é você pra mim"   |
| `momento-1.jpg`                 | 1ª foto da linha de momentos                  |
| `momento-2.jpg`                 | 2ª foto da linha de momentos                  |
| `momento-3.jpg`                 | 3ª foto da linha de momentos                  |
| `momento-4.jpg`                 | 4ª foto da linha de momentos                  |
| `mural-1.jpg` a `mural-6.jpg`   | As 6 fotos do mural final                     |

**Pode ser `.jpg`, `.jpeg` ou `.png`** — só se usar `.png`, precisa trocar a
extensão dentro do `index.html` também (Ctrl+F por `momento-1.jpg`, por
exemplo, e trocar para `momento-1.png`).

Assim que os arquivos estiverem na pasta com esses nomes exatos, as fotos
aparecem automaticamente ao abrir o site — sem precisar tocar em nada.
Se uma foto não existir ainda, aparece um quadrinho listrado avisando qual
arquivo falta, então fica fácil saber o que ainda precisa adicionar.

**Dica pra renomear fotos rápido:**
- No computador: selecione a foto, aperte F2 (Windows) ou Enter (Mac), digite
  o nome exato da tabela acima.
- No celular: ao salvar/exportar a foto da galeria, renomeie antes de mover
  pra pasta `images/`.
