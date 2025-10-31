import { ToastProvider } from "@/components/ui/toast";
import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import Solution from "@/components/sections/Solution";
import Cases from "@/components/sections/Cases";
import FAQ from "@/components/sections/FAQ";
import ContactForm from "@/components/sections/ContactForm";
import { Suspense } from "react";

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-[hsl(var(--luxury-black))] text-white">
        <Hero />
        <PainPoints />
        <Solution />
        <Suspense fallback={<div className="min-h-[400px]" />}>
          <Cases />
          <FAQ />
          <ContactForm />
        </Suspense>
      </div>
    </ToastProvider>
  );
}

export default App;
