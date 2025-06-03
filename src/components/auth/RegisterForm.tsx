import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';

interface RegisterFormProps {
  onBack: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    dataNascimento: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    if (field === 'cpf') {
      value = formatCPF(value);
    } else if (field === 'telefone') {
      value = formatPhone(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, '');
    return numbers.length === 11;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCPF(formData.cpf)) {
      toast({
        title: "Erro",
        description: "CPF inválido",
        variant: "destructive"
      });
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      toast({
        title: "Erro",
        description: "Senhas não coincidem",
        variant: "destructive"
      });
      return;
    }

    if (formData.senha.length < 6) {
      toast({
        title: "Erro",
        description: "Senha deve ter pelo menos 6 caracteres",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const result = await signUp(formData.email, formData.senha, {
        nome: formData.nome,
        cpf: formData.cpf,
        telefone: formData.telefone,
        data_nascimento: formData.dataNascimento,
        role: 'student'
      });

      if (result.error) {
        throw result.error;
      }

      toast({
        title: "Sucesso",
        description: "Cadastro realizado com sucesso! Verifique seu email se necessário."
      });
      
      // Navegar para dashboard após cadastro bem-sucedido
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao realizar cadastro",
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Cadastro</h1>
          <p className="text-gray-600">Crie sua conta no ESCALI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo *
            </label>
            <Input
              value={formData.nome}
              onChange={handleInputChange('nome')}
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CPF *
            </label>
            <Input
              value={formData.cpf}
              onChange={handleInputChange('cpf')}
              placeholder="000.000.000-00"
              maxLength={14}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefone *
            </label>
            <Input
              value={formData.telefone}
              onChange={handleInputChange('telefone')}
              placeholder="(00) 00000-0000"
              maxLength={15}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de Nascimento *
            </label>
            <Input
              type="date"
              value={formData.dataNascimento}
              onChange={handleInputChange('dataNascimento')}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha *
            </label>
            <Input
              type="password"
              value={formData.senha}
              onChange={handleInputChange('senha')}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Senha *
            </label>
            <Input
              type="password"
              value={formData.confirmarSenha}
              onChange={handleInputChange('confirmarSenha')}
              placeholder="Digite a senha novamente"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
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
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
