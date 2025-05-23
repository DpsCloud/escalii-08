
const UpcomingClasses = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Próximas Aulas</h3>
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center p-3 sm:p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <div className="flex-shrink-0 sm:mr-4 mb-2 sm:mb-0">
            <div className="bg-blue-100 rounded-lg p-2 text-center w-14">
              <span className="block text-sm text-blue-800 font-medium">JUN</span>
              <span className="block text-xl text-blue-800 font-bold">15</span>
            </div>
          </div>
          <div className="flex-1 mb-2 sm:mb-0">
            <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Aula 6: 9 Dimensões da Imaturidade</h4>
            <p className="text-xs sm:text-sm text-gray-600">Quarta-feira, 19:30 - 21:30</p>
          </div>
          <div className="flex-shrink-0 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-deep transition-colors">
              Detalhes
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center p-3 sm:p-4 bg-secondary rounded-lg">
          <div className="flex-shrink-0 sm:mr-4 mb-2 sm:mb-0">
            <div className="bg-muted rounded-lg p-2 text-center w-14">
              <span className="block text-sm text-gray-600 font-medium">JUN</span>
              <span className="block text-xl text-gray-800 font-bold">22</span>
            </div>
          </div>
          <div className="flex-1 mb-2 sm:mb-0">
            <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Aula 7: Propósito da Mesa</h4>
            <p className="text-xs sm:text-sm text-gray-600">Quarta-feira, 19:30 - 21:30</p>
          </div>
          <div className="flex-shrink-0 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-4 py-2 bg-muted text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Detalhes
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center p-3 sm:p-4 bg-secondary rounded-lg">
          <div className="flex-shrink-0 sm:mr-4 mb-2 sm:mb-0">
            <div className="bg-muted rounded-lg p-2 text-center w-14">
              <span className="block text-sm text-gray-600 font-medium">JUN</span>
              <span className="block text-xl text-gray-800 font-bold">29</span>
            </div>
          </div>
          <div className="flex-1 mb-2 sm:mb-0">
            <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Aula 8: 8 Características de um Líder</h4>
            <p className="text-xs sm:text-sm text-gray-600">Quarta-feira, 19:30 - 21:30</p>
          </div>
          <div className="flex-shrink-0 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-4 py-2 bg-muted text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingClasses;
