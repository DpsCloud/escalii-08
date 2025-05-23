
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const AttendanceForm = () => {
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite a senha fornecida pelo professor.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Sucesso!",
      description: "Sua presença foi registrada com sucesso.",
      variant: "default",
    });
    
    setPassword('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Marcar Presença</h3>
      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Digite a senha fornecida pelo professor para registrar sua presença na aula de hoje.</p>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <input 
          type="text" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite a senha da aula" 
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition text-sm"
        />
        <button 
          type="submit"
          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-primary text-white rounded-lg hover:bg-primary-deep transition-colors text-sm sm:text-base"
        >
          Confirmar Presença
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
