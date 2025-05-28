
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onForgotPassword: () => void;
  onRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword, onRegister }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !senha) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      await signIn(email, senha);
      toast({
        title: "Sucesso",
        description: "Login realizado com sucesso!"
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Credenciais inválidas",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ESCALI</h1>
          <p className="text-gray-600">Faça login em sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <Input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <button
            onClick={onForgotPassword}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Esqueci minha senha
          </button>
          
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-2">
              Não tem uma conta?
            </p>
            <Button 
              variant="outline" 
              onClick={onRegister}
              className="w-full"
            >
              Cadastrar-se
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
