
import { CourseSection } from './CourseSection';
import { Course, Aula } from '@/types/course';

// Interface estendida para compatibilidade
interface ExtendedCourse extends Course {
  aulasSelecionadas?: string[];
}

interface CourseSectionExtendedProps {
  course: ExtendedCourse;
  searchTerm: string;
  editingAula: Aula | undefined;
  aulaDialogOpen: boolean;
  onEditAula: (aula: Aula) => void;
  onCloseDialog: () => void;
  setAulaDialogOpen: (open: boolean) => void;
}

export const CourseSectionExtended = (props: CourseSectionExtendedProps) => {
  // Converte o curso estendido para o formato padrão
  const standardCourse = {
    ...props.course,
    aulasSelecionadas: undefined
  } as Course;

  return (
    <CourseSection 
      {...props}
      course={standardCourse}
    />
  );
};
