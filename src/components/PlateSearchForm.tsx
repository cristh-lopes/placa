"use client";
import React from 'react';
import PlateForm from './PlateForm';
import { PlateFormData } from '../hooks/usePlateForm';

export default function PlateSearchForm() {
  const handleSubmit = (data: PlateFormData) => {
    alert(`Buscar placa: ${data.plate}`);
  };

  const handlePlateChange = (plate: string) => {
    console.log('Placa alterada:', plate);
  };

  return (
    <PlateForm
      onSubmit={handleSubmit}
      onPlateChange={handlePlateChange}
      buttonText="Buscar Placa"
      plateSize="large"
      plateVariant="default"
      showErrors={true}
      showButton={true}
    />
  );
} 