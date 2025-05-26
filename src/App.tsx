
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Aulas from "./pages/Aulas";
import Calendario from "./pages/Calendario";
import Presenca from "./pages/Presenca";
import Materiais from "./pages/Materiais";
import Certificado from "./pages/Certificado";
import Alunos from "./pages/Alunos";
import Cursos from "./pages/Cursos";
import Usuarios from "./pages/Usuarios";
import Relatorios from "./pages/Relatorios";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ProtectedRoute>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/aulas" element={<Aulas />} />
              <Route path="/calendario" element={<Calendario />} />
              <Route path="/presenca" element={<Presenca />} />
              <Route path="/materiais" element={<Materiais />} />
              <Route path="/certificado" element={<Certificado />} />
              <Route path="/alunos" element={<Alunos />} />
              <Route path="/cursos" element={<Cursos />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/relatorios" element={<Relatorios />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
