// Componentes de Placa
export { default as Plate } from './Plate';
export { default as PlateForm } from './PlateForm';
export { default as PlateSearchForm } from './PlateSearchForm';
export { default as PlateExamples } from './PlateExamples';

// Hooks
export { 
  usePlateForm, 
  maskPlate, 
  isValidPlateChar, 
  validatePlate,
  type PlateFormData,
  type UsePlateFormOptions,
  type UsePlateFormReturn
} from '../hooks/usePlateForm';

// Tipos
export type { PlateProps } from './Plate';
export type { PlateFormProps } from './PlateForm'; 