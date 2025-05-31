# Google Drive Index

Um índice de arquivos do Google Drive construído com Next.js para facilitar o compartilhamento de arquivos.

## Funcionalidades

- Listagem de arquivos e pastas do Google Drive
- Navegação entre pastas com breadcrumb
- Preview de imagens e ícones para diferentes tipos de arquivos
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

3. Configure as credenciais do Google Drive:
   - Vá para o [Google Cloud Console](https://console.cloud.google.com)
   - Crie um novo projeto ou selecione um existente
   - Ative a API do Google Drive
   - Crie uma conta de serviço e baixe o arquivo JSON de credenciais
   - Converta o arquivo JSON para Base64

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione as seguintes variáveis:
   ```env
   GOOGLE_DRIVE_CREDENTIALS=seu_json_em_base64
   ```

5. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

6. Para produção:
```bash
npm run build
npm start
```

## Deploy no Vercel

1. Fork este repositório
2. Conecte ao Vercel
3. Configure a variável de ambiente `GOOGLE_DRIVE_CREDENTIALS` no Vercel
4. Deploy!

## Licença

Este projeto está licenciado sob a licença MIT. 