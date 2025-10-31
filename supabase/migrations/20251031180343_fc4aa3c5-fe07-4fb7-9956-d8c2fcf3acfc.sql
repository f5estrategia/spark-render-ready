-- Criar tabela de leads para captura de formulário
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  
  -- Campos personalizados
  campos_personalizado JSONB,
  politicas_privacidade BOOLEAN DEFAULT true,
  
  -- UTM Parameters
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  
  -- Identificadores
  nome_formulario TEXT,
  id_formulario TEXT,
  id_pagina TEXT,
  
  -- Origem e navegação
  referral_source TEXT,
  url_conversao TEXT,
  
  -- Dados técnicos
  dispositivo TEXT,
  user_agent TEXT,
  ip_usuario TEXT,
  
  -- Timestamps
  data_conversao TIMESTAMP WITH TIME ZONE,
  received_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Índices para melhor performance
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_created_at ON public.leads(created_at);
CREATE INDEX idx_leads_utm_campaign ON public.leads(utm_campaign);

-- Esta é uma tabela pública (não requer autenticação)
-- RLS está habilitado mas permite inserção pública
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Permitir que qualquer pessoa insira leads (formulário público)
CREATE POLICY "Qualquer pessoa pode inserir leads"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Apenas admins podem visualizar leads (futuro)
CREATE POLICY "Apenas admins podem ver leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (false); -- Por enquanto, ninguém pode visualizar via API

-- Comentários
COMMENT ON TABLE public.leads IS 'Tabela para armazenar leads capturados do formulário de contato';
COMMENT ON COLUMN public.leads.campos_personalizado IS 'Campos adicionais em formato JSON';
COMMENT ON COLUMN public.leads.utm_source IS 'Origem do tráfego (ex: google, facebook)';
COMMENT ON COLUMN public.leads.dispositivo IS 'Tipo de dispositivo (Mobile/Desktop)';
