import { ToastProvider } from "@/components/ui/toast";
import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import Solution from "@/components/sections/Solution";

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-[hsl(var(--luxury-black))] text-white">
        <Hero />
        <PainPoints />
        <Solution />
      </div>
    </ToastProvider>
  );
}

export default App;
