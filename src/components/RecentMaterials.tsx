
const RecentMaterials = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">Materiais Recentes</h3>
        <a href="#" className="text-primary hover:text-primary-deep text-xs sm:text-sm font-medium">
          Ver todos
        </a>
      </div>
      <div className="space-y-1 sm:space-y-2 md:space-y-3">
        <div className="material-item">
          <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg mr-2 sm:mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 text-xs sm:text-sm">Aula 5 - Honra e Lealdade.pdf</h4>
            <p className="text-xs text-gray-500 hidden xs:block">Adicionado em 08/06/2023</p>
          </div>
          <button className="p-1 sm:p-2 text-gray-500 hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
          </button>
        </div>

        <div className="material-item">
          <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg mr-2 sm:mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 text-xs sm:text-sm">Aula 4 - O DNA de Cristo.pdf</h4>
            <p className="text-xs text-gray-500 hidden xs:block">Adicionado em 01/06/2023</p>
          </div>
          <button className="p-1 sm:p-2 text-gray-500 hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
          </button>
        </div>

        <div className="material-item">
          <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg mr-2 sm:mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 text-xs sm:text-sm">Aula 3 - Ouvir, Confiar e Obedecer.pdf</h4>
            <p className="text-xs text-gray-500 hidden xs:block">Adicionado em 25/05/2023</p>
          </div>
          <button className="p-1 sm:p-2 text-gray-500 hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentMaterials;
