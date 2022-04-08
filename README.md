## DeepBlog

um projeto de blog usando React, Next, Typescript e Sass.

Utiliza o Next com o recurso de Static Site Generation com objetivo de reduzir o número de consultas a API, diminuir o tempo de carregamento e consumo de banda. Para esse projeto utilizamos o CMS Prismic por se tratar de um excelente sistema de gerenciamento de conteúdo e ter uma boa precificação.

Esse projeto foi desenvolvido com o objetivo de testar o uso das tecnologias empregadas e como meio de aprendizado.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

# Setando o .env.local

O projeto acompanha um arquivo .env.local.example. Para usar o projeto é necessário mudar o nome para .env.local e setar as variável de ambiente requerida, nesse caso o PRISMIC_API_ENDPOINT.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
