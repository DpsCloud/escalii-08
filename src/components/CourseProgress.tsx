
const CourseProgress = () => {
  const progressData = [
    { lessonName: "Aula 1: Comunicação", status: "Concluída", progress: 100 },
    { lessonName: "Aula 2: Atributos da Liderança", status: "Concluída", progress: 100 },
    { lessonName: "Aula 3: Ouvir, Confiar e Obedecer", status: "Concluída", progress: 100 },
    { lessonName: "Aula 4: O DNA de Cristo", status: "Concluída", progress: 100 },
    { lessonName: "Aula 5: Honra e Lealdade", status: "Concluída", progress: 100 },
    { lessonName: "Aula 6: 9 Dimensões da Imaturidade", status: "Próxima", progress: 0 },
    { lessonName: "Aula 7: Propósito da Mesa", status: "Pendente", progress: 0 },
    { lessonName: "Aula 8: 8 Características de um Líder", status: "Pendente", progress: 0 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Progresso do Curso</h3>
      <div className="space-y-3 sm:space-y-4">
        {progressData.map((lesson, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs sm:text-sm font-medium text-gray-700 truncate mr-2">{lesson.lessonName}</span>
              <span className={`text-xs sm:text-sm font-medium ${
                lesson.status === "Concluída" ? "text-green-600" : 
                lesson.status === "Próxima" ? "text-primary" : "text-gray-500"
              }`}>
                {lesson.status}
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className={`progress-value ${
                  lesson.status === "Concluída" ? "bg-green-600" : "bg-gray-400"
                }`} 
                style={{width: `${lesson.progress}%`}}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseProgress;
