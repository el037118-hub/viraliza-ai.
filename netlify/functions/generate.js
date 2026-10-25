
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método não permitido" }),
    };
  }

  try {
    const { business, format, tone, goal, details } =
      JSON.parse(event.body || "{}");

    if (!business || !business.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Informe seu negócio." }),
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "A chave GEMINI_API_KEY não está configurada no Netlify.",
        }),
      };
    }

    const prompt = `
Você é o assistente de criação de conteúdo do Viraliza AI.
Crie conteúdo original, natural e útil em português brasileiro.

Negócio: ${business}
Formato: ${format}
Tom de voz: ${tone}
Objetivo: ${goal}
Detalhes: ${details || "Nenhum detalhe adicional"}

Entregue apenas o conteúdo pronto para usar.
Não invente promoções, preços ou resultados.
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro do Gemini:", response.status, data);
      return {
        statusCode: 502,
        body: JSON.stringify({
          error: "O Gemini não conseguiu gerar o conteúdo. Verifique a API e a chave.",
        }),
      };
    }

    const text = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!text) {
      return {
        statusCode: 502,
        body: JSON.stringify({
          error: "O Gemini retornou uma resposta vazia.",
        }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    };
  } catch (error) {
    console.error("Erro na função:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro ao gerar conteúdo." }),
    };
  }
};

