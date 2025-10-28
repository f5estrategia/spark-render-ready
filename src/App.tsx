import { ToastProvider } from "@/components/ui/toast";
import Hero from "@/components/sections/Hero";

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-[hsl(var(--luxury-black))] text-white">
        <Hero />
      </div>
    </ToastProvider>
  );
}

export default App;
