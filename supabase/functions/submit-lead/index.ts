import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.77.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiter
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit: 3 submissions per IP per hour
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  // Clean up expired entries periodically
  if (record && now > record.resetTime) {
    rateLimitStore.delete(ip);
  }

  const currentRecord = rateLimitStore.get(ip);
  
  if (!currentRecord) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (currentRecord.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  currentRecord.count += 1;
  rateLimitStore.set(ip, currentRecord);
  return { allowed: true, remaining: RATE_LIMIT - currentRecord.count };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    console.log(`Form submission attempt from IP: ${clientIp}`);

    // Check rate limit
    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ 
          error: 'Muitas tentativas. Por favor, tente novamente mais tarde.',
          rateLimitExceeded: true 
        }),
        { 
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse request body
    const body = await req.json();
    const { nome, email, telefone, instagram_clinica, metadata } = body;

    // Server-side validation
    if (!nome || nome.length < 1 || nome.length > 200) {
      throw new Error('Nome inválido');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      throw new Error('Email inválido');
    }
    if (!telefone || telefone.length < 10 || telefone.length > 15) {
      throw new Error('Telefone inválido');
    }
    if (!instagram_clinica || instagram_clinica.length < 1 || instagram_clinica.length > 100) {
      throw new Error('Instagram inválido');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Prepare lead data
    const leadData = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      telefone: telefone.trim(),
      campos_personalizado: {
        instagram_clinica: instagram_clinica.trim(),
        origem_formulario: 'Landing Page Evento',
      },
      politicas_privacidade: true,
      utm_source: metadata?.utm_source || null,
      utm_medium: metadata?.utm_medium || null,
      utm_campaign: metadata?.utm_campaign || null,
      utm_term: metadata?.utm_term || null,
      utm_content: metadata?.utm_content || null,
      nome_formulario: 'Formulário Landing Page',
      id_formulario: 'form-lp-evento',
      id_pagina: metadata?.id_pagina || null,
      referral_source: metadata?.referral_source || 'Direto',
      url_conversao: metadata?.url_conversao || null,
      dispositivo: metadata?.dispositivo || null,
      user_agent: metadata?.user_agent || null,
      ip_usuario: clientIp,
      data_conversao: new Date().toISOString(),
      received_at: new Date().toISOString(),
    };

    // Insert into database
    const { data, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select();

    if (error) {
      console.error('Database error:', error);
      throw new Error('Erro ao salvar dados');
    }

    console.log(`Lead successfully created for ${email}. Remaining submissions: ${rateLimit.remaining}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        data,
        remaining: rateLimit.remaining 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro ao processar solicitação';
    return new Response(
      JSON.stringify({ 
        error: errorMessage
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
