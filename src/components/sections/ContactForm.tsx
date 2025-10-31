import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  nome: z.string().trim().min(1, "Nome é obrigatório"),
  email: z.string().trim().email("Email inválido"),
  telefone: z
    .string()
    .trim()
    .min(10, "Telefone deve ter no mínimo 10 dígitos"),
  mensagem: z.string().trim().min(1, "Mensagem é obrigatória"),
});

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    telefoneDisplay: "",
    mensagem: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const formatarTelefone = (valor: string) => {
    const numeros = valor.replace(/\D/g, "");

    if (numeros.length <= 10) {
      return numeros.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else {
      return numeros.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    }
  };

  const capturarIP = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      return data.ip;
    } catch (e) {
      console.error("Erro ao capturar IP:", e);
      return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = formSchema.parse(formData);

      // Capturar UTMs da URL
      const params = new URLSearchParams(window.location.search);

      // Capturar IP do usuário
      const ipUsuario = await capturarIP();

      // Capturar dados do dispositivo/navegador
      const userAgent = navigator.userAgent;
      const dispositivo = /Mobile|Android|iPhone/i.test(userAgent)
        ? "Mobile"
        : "Desktop";

      // Montar objeto completo
      const dadosLead = {
        nome: validatedData.nome,
        email: validatedData.email,
        telefone: validatedData.telefone,
        campos_personalizado: {
          mensagem: validatedData.mensagem,
          origem_formulario: "Landing Page Evento",
        },
        politicas_privacidade: true,

        // UTMs
        utm_source: params.get("utm_source") || "",
        utm_medium: params.get("utm_medium") || "",
        utm_campaign: params.get("utm_campaign") || "",
        utm_term: params.get("utm_term") || "",
        utm_content: params.get("utm_content") || "",

        // Identificadores
        nome_formulario: "Formulário Landing Page",
        id_formulario: "form-lp-evento",
        id_pagina: window.location.pathname,

        // Origem e navegação
        referral_source: document.referrer || "Direto",
        url_conversao: window.location.href,

        // Dados técnicos
        dispositivo,
        user_agent: userAgent,
        ip_usuario: ipUsuario,

        // Timestamp
        data_conversao: new Date().toISOString(),
        received_at: new Date().toISOString(),
      };

      // Insert no Supabase
      const { error } = await supabase.from("leads").insert([dadosLead]);

      if (error) throw error;

      toast({
        title: "Inscrição realizada!",
        description: "Em breve você receberá mais informações no seu email.",
      });

      setFormData({
        nome: "",
        email: "",
        telefone: "",
        telefoneDisplay: "",
        mensagem: "",
      });

      // Disparar evento para GTM/Pixel
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "form_submission",
          formId: "form-lp-evento",
          email: validatedData.email,
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erro de validação",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        console.error("Erro ao enviar:", error);
        toast({
          title: "Erro ao enviar",
          description: "Tente novamente em alguns instantes.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "telefone") {
      const apenasNumeros = value.replace(/\D/g, "");
      const valorFormatado = formatarTelefone(value);

      setFormData({
        ...formData,
        telefone: apenasNumeros,
        telefoneDisplay: valorFormatado,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const benefits = [
    "Acesso exclusivo ao evento ao vivo",
    "Material complementar gratuito",
    "Certificado de participação",
    "Networking com outros participantes",
  ];

  return (
    <section
      id="contato"
      className="py-16 md:py-24 bg-[hsl(var(--luxury-black))] relative overflow-hidden"
    >
      {/* Background com gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0e0a] via-[#2d1510] to-[#1a0e0a]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--f5-orange))]/20 via-transparent to-transparent" />

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[30%] left-[15%] w-[400px] h-[400px] rounded-full bg-[hsl(var(--f5-orange))]/30 blur-[110px] animate-float"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-[hsl(var(--f5-orange))]/25 blur-[100px] animate-float"
            style={{ animationDelay: "5s" }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div
          id="beneficios"
          className="text-center mb-8 md:mb-12 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Garanta sua vaga agora!
          </h2>
          <p className="text-base md:text-lg text-[hsl(var(--text-secondary))] leading-relaxed">
            Preencha o formulário abaixo e receba todas as informações sobre o
            evento diretamente no seu email.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[1fr_480px] gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Left - Benefits */}
          <div className="order-2 lg:order-1 space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
                O que você vai receber:
              </h3>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-[hsl(var(--luxury-dark))]/50 border border-white/5 rounded-xl p-4 hover:border-[hsl(var(--f5-orange))]/30 transition-all duration-300"
                >
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[hsl(var(--f5-orange))] flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-[hsl(var(--text-secondary))]">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="order-1 lg:order-2 bg-gradient-to-br from-[hsl(var(--luxury-dark))] to-[hsl(var(--luxury-black))] border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-2xl sticky top-24">
            <h3 className="text-lg md:text-xl font-bold text-white mb-5 md:mb-6 text-center">
              Formulário de Inscrição
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Nome */}
              <div className="relative">
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full bg-[hsl(var(--luxury-gray))] border border-white/10 rounded-lg md:rounded-xl px-3 md:px-4 pt-5 md:pt-6 pb-2 text-sm md:text-base text-white focus:outline-none focus:border-[hsl(var(--f5-orange))] transition-colors peer"
                  placeholder=" "
                />
                <label
                  htmlFor="nome"
                  className="absolute left-3 md:left-4 top-3 md:top-4 text-xs md:text-sm text-[hsl(var(--text-muted))] transition-all peer-focus:top-1.5 md:peer-focus:top-2 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-[hsl(var(--f5-orange))] peer-[&:not(:placeholder-shown)]:top-1.5 md:peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-[10px] md:peer-[&:not(:placeholder-shown)]:text-xs"
                >
                  Nome completo
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[hsl(var(--luxury-gray))] border border-white/10 rounded-lg md:rounded-xl px-3 md:px-4 pt-5 md:pt-6 pb-2 text-sm md:text-base text-white focus:outline-none focus:border-[hsl(var(--f5-orange))] transition-colors peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 md:left-4 top-3 md:top-4 text-xs md:text-sm text-[hsl(var(--text-muted))] transition-all peer-focus:top-1.5 md:peer-focus:top-2 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-[hsl(var(--f5-orange))] peer-[&:not(:placeholder-shown)]:top-1.5 md:peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-[10px] md:peer-[&:not(:placeholder-shown)]:text-xs"
                >
                  E-mail
                </label>
              </div>

              {/* Telefone */}
              <div className="relative">
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefoneDisplay}
                  onChange={handleChange}
                  required
                  maxLength={15}
                  className="w-full bg-[hsl(var(--luxury-gray))] border border-white/10 rounded-lg md:rounded-xl px-3 md:px-4 pt-5 md:pt-6 pb-2 text-sm md:text-base text-white focus:outline-none focus:border-[hsl(var(--f5-orange))] transition-colors peer"
                  placeholder=" "
                />
                <label
                  htmlFor="telefone"
                  className="absolute left-3 md:left-4 top-3 md:top-4 text-xs md:text-sm text-[hsl(var(--text-muted))] transition-all peer-focus:top-1.5 md:peer-focus:top-2 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-[hsl(var(--f5-orange))] peer-[&:not(:placeholder-shown)]:top-1.5 md:peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-[10px] md:peer-[&:not(:placeholder-shown)]:text-xs"
                >
                  WhatsApp
                </label>
              </div>

              {/* Mensagem */}
              <div>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  placeholder="O que você espera aprender no evento?"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-sm md:text-base font-bold uppercase tracking-wide py-4 md:py-6"
              >
                <span className="block md:inline">
                  {isSubmitting ? "Enviando..." : "CONFIRMAR INSCRIÇÃO"}
                </span>
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 inline-block" />
              </Button>

              <p className="text-[10px] md:text-xs text-center text-[hsl(var(--text-muted))] leading-relaxed mt-3">
                🔒 Seus dados estão protegidos. Resposta em até 24h.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
