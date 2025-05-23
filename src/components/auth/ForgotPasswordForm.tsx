
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ForgotPasswordFormProps {
  onBack: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBack }) => {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cpf) {
      toast({
        title: "Erro",
        description: "Digite seu CPF",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Aqui seria a chamada para a API de recuperação de senha
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simular delay
      
      setSent(true);
      toast({
        title: "Email enviado",
        description: "Verifique sua caixa de entrada para redefinir sua senha."
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao enviar email de recuperação",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Enviado!</h2>
            <p className="text-gray-600">
              Enviamos um link para redefinir sua senha para o email cadastrado com o CPF {cpf}.
            </p>
          </div>
          
          <Button onClick={onBack} className="w-full">
            Voltar ao Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Recuperar Senha</h1>
          <p className="text-gray-600">Digite seu CPF para receber o link de recuperação</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-2">
              CPF
            </label>
            <Input
              id="cpf"
              type="text"
              value={cpf}
              onChange={handleCPFChange}
              placeholder="000.000.000-00"
              maxLength={14}
              required
            />
          </div>

          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              className="flex-1"
            >
              Voltar
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Enviando...' : 'Enviar Link'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
