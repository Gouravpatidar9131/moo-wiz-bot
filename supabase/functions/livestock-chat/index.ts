import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
    if (!OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not configured');
    }

    console.log('Processing livestock chat query:', message);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'system',
            content: `You are an expert agricultural advisor and veterinarian specializing in cattle and buffalo management. You provide practical, accurate advice on:

            - Livestock health and veterinary care
            - Breeding and genetics
            - Nutrition and feeding programs
            - Farm management practices
            - Disease prevention and treatment
            - Regional agricultural practices
            - Feed optimization and availability
            - Market insights and trends

            Always provide:
            1. Clear, actionable advice
            2. Safety considerations when relevant
            3. Regional recommendations when possible
            4. Cost-effective solutions
            5. Reference to professional veterinary care when needed

            Be conversational but professional. If you're unsure about something specific, recommend consulting with local veterinarians or agricultural extension services.`
          },
          {
            role: 'user',
            content: message + (context ? `\n\nAdditional context: ${context}` : '')
          }
        ],
        max_tokens: 800,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API error:', errorData);
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Chat response generated successfully');

    const chatResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      success: true, 
      response: chatResponse,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in livestock-chat function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});