import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { keyword } = await req.json();

    if (!keyword || typeof keyword !== "string") {
      return new Response(
        JSON.stringify({ error: "Keyword is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const systemPrompt = `You are ResearchAgent, an advanced web-intelligence AI built to research the internet in real time and return trending content ideas.

Your job is to:
1. Identify the most searched, trending, asked, or viral topics related to the user's niche.
2. Return a structured list of at least 30 content ideas.

Guidelines:
- Ideas must be MIXED:
    • Viral trending topics  
    • Most-asked questions on Google  
    • "Explainer" style topics  
    • "Myth-busting" topics  
    • Case study style ideas  
    • Beginner-friendly questions  
    • Advanced questions  
- Remove duplicates, combine similar ideas, and sort by relevance + virality.
- Each idea must be short, punchy, scroll-stopping, and REEL-friendly.

Style:
- Do NOT give generic, boring ideas.
- Every idea should feel NEW, highly searchable, and trending.
- Use hooks like "Why…", "How to…", "The truth about…", "Nobody talks about…", "Stop doing this…".

Output Format:
{
  "niche": "<user niche>",
  "ideas": [
    {"id": 1, "idea": "…"},
    {"id": 2, "idea": "…"},
    ...
  ]
}`;

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: keyword,
          },
        ],
        temperature: 1,
        max_completion_tokens: 2048,
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.text();
      console.error("OpenAI API error:", errorData);
      return new Response(
        JSON.stringify({ error: "Failed to generate ideas" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const data = await openaiResponse.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "No ideas generated" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse OpenAI response:", e);
      return new Response(
        JSON.stringify({ error: "Invalid response format" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        niche: parsedContent.niche || keyword,
        ideas: parsedContent.ideas || [],
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in generate-ideas function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});