
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Aulas from "./pages/Aulas";
import Calendario from "./pages/Calendario";
import Presenca from "./pages/Presenca";
import Materiais from "./pages/Materiais";
import Certificado from "./pages/Certificado";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/aulas" element={<Aulas />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/presenca" element={<Presenca />} />
          <Route path="/materiais" element={<Materiais />} />
          <Route path="/certificado" element={<Certificado />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
