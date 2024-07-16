
# Projeto: CodeBeats

## Descrição
O projeto **CodeBeats** é um gerador de vídeos que combina imagens e áudios para criar vídeos relaxantes para estudo e relaxamento. Ele também inclui uma funcionalidade para gerar miniaturas personalizadas para os vídeos gerados. O projeto utiliza bibliotecas como `fluent-ffmpeg`, `sharp` e `canvas` para manipulação de mídia.

## Estrutura do Projeto

```plaintext
.
├── src
│   ├── index.ts          # Arquivo principal da aplicação
│   ├── thumbnail.ts      # Script para geração de miniaturas
│   ├── utils.ts          # Utilitários e decoradores como o 'benchmark'
│   └── video.ts          # Classe VideoUtils com funções relacionadas à manipulação de vídeos
├── assets
│   ├── audios            # Diretório contendo arquivos de áudio
│   ├── images            # Diretório contendo imagens
│   ├── output            # Diretório para os arquivos de vídeo gerados
│   ├── fonts             # Diretório contendo fontes para as miniaturas
│   └── thumbs            # Diretório para as miniaturas geradas
├── dist                  # Diretório de saída para os arquivos buildados
├── package.json
└── README.md             # Este arquivo
```

## Funcionalidades

1. **Geração de Vídeos**: Combina uma imagem com arquivos de áudio para criar vídeos.
2. **Concatenação de Vídeos**: Junta múltiplos arquivos de vídeo em um único arquivo.
3. **Geração de Miniaturas**: Cria miniaturas personalizadas para os vídeos gerados.
4. **Otimização de Imagens**: Redimensiona e comprime as miniaturas para otimização.

## Como Usar

### Pré-requisitos
- Node.js
- Bun.sh (opcional, mas recomendado para execução e build mais rápidos)
- FFmpeg (necessário para manipulação de vídeos)

### Instalação
1. Clone o repositório:
    ```sh
    git clone <URL_DO_REPOSITORIO>
    cd codebeats
    ```

2. Instale as dependências:
    ```sh
    npm install
    # ou, se estiver usando bun
    bun install
    ```

### Execução
1. Para iniciar a aplicação principal:
    ```sh
    npm start
    # ou, se estiver usando bun
    bun run src/index.ts
    ```

2. Para gerar miniaturas:
    ```sh
    npm run thumb
    # ou, se estiver usando bun
    bun run src/thumbnail.ts
    ```

### Build
1. Para buildar a aplicação:
    ```sh
    npm run build
    # ou, se estiver usando bun
    bun build src/index.ts --minify --outdir dist --target=node
    ```

2. Para buildar o gerador de miniaturas:
    ```sh
    npm run build:thumb
    # ou, se estiver usando tsup
    tsup src/thumbnail.ts --minify
    ```

## Estrutura de Arquivos e Diretórios

- `src/index.ts`: Ponto de entrada da aplicação que gera os vídeos.
- `src/thumbnail.ts`: Script para gerar miniaturas para os vídeos.
- `src/utils.ts`: Utilitários e funções auxiliares.
- `src/video.ts`: Classe `VideoUtils` contendo métodos para manipulação de vídeos.
- `assets/audios`: Contém os arquivos de áudio que serão utilizados nos vídeos.
- `assets/images`: Contém as imagens que serão utilizadas nos vídeos.
- `assets/output`: Diretório onde os vídeos gerados serão salvos.
- `assets/fonts`: Contém as fontes utilizadas para gerar as miniaturas.
- `assets/thumbs`: Diretório onde as miniaturas geradas serão salvas.

## Contribuição
1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
