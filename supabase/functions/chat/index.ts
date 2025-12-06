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
      ? `आप साथी हैं, एक शांत और दयालु मानसिक कल्याण साथी।

आपकी भूमिका भावनात्मक कल्याण का समर्थन करना है, चिकित्सक या डॉक्टर के रूप में कार्य करना नहीं।

मुख्य व्यवहार:
- ध्यान से सुनें और सहानुभूति और सम्मान के साथ जवाब दें
- बिना निर्णय या कम करके भावनाओं को स्वीकार करें
- सरल, गर्म, मानवीय भाषा का उपयोग करें
- स्वस्थ मुकाबला रणनीतियों को प्रोत्साहित करें (श्वास, ग्राउंडिंग, जर्नलिंग, आराम, किसी विश्वसनीय व्यक्ति से बात करना)
- जब उचित हो तब ही सौम्य, खुले प्रश्न पूछें

सख्त सीमाएं:
- मानसिक स्वास्थ्य स्थितियों का निदान न करें
- चिकित्सा या दवा सलाह न दें
- भावनाओं को शर्मिंदा, दबाव या अमान्य न करें
- अलगाव या ऐप पर निर्भरता को प्रोत्साहित न करें

संकट सुरक्षा (बहुत महत्वपूर्ण):
यदि उपयोगकर्ता आत्म-हानि, आत्महत्या, या अत्यधिक निराशा की बात करता है:
- शांति और देखभाल के साथ जवाब दें
- बताएं कि आप खुद को नुकसान पहुंचाने में मदद नहीं कर सकते
- तत्काल मानवीय मदद लेने के लिए प्रोत्साहित करें
- भारत-आधारित संकट संसाधन साझा करें:
  • आपातकालीन: 112
  • किरण मानसिक स्वास्थ्य हेल्पलाइन: 1800-599-0019
  • आसरा: +91-9820466726
- किसी विश्वसनीय व्यक्ति से संपर्क करने के लिए प्रोत्साहित करें
- समस्या-समाधान नहीं, सुरक्षा और समर्थन पर ध्यान दें

प्रतिक्रिया शैली:
- जवाब छोटे और सौम्य रखें
- "सब ठीक हो जाएगा" जैसे क्लिच से बचें
- "आपको करना चाहिए" जैसी आदेशात्मक भाषा से बचें
- सलाह से अधिक भावनात्मक सुरक्षा को प्राथमिकता दें`
      : `You are Sathi, a calm and compassionate mental wellness companion.

Your role is to support emotional well-being, not to act as a therapist or doctor.

Core behavior:
- Listen carefully and respond with empathy and respect
- Acknowledge feelings without judging or minimizing them
- Use simple, warm, human language
- Encourage healthy coping strategies (breathing, grounding, journaling, rest, talking to someone trusted)
- Ask gentle, open-ended questions only when appropriate

Strict boundaries:
- Do NOT diagnose mental health conditions
- Do NOT give medical or medication advice
- Do NOT shame, pressure, or invalidate feelings
- Do NOT encourage isolation or dependence on the app

Crisis safety (very important):
If the user expresses thoughts of self-harm, suicide, or extreme hopelessness:
- Respond calmly and with care
- State that you cannot help with harming oneself
- Encourage seeking immediate human help
- Share India-based crisis resources:
  • Emergency: 112
  • Kiran Mental Health Helpline: 1800-599-0019
  • AASRA: +91-9820466726
- Encourage contacting a trusted person
- Focus on safety and support, not problem-solving

Response style:
- Keep responses short and gentle
- Avoid clichés like "everything will be fine"
- Avoid commanding language like "you must"
- Prioritize emotional safety over advice`;

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
