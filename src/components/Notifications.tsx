
const Notifications = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Notificações</h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">3 novas</span>
      </div>
      <div className="space-y-3">
        <div className="notification-card bg-blue-50 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-800 text-xs sm:text-sm">Material disponível</h4>
            <span className="text-xs text-gray-500">Hoje</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">O material da Aula 5 já está disponível para download.</p>
        </div>

        <div className="notification-card bg-yellow-50 border-l-4 border-yellow-500">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-800 text-xs sm:text-sm">Lembrete de aula</h4>
            <span className="text-xs text-gray-500">Ontem</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Não esqueça da próxima aula na quarta-feira às 19:30h.</p>
        </div>

        <div className="notification-card bg-green-50 border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-800 text-xs sm:text-sm">Presença confirmada</h4>
            <span className="text-xs text-gray-500">3 dias atrás</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Sua presença na Aula 5 foi registrada com sucesso.</p>
        </div>
      </div>
      <a href="#" className="block text-center text-xs sm:text-sm text-primary hover:text-primary-deep mt-3 sm:mt-4 font-medium">
        Ver todas as notificações
      </a>
    </div>
  );
};

export default Notifications;
