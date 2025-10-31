import { Building2, TrendingUp, DollarSign, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Cases() {
  const scrollToForm = () => {
    const formSection = document.getElementById("inscricao");
    if (formSection) {
      const headerHeight = 100;
      const targetPosition = formSection.offsetTop - headerHeight - 20;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  const numeros = [
    { icon: Building2, numero: "3.000+", label: "Clínicas Atendidas", sublabel: "Mais de 8 anos no mercado de saúde" },
    { icon: Target, numero: "50+", label: "Marcas Odontológicas", sublabel: "Referência nacional" },
    { icon: TrendingUp, numero: "400% a 900%", label: "ROI Comprovado", sublabel: "Retorno documentado" },
    { icon: DollarSign, numero: "60%", label: "Redução no CAC", sublabel: "Custo de aquisição menor" },
  ];

  const cases = [
    { nome: "Oral Unic Ibirama", destaque: "ROAS 64,65x", resultado: "R$ 352k em 35 dias", badge: "CASE DESTAQUE" },
    { nome: "Oral Unic Vila Mariana", destaque: "ROI 19,81x", resultado: "Top 3 Nacional 2023", badge: "TOP 3 NACIONAL" },
    { nome: "Centro do Sorriso Arapongas", destaque: "ROAS 33x", resultado: "R$ 101k gerados", badge: "CONVERSÃO EXPRESS" },
  ];

  return (
    <section id="cases" className="py-20 md:py-32 bg-[hsl(var(--luxury-black))] relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Por Que <span className="text-[hsl(var(--f5-orange))]">+3.000 Clínicas</span> Confiam na f5 Estratégia
            </h2>
          </div>

          {/* Números Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {numeros.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="backdrop-blur-md bg-white/5 border border-[hsl(var(--f5-orange))]/20 rounded-2xl p-6 text-center hover:border-[hsl(var(--f5-orange))]/60 transition-all">
                  <Icon className="w-8 h-8 text-[hsl(var(--f5-orange))] mx-auto mb-3" />
                  <div className="text-3xl font-extrabold text-white mb-2">{item.numero}</div>
                  <div className="text-sm font-semibold text-white mb-1">{item.label}</div>
                  <div className="text-xs text-[hsl(var(--text-secondary))]">{item.sublabel}</div>
                </div>
              );
            })}
          </div>

          {/* Cases Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {cases.map((c, idx) => (
              <div key={idx} className="bg-gradient-to-br from-[hsl(var(--luxury-dark))] to-[hsl(var(--luxury-black))] border-2 border-[hsl(var(--f5-orange))]/30 rounded-2xl p-6">
                <div className="text-xs font-bold text-[hsl(var(--f5-orange))] mb-3">{c.badge}</div>
                <h3 className="text-xl font-bold text-white mb-4">{c.nome}</h3>
                <div className="text-3xl font-extrabold bg-gradient-to-r from-[hsl(var(--f5-orange))] to-orange-300 bg-clip-text text-transparent mb-2">{c.destaque}</div>
                <p className="text-[hsl(var(--text-secondary))]">{c.resultado}</p>
              </div>
            ))}
          </div>

          {/* Condutor */}
          <div className="bg-gradient-to-br from-[hsl(var(--luxury-dark))] to-[hsl(var(--luxury-black))] border border-white/10 rounded-2xl p-8 text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[hsl(var(--f5-orange))] to-orange-300 p-1 mx-auto mb-6">
              <div className="w-full h-full rounded-full bg-[hsl(var(--luxury-dark))] flex items-center justify-center text-4xl font-bold text-white">FM</div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Fernando Machado</h3>
            <p className="text-[hsl(var(--f5-orange))] font-semibold mb-6">CEO da f5 Estratégia - Aceleradora de Vendas</p>
            <ul className="text-[hsl(var(--text-secondary))] space-y-2 max-w-md mx-auto mb-8">
              <li>✓ Especialista certificado RD Station</li>
              <li>✓ +20 anos em vendas e marketing digital</li>
              <li>✓ Transformação de +3.000 clínicas</li>
              <li>✓ Referência em aceleração para o mercado de saúde</li>
            </ul>
            <Button
              onClick={scrollToForm}
              size="lg"
              className="text-sm md:text-base font-bold uppercase tracking-wide px-8 py-6"
            >
              INSCREVER-SE NA LIVE
              <ArrowRight className="ml-2 h-5 w-5 inline-block" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
