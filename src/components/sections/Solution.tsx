import { Gift, Users, Megaphone, Briefcase, Video, Book, CheckCircle } from "lucide-react";

export default function Solution() {
  const pilares = [
    {
      numero: 1,
      nome: "OFERTA IRRESISTÍVEL",
      icon: Gift,
      topicos: [
        "Como estruturar pacotes que vendem sem queimar margem",
        "Precificação estratégica: desconto real vs. desconto percebido",
        "Gatilhos mentais validados (escassez, urgência, prova social)",
      ],
    },
    {
      numero: 2,
      nome: "PÚBLICO CERTO",
      icon: Users,
      topicos: [
        "Base atual, leads antigos ou público frio: quem abordar primeiro?",
        "Segmentação por procedimento e perfil de paciente",
        "Técnica de reativação de pacientes inativos",
      ],
    },
    {
      numero: 3,
      nome: "CANAIS DE DIVULGAÇÃO",
      icon: Megaphone,
      topicos: [
        "Mix ideal: Meta Ads, Google Ads, WhatsApp, e-mail marketing",
        "Orçamento sugerido por porte de clínica",
        "Timing perfeito: quando começar as campanhas",
      ],
    },
    {
      numero: 4,
      nome: "ESTRUTURA DE ATENDIMENTO",
      icon: Briefcase,
      topicos: [
        "Como preparar sua equipe para converter em alto volume",
        "Scripts de abordagem específicos para Black Friday",
        "CRM configurado: zero vazamento de leads",
      ],
    },
  ];

  return (
    <section
      id="solucao"
      className="py-20 md:py-32 bg-[hsl(var(--luxury-black))] relative"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white to-[hsl(var(--f5-orange))] bg-clip-text text-transparent mb-6">
              Nesta Live Exclusiva, Você Vai Descobrir:
            </h2>
            <div className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-bold text-white">
              <Gift className="w-8 h-8 text-[hsl(var(--f5-orange))]" />
              <span>Os 4 Pilares de uma Black Friday Odontológica Lucrativa</span>
            </div>
          </div>

          {/* Grid Pilares */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {pilares.map((pilar) => {
              const Icon = pilar.icon;
              return (
                <div
                  key={pilar.numero}
                  className="group bg-gradient-to-br from-[hsl(var(--luxury-dark))] to-[hsl(var(--luxury-black))] border-2 border-[hsl(var(--f5-orange))]/30 rounded-2xl p-6 md:p-8 hover:border-[hsl(var(--f5-orange))] hover:shadow-[0_8px_30px_hsl(var(--f5-orange)/0.3)] transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Número e Ícone */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-5xl font-extrabold bg-gradient-to-br from-[hsl(var(--f5-orange))] to-orange-300 bg-clip-text text-transparent">
                      {pilar.numero}
                    </div>
                    <Icon className="w-12 h-12 text-[hsl(var(--f5-orange))]" />
                  </div>

                  {/* Nome */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                    {pilar.nome}
                  </h3>

                  {/* Tópicos */}
                  <ul className="space-y-3">
                    {pilar.topicos.map((topico, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[hsl(var(--f5-orange))] flex-shrink-0 mt-0.5" />
                        <span className="text-[hsl(var(--text-secondary))]">
                          {topico}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Bônus */}
          <div className="bg-gradient-to-br from-[hsl(var(--luxury-dark))] to-[hsl(var(--luxury-black))] border-2 border-dashed border-[#D4AF37] rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <Gift className="w-16 h-16 text-[#D4AF37] mx-auto mb-4 animate-pulse" />
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                BÔNUS EXCLUSIVOS PARA QUEM PARTICIPAR AO VIVO
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Bônus 1 */}
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <Video className="w-10 h-10 text-[#D4AF37] flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Mini Treinamento CRC Completo
                  </h4>
                  <p className="text-[hsl(var(--text-secondary))] text-sm">
                    Como Receber e Converter leads em pacientes pagantes -
                    Metodologia validada em +3.000 clínicas
                  </p>
                </div>
              </div>

              {/* Bônus 2 */}
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <Book className="w-10 h-10 text-[#D4AF37] flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    E-book CRC para Download
                  </h4>
                  <p className="text-[hsl(var(--text-secondary))] text-sm">
                    Material completo de apoio para implementação imediata
                  </p>
                </div>
              </div>
            </div>

            {/* Valor */}
            <div className="text-center">
              <div className="text-[hsl(var(--text-secondary))] line-through text-xl mb-2">
                De R$ 497,00
              </div>
              <div className="text-5xl font-extrabold text-[#D4AF37]">
                POR GRATUITO!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
