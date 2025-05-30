# Google Drive Index

Um índice de arquivos do Google Drive construído com Next.js para facilitar o compartilhamento de arquivos.

## Funcionalidades

- Listagem de arquivos e pastas do Google Drive
- Navegação entre pastas
- Download direto de arquivos
- Interface moderna e responsiva
- Suporte a tema claro/escuro

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/kadu3dg/gdrive-index.git
cd gdrive-index
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do projeto
- Adicione as seguintes variáveis:
```env
# Base64 Encoded Service Account JSON
GD_SERVICE_B64=seu_service_account_json_em_base64

# Secret Key for Encryption
ENCRYPTION_KEY=sua_chave_de_criptografia

# Index password, used when private mode is enabled
SITE_PASSWORD=senha_opcional

# [Optional] Only domain, without protocol (ex: mbaharip.com)
NEXT_PUBLIC_DOMAIN=seu_dominio_opcional
```

4. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

5. Para produção:
```bash
npm run build
npm start
```

## Deploy no Vercel

1. Fork este repositório
2. Conecte ao Vercel
3. Configure as variáveis de ambiente no Vercel
4. Deploy!

## Licença

Este projeto está licenciado sob a licença MIT. 