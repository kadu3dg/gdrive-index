# DW GDINDEX

Um indexador de arquivos do Google Drive com interface moderna e responsiva, construído com Next.js 13, React e Tailwind CSS.

## 🌟 Funcionalidades

- 🔍 Busca rápida de arquivos
- 📁 Navegação intuitiva por pastas
- 🖼️ Preview de imagens e vídeos
- 📱 Interface responsiva
- 🌓 Tema claro/escuro/sistema
- ⬇️ Download direto de arquivos
- 🎥 Player nativo do Google Drive para vídeos
- 🔍 Breadcrumb para navegação

## 🚀 Tecnologias

- [Next.js 13](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Drive API](https://developers.google.com/drive/api)

## 📋 Pré-requisitos

- Node.js 18.0.0 ou superior
- Conta Google com acesso à API do Google Drive
- Projeto configurado no Google Cloud Console

## 🛠️ Configuração do Google Cloud

1. Acesse o [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione um existente
3. Ative a API do Google Drive para o projeto
4. Crie uma conta de serviço:
   - Vá para "IAM e Admin" > "Contas de serviço"
   - Clique em "Criar conta de serviço"
   - Dê um nome e conceda acesso de "Leitor" do Google Drive
   - Crie e baixe a chave em formato JSON
5. Codifique o arquivo JSON em base64:
   ```bash
   cat seu-arquivo-credenciais.json | base64
   ```

## ⚙️ Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/gdrive-index.git
   cd gdrive-index
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione suas variáveis:
   ```
   GOOGLE_DRIVE_CREDENTIALS=sua_chave_base64_aqui
   ENCRYPTION_KEY=sua_chave_de_criptografia_aqui
   ```

4. Execute o projeto em desenvolvimento:
   ```bash
   npm run dev
   ```

## 🚀 Deploy

O projeto está configurado para deploy automático no Vercel:

1. Fork este repositório
2. Crie uma conta no [Vercel](https://vercel.com)
3. Importe o projeto do GitHub
4. Configure a variável de ambiente `GOOGLE_DRIVE_CREDENTIALS`
5. Deploy!

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
