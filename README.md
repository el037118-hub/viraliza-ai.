# Viraliza AI — MVP inicial

Aplicação web responsiva em português para criar ideias de posts, legendas, roteiros para Reels e textos promocionais. Funciona no celular e não exige instalação local.

## O que funciona agora
- Interface responsiva com navegação entre estúdio, plano de conteúdo, banco de ideias e sobre.
- Gerador demonstrativo no navegador, sem chave de API.
- Botão para copiar o texto gerado.
- Endpoint serverless opcional para geração real com OpenAI quando a variável `OPENAI_API_KEY` estiver configurada na hospedagem.

## Publicar pelo celular
1. Abra https://app.netlify.com/ no navegador e crie/entre na sua conta.
2. Para publicar arquivos estáticos, Netlify pode oferecer deploy manual arrastando uma pasta; em Android isso pode variar. A alternativa mais confiável é importar o projeto ZIP/repositório por uma ferramenta de desenvolvimento online que suporte deploy.
3. A versão estática funciona em modo de demonstração. Para ativar a função real, publique também a pasta `netlify/functions` e configure `OPENAI_API_KEY` em **Site configuration → Environment variables**. Não coloque a chave no HTML nem envie por mensagem.
4. Depois de definir a variável, faça novo deploy.

## Limitações importantes
- Ainda não há login, banco de dados, histórico persistente, pagamentos, limites por plano, integração com Instagram, publicação automática, termos/privacidade ou painel administrativo.
- A chave OpenAI gera custos conforme o uso; defina limites e monitore consumo antes de oferecer ao público.
- Esta é uma versão inicial/MVP, não um serviço comercial pronto para receber clientes pagantes.
- Revise o conteúdo antes de publicar. O modo demonstrativo usa modelos de texto locais, não um modelo de IA.

## Teste local (opcional)
Abra `index.html` no navegador. A geração por modelos locais funciona sem backend.
