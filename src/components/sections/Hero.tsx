import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, Youtube, Gift } from "lucide-react";

export default function Hero() {
  const scrollToForm = () => {
    const formSection = document.getElementById("inscricao");
    if (formSection) {
      const headerHeight = 100;
      const targetPosition = formSection.offsetTop - headerHeight - 20;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-[180px] pb-24 overflow-hidden"
    >
      {/* Background com gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0e0a] via-[#2d1510] to-[#1a0e0a]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--f5-orange))]/20 via-transparent to-transparent" />

        {/* Elementos flutuantes */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-[hsl(var(--f5-orange))]/35 blur-[100px] animate-float"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute top-[60%] right-[10%] w-[400px] h-[400px] rounded-full bg-[hsl(var(--f5-orange))]/35 blur-[100px] animate-float"
            style={{ animationDelay: "5s" }}
          />
          <div
            className="absolute bottom-[10%] left-[50%] w-[400px] h-[400px] rounded-full bg-[hsl(var(--f5-orange))]/35 blur-[100px] animate-float"
            style={{ animationDelay: "10s" }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Logos Parceiros */}
          <div className="text-center mb-8 flex justify-center gap-6 flex-wrap">
            <span className="text-white/60 text-xs md:text-sm">Google Partner</span>
            <span className="text-white/60 text-xs md:text-sm">Meta Partner</span>
            <span className="text-white/60 text-xs md:text-sm">RD Station Partner</span>
          </div>

          {/* Headline & Text */}
          <div className="text-center animate-fade-in-up mb-12">
            <h1 className="mb-8">
              <span className="block text-sm md:text-base font-medium text-white uppercase tracking-[2px] mb-4">
                Live Gratuita
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-[0_0_30px_rgba(255,99,71,0.5)] leading-tight">
                <span className="bg-gradient-to-r from-white via-orange-200 to-[hsl(var(--f5-orange))] bg-clip-text text-transparent">
                  Como Faturar{" "}
                </span>
                <span className="bg-gradient-to-r from-[hsl(var(--f5-orange))] via-orange-400 to-[hsl(var(--f5-orange-dark))] bg-clip-text text-transparent">
                  3x Mais
                </span>
                <span className="bg-gradient-to-r from-white via-orange-200 to-[hsl(var(--f5-orange))] bg-clip-text text-transparent">
                  {" "}Sem Queimar Margem
                </span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[hsl(var(--text-secondary))] max-w-4xl mx-auto leading-relaxed">
              Estratégias validadas em +3.000 clínicas para criar ofertas
              irresistíveis que lotam sua agenda mantendo a lucratividade
            </p>
          </div>

          {/* Info Evento */}
          <div className="max-w-3xl mx-auto mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 bg-white/5 border border-white/10 rounded-xl">
              <Calendar className="w-8 h-8 text-[hsl(var(--f5-orange))] mb-2" />
              <div className="text-white font-semibold text-sm text-center">
                17 de Novembro
              </div>
              <div className="text-white/60 text-xs">(Segunda-feira)</div>
            </div>

            <div className="flex flex-col items-center p-4 bg-white/5 border border-white/10 rounded-xl">
              <Clock className="w-8 h-8 text-[hsl(var(--f5-orange))] mb-2" />
              <div className="text-white font-semibold text-sm text-center">
                19h
              </div>
              <div className="text-white/60 text-xs">Horário de Brasília</div>
            </div>

            <div className="flex flex-col items-center p-4 bg-white/5 border border-white/10 rounded-xl">
              <Youtube className="w-8 h-8 text-[hsl(var(--f5-orange))] mb-2" />
              <div className="text-white font-semibold text-sm text-center">
                AO VIVO
              </div>
              <div className="text-white/60 text-xs">no YouTube</div>
            </div>

            <div className="flex flex-col items-center p-4 bg-white/5 border border-white/10 rounded-xl">
              <Gift className="w-8 h-8 text-[hsl(var(--f5-orange))] mb-2" />
              <div className="text-white font-semibold text-sm text-center">
                100% Gratuito
              </div>
              <div className="text-white/60 text-xs">Online e Gratuito</div>
            </div>
          </div>

          {/* Floating Metrics */}
          <div className="relative max-w-4xl mx-auto mb-12">
            {/* Metric 1 - Desktop */}
            <div className="hidden lg:block absolute top-[0%] left-[-140px] animate-float">
              <div className="backdrop-blur-md bg-white/12 border border-white/18 rounded-2xl p-4 min-w-[200px] shadow-[0_14px_40px_rgba(0,0,0,0.35)] hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                <div className="text-3xl font-extrabold bg-gradient-to-br from-white to-gray-200 bg-clip-text text-transparent">
                  3.000+
                </div>
                <div className="text-sm text-[hsl(var(--text-secondary))]">
                  Clínicas Atendidas
                </div>
              </div>
            </div>

            {/* Metric 2 - Desktop - DESTAQUE */}
            <div
              className="hidden lg:block absolute top-[0%] right-[-140px] animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="backdrop-blur-md bg-white/18 border border-white/20 rounded-2xl p-4 min-w-[200px] shadow-[0_24px_80px_rgba(0,0,0,0.5),0_0_44px_hsl(var(--f5-orange)/0.35)] hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                <div className="text-3xl font-extrabold bg-gradient-to-br from-[hsl(var(--f5-orange))] to-orange-300 bg-clip-text text-transparent">
                  900%
                </div>
                <div className="text-sm text-white">ROI Recorde</div>
              </div>
            </div>

            {/* Metric 3 - Desktop */}
            <div
              className="hidden lg:block absolute bottom-[-40px] left-[50%] -translate-x-1/2 animate-float"
              style={{ animationDelay: "3s" }}
            >
              <div className="backdrop-blur-md bg-white/12 border border-white/18 rounded-2xl p-4 min-w-[200px] shadow-[0_14px_40px_rgba(0,0,0,0.35)] hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                <div className="text-3xl font-extrabold bg-gradient-to-br from-white to-gray-200 bg-clip-text text-transparent">
                  70%
                </div>
                <div className="text-sm text-[hsl(var(--text-secondary))]">
                  Especialização em Saúde
                </div>
              </div>
            </div>

            {/* Mobile Metrics Grid */}
            <div className="lg:hidden grid grid-cols-3 gap-3 mb-8">
              <div className="backdrop-blur-md bg-white/12 border border-white/18 rounded-xl p-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                <div className="text-xl font-extrabold bg-gradient-to-br from-white to-gray-200 bg-clip-text text-transparent">
                  3.000+
                </div>
                <div className="text-[10px] text-[hsl(var(--text-secondary))] leading-tight">
                  Clínicas
                </div>
              </div>

              <div className="backdrop-blur-md bg-white/18 border border-white/20 rounded-xl p-3 shadow-[0_0_30px_hsl(var(--f5-orange)/0.4)]">
                <div className="text-xl font-extrabold bg-gradient-to-br from-[hsl(var(--f5-orange))] to-orange-300 bg-clip-text text-transparent">
                  900%
                </div>
                <div className="text-[10px] text-white leading-tight">ROI Recorde</div>
              </div>

              <div className="backdrop-blur-md bg-white/12 border border-white/18 rounded-xl p-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                <div className="text-xl font-extrabold bg-gradient-to-br from-white to-gray-200 bg-clip-text text-transparent">
                  70%
                </div>
                <div className="text-[10px] text-[hsl(var(--text-secondary))] leading-tight">
                  Esp. Saúde
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center px-4 mt-16">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="text-sm md:text-lg font-bold uppercase tracking-wide md:tracking-wider px-6 md:px-10 py-5 md:py-8 w-full md:w-auto shadow-[0_8px_30px_hsl(var(--f5-orange)/0.5)]"
            >
              <span className="block md:inline">GARANTIR MINHA VAGA GRATUITA</span>
              <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6 inline-block" />
            </Button>
          </div>

          {/* Homologações */}
          <div className="mt-12 text-center">
            <p className="text-white/40 text-xs mb-4">Homologados por:</p>
            <div className="flex justify-center gap-6 flex-wrap text-white/50 text-xs">
              <span>Oral Unic</span>
              <span>Odonto Excellence</span>
              <span>SorriFacil</span>
              <span>Oral Brasil</span>
              <span>Odontotop</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
