import { useState, useCallback, useRef } from 'react';

export interface PlateFormData {
  plate: string;
}

export interface UsePlateFormOptions {
  initialPlate?: string;
  onSubmit?: (data: PlateFormData) => void;
  onPlateChange?: (plate: string) => void;
}

export interface UsePlateFormReturn {
  plate: string;
  setPlate: (plate: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  isValid: boolean;
  errors: string[];
  reset: () => void;
}

// Função para aplicar máscara na placa
export function maskPlate(value: string): string {
  let v = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  if (v.length <= 3) return v;
  if (v.length <= 7) return v.slice(0, 3) + '-' + v.slice(3, 7);
  return v.slice(0, 3) + '-' + v.slice(3, 7);
}

// Função para validar caractere da placa
export function isValidPlateChar(char: string, pos: number): boolean {
  if (pos < 3) return /[A-Z]/.test(char);
  if (pos === 3) return /[0-9]/.test(char);
  if (pos === 4) return /[A-Z0-9]/.test(char);
  if (pos > 4 && pos < 7) return /[0-9]/.test(char);
  return false;
}

// Função para validar placa completa
export function validatePlate(plate: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const cleanPlate = plate.replace(/[^a-zA-Z0-9]/g, "");
  
  if (cleanPlate.length === 0) {
    errors.push("Placa é obrigatória");
  } else if (cleanPlate.length < 7) {
    errors.push("Placa deve ter 7 caracteres");
  } else {
    // Validar formato da placa
    const letters = cleanPlate.slice(0, 3);
    const numbers = cleanPlate.slice(3, 7);
    
    if (!/^[A-Z]{3}$/.test(letters)) {
      errors.push("Primeiros 3 caracteres devem ser letras");
    }
    
    if (!/^[0-9]{4}$/.test(numbers)) {
      errors.push("Últimos 4 caracteres devem ser números");
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function usePlateForm(options: UsePlateFormOptions = {}): UsePlateFormReturn {
  const { initialPlate = "", onSubmit, onPlateChange } = options;
  
  const [plate, setPlateState] = useState(initialPlate);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const setPlate = useCallback((newPlate: string) => {
    setPlateState(newPlate);
    onPlateChange?.(newPlate);
  }, [onPlateChange]);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (value.length > 7) value = value.slice(0, 7);
    const maskedValue = maskPlate(value);
    setPlate(maskedValue);
  }, [setPlate]);
  
  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const pos = plate.replace(/[^a-zA-Z0-9]/g, "").length;
    const char = e.key.toUpperCase();
    
    if (e.ctrlKey || e.metaKey || e.altKey || 
        ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)) {
      return;
    }
    
    if (!isValidPlateChar(char, pos)) {
      e.preventDefault();
    }
  }, [plate]);
  
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validatePlate(plate);
    
    if (validation.isValid) {
      onSubmit?.({ plate });
    }
  }, [plate, onSubmit]);
  
  const reset = useCallback(() => {
    setPlateState(initialPlate);
  }, [initialPlate]);
  
  const validation = validatePlate(plate);
  
  return {
    plate,
    setPlate,
    handleChange,
    handleKeyPress,
    handleSubmit,
    inputRef,
    isValid: validation.isValid,
    errors: validation.errors,
    reset
  };
} 