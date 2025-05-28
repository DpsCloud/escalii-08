
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseForm } from './CourseForm';
import { Course } from '@/types/course';

// Interface estendida para compatibilidade
interface ExtendedCourse extends Course {
  turma?: string;
  aulasSelecionadas?: string[];
}

interface CourseFormExtendedProps {
  onClose: () => void;
  editingCourse?: ExtendedCourse;
}

export const CourseFormExtended = ({ onClose, editingCourse }: CourseFormExtendedProps) => {
  // Converte o curso estendido para o formato padrão
  const standardCourse = editingCourse ? {
    ...editingCourse,
    // Remove propriedades que não existem no tipo Course
    turma: undefined,
    aulasSelecionadas: undefined
  } as Course : undefined;

  return (
    <CourseForm 
      onClose={onClose} 
      editingCourse={standardCourse} 
    />
  );
};
