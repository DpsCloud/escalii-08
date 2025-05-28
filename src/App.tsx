
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SupabaseAuthProvider } from '@/contexts/SupabaseAuthContext';
import { Toaster } from '@/components/ui/sonner';
import { SupabaseProtectedRoute } from '@/components/SupabaseProtectedRoute';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Pages
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import Alunos from '@/pages/Alunos';
import Cursos from '@/pages/Cursos';
import Usuarios from '@/pages/Usuarios';
import Relatorios from '@/pages/Relatorios';
import Aulas from '@/pages/Aulas';
import AulasAdmin from '@/pages/AulasAdmin';
import AulaDetalhes from '@/pages/AulaDetalhes';
import Calendario from '@/pages/Calendario';
import Presenca from '@/pages/Presenca';
import Materiais from '@/pages/Materiais';
import Certificado from '@/pages/Certificado';
import NotFound from '@/pages/NotFound';

import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <SupabaseAuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={
                <SupabaseProtectedRoute>
                  <Index />
                </SupabaseProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <SupabaseProtectedRoute>
                  <Dashboard />
                </SupabaseProtectedRoute>
              } />
              <Route path="/alunos" element={
                <SupabaseProtectedRoute requiredRole="admin">
                  <Alunos />
                </SupabaseProtectedRoute>
              } />
              <Route path="/cursos" element={
                <SupabaseProtectedRoute>
                  <Cursos />
                </SupabaseProtectedRoute>
              } />
              <Route path="/usuarios" element={
                <SupabaseProtectedRoute requiredRole="admin">
                  <Usuarios />
                </SupabaseProtectedRoute>
              } />
              <Route path="/relatorios" element={
                <SupabaseProtectedRoute>
                  <Relatorios />
                </SupabaseProtectedRoute>
              } />
              <Route path="/aulas" element={
                <SupabaseProtectedRoute>
                  <Aulas />
                </SupabaseProtectedRoute>
              } />
              <Route path="/aulas-admin" element={
                <SupabaseProtectedRoute>
                  <AulasAdmin />
                </SupabaseProtectedRoute>
              } />
              <Route path="/aula/:id" element={
                <SupabaseProtectedRoute>
                  <AulaDetalhes />
                </SupabaseProtectedRoute>
              } />
              <Route path="/calendario" element={
                <SupabaseProtectedRoute>
                  <Calendario />
                </SupabaseProtectedRoute>
              } />
              <Route path="/presenca" element={
                <SupabaseProtectedRoute>
                  <Presenca />
                </SupabaseProtectedRoute>
              } />
              <Route path="/materiais" element={
                <SupabaseProtectedRoute>
                  <Materiais />
                </SupabaseProtectedRoute>
              } />
              <Route path="/certificado" element={
                <SupabaseProtectedRoute>
                  <Certificado />
                </SupabaseProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </SupabaseAuthProvider>
    </ErrorBoundary>
  );
}

export default App;
