import { XCircle, TrendingDown, UsersRound, BarChart3 } from "lucide-react";

export default function PainPoints() {
  const pains = [
    {
      icon: XCircle,
      title: "Leads que não convertem em pacientes",
      description:
        "Recebe contatos pelo Google e Instagram, mas poucos realmente agendam ou comparecem?",
    },
    {
      icon: TrendingDown,
      title: "Descontos que destroem sua margem",
      description:
        "Participa da Black Friday mas no fim do mês descobre que lucrou pouco (ou até perdeu)?",
    },
    {
      icon: UsersRound,
      title: "Equipe despreparada para o alto volume",
      description:
        "Sua recepcionista não tem script de vendas e deixa dinheiro na mesa por falta de técnica?",
    },
    {
      icon: BarChart3,
      title: "Sem controle de métricas (CAC, ROI, taxa de conversão)",
      description:
        "Investe 'no escuro' sem saber exatamente qual campanha está trazendo resultado?",
    },
  ];

  return (
    <section
      id="dores"
      className="py-20 md:py-32 bg-[hsl(var(--luxury-black))] relative"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Sua clínica está perdendo faturamento na{" "}
              <span className="text-[hsl(var(--f5-orange))]">Black Friday</span>?
            </h2>
            <p className="text-lg md:text-xl text-[hsl(var(--text-secondary))]">
              Se você já investe em tráfego pago mas ainda enfrenta estes desafios:
            </p>
          </div>

          {/* Grid de Dores */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {pains.map((pain, index) => {
              const Icon = pain.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-[hsl(var(--luxury-dark))] to-[hsl(var(--luxury-black))] border-l-4 border-red-500 rounded-xl p-6 hover:border-red-400 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(239,68,68,0.2)]"
                >
                  <div className="flex items-start gap-4">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                        {pain.title}
                      </h3>
                      <p className="text-[hsl(var(--text-secondary))] leading-relaxed">
                        {pain.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Transição */}
          <div className="bg-gradient-to-r from-red-900/10 via-[hsl(var(--f5-orange))]/10 to-red-900/10 border border-[hsl(var(--f5-orange))]/20 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              O problema não é a Black Friday. É a ESTRATÉGIA.
            </h3>
            <p className="text-lg text-[hsl(var(--text-secondary))] max-w-3xl mx-auto">
              Enquanto você hesita, seu concorrente está lotando a agenda com
              pacientes de alto valor usando as mesmas técnicas que vamos revelar
              nesta live.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
