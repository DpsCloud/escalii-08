
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Lazy loading das páginas
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Aulas = lazy(() => import("./pages/Aulas"));
const Calendario = lazy(() => import("./pages/Calendario"));
const Presenca = lazy(() => import("./pages/Presenca"));
const Materiais = lazy(() => import("./pages/Materiais"));
const Certificado = lazy(() => import("./pages/Certificado"));
const Alunos = lazy(() => import("./pages/Alunos"));
const Cursos = lazy(() => import("./pages/Cursos"));
const Usuarios = lazy(() => import("./pages/Usuarios"));
const Relatorios = lazy(() => import("./pages/Relatorios"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <p className="text-sm text-muted-foreground">Carregando...</p>
    </div>
  </div>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
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
              </Suspense>
            </ProtectedRoute>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
