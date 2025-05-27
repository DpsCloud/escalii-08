
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import ProtectedRoute from '@/components/ProtectedRoute';
import ErrorBoundary from '@/components/ErrorBoundary';

// Pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Alunos from '@/pages/Alunos';
import Cursos from '@/pages/Cursos';
import Usuarios from '@/pages/Usuarios';
import Relatorios from '@/pages/Relatorios';
import Aulas from '@/pages/Aulas';
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
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/alunos" element={
                <ProtectedRoute>
                  <Alunos />
                </ProtectedRoute>
              } />
              <Route path="/cursos" element={
                <ProtectedRoute>
                  <Cursos />
                </ProtectedRoute>
              } />
              <Route path="/usuarios" element={
                <ProtectedRoute>
                  <Usuarios />
                </ProtectedRoute>
              } />
              <Route path="/relatorios" element={
                <ProtectedRoute>
                  <Relatorios />
                </ProtectedRoute>
              } />
              <Route path="/aulas" element={
                <ProtectedRoute>
                  <Aulas />
                </ProtectedRoute>
              } />
              <Route path="/aula/:id" element={
                <ProtectedRoute>
                  <AulaDetalhes />
                </ProtectedRoute>
              } />
              <Route path="/calendario" element={
                <ProtectedRoute>
                  <Calendario />
                </ProtectedRoute>
              } />
              <Route path="/presenca" element={
                <ProtectedRoute>
                  <Presenca />
                </ProtectedRoute>
              } />
              <Route path="/materiais" element={
                <ProtectedRoute>
                  <Materiais />
                </ProtectedRoute>
              } />
              <Route path="/certificado" element={
                <ProtectedRoute>
                  <Certificado />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
