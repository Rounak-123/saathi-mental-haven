import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = language === "hi" 
      ? `आप साथी हैं, एक सहानुभूतिपूर्ण मानसिक स्वास्थ्य सहायता साथी। आप हिंदी में जवाब देंगे।

आपकी भूमिका:
- सहानुभूति और समझ के साथ सुनना
- मानसिक स्वास्थ्य संबंधी चिंताओं के लिए सहायक प्रतिक्रियाएं प्रदान करना
- तनाव, चिंता, अकेलेपन और शैक्षणिक दबाव से निपटने की रणनीतियां सुझाना
- जब उचित हो तो पेशेवर संसाधनों की सिफारिश करना
- एक सुरक्षित, गैर-निर्णयात्मक स्थान बनाए रखना

महत्वपूर्ण: यदि कोई आत्म-हानि या आत्महत्या का उल्लेख करता है, तो कृपया उन्हें तुरंत आपातकालीन सेवाओं (911) या संकट हेल्पलाइन: 1800-123-4567 से संपर्क करने के लिए प्रोत्साहित करें।

जवाब संक्षिप्त, गर्म और सहायक रखें।`
      : `You are Saathi, an empathetic mental health support companion. You will respond in English.

Your role:
- Listen with empathy and understanding
- Provide supportive responses for mental health concerns
- Suggest coping strategies for stress, anxiety, loneliness, and academic pressure
- Recommend professional resources when appropriate
- Maintain a safe, non-judgmental space

Important: If someone mentions self-harm or suicide, please encourage them to contact emergency services (911) or crisis helpline: 1800-123-4567 immediately.

Keep responses concise, warm, and supportive.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
