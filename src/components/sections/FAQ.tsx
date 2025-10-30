import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      pergunta: "A live realmente será gratuita?",
      resposta: "Sim, 100% gratuita. Não há qualquer custo para participar. Nosso objetivo é compartilhar estratégias validadas para que mais clínicas tenham sucesso na Black Friday.",
      importante: true,
    },
    {
      pergunta: "Vou receber a gravação depois?",
      resposta: "A gravação ficará disponível por 48 horas após o evento. Porém, recomendamos fortemente participar ao vivo para fazer perguntas em tempo real e ter acesso prioritário aos bônus.",
      importante: true,
    },
    {
      pergunta: "Preciso ter experiência com marketing digital?",
      resposta: "Não! O conteúdo é pensado para diferentes níveis. Se você está começando, aprenderá o básico de forma estruturada. Se já investe, vai descobrir como otimizar e multiplicar resultados.",
      importante: false,
    },
    {
      pergunta: "Minha clínica é pequena, funciona para mim?",
      resposta: "Com certeza! As estratégias são escaláveis e já foram aplicadas em consultórios individuais, clínicas médias e redes grandes. Você vai aprender a adaptar ao seu orçamento.",
      importante: false,
    },
    {
      pergunta: "Como recebo os materiais bônus?",
      resposta: "O link para download será disponibilizado durante a transmissão ao vivo para todos os participantes conectados. Por isso é importante estar presente.",
      importante: true,
    },
    {
      pergunta: "Vou ter que comprar algo depois?",
      resposta: "Não há obrigação alguma. A live é educacional e você pode aplicar tudo por conta própria. No final, haverá uma apresentação opcional de como a f5 pode ajudar, mas é totalmente opcional.",
      importante: false,
    },
  ];

  const scrollToForm = () => {
    const formSection = document.getElementById("inscricao");
    if (formSection) {
      window.scrollTo({ top: formSection.offsetTop - 120, behavior: "smooth" });
    }
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-[hsl(var(--luxury-black))]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Perguntas Frequentes</h2>
            <p className="text-lg text-[hsl(var(--text-secondary))]">Tire suas dúvidas sobre a live</p>
          </div>

          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-[hsl(var(--luxury-dark))] to-[hsl(var(--luxury-black))] rounded-xl overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "border-2 border-[hsl(var(--f5-orange))]/40"
                    : "border border-[hsl(var(--f5-orange))]/15 hover:border-[hsl(var(--f5-orange))]/40"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {faq.importante && (
                      <span className="text-xs font-bold text-[hsl(var(--f5-orange))] bg-[hsl(var(--f5-orange))]/10 px-2 py-1 rounded">
                        IMPORTANTE
                      </span>
                    )}
                    <span className="text-lg font-semibold text-white">{faq.pergunta}</span>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-[hsl(var(--f5-orange))] flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6 text-[hsl(var(--text-secondary))] leading-relaxed animate-fade-in-up">
                    {faq.resposta}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="text-sm md:text-lg font-bold uppercase px-8 py-6"
            >
              QUERO PARTICIPAR DA LIVE GRATUITA
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
