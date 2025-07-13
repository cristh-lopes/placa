"use client";
import React from 'react';
import { Box, Button, Typography, Alert } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Plate from './Plate';
import { usePlateForm, UsePlateFormOptions } from '../hooks/usePlateForm';

export interface PlateFormProps extends UsePlateFormOptions {
  buttonText?: string;
  showErrors?: boolean;
  showButton?: boolean;
  plateSize?: 'small' | 'medium' | 'large';
  plateVariant?: 'default' | 'outlined' | 'minimal';
  buttonVariant?: 'contained' | 'outlined' | 'text';
  buttonColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  className?: string;
  sx?: any;
}

export default function PlateForm({
  buttonText = "Buscar",
  showErrors = true,
  showButton = true,
  plateSize = 'large',
  plateVariant = 'default',
  buttonVariant = 'contained',
  buttonColor = 'primary',
  className,
  sx = {},
  ...hookOptions
}: PlateFormProps) {
  const {
    plate,
    handleChange,
    handleKeyPress,
    handleSubmit,
    inputRef,
    isValid,
    errors,
    reset
  } = usePlateForm(hookOptions);

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      className={className}
      sx={{ 
        width: "100%", 
        maxWidth: 400, 
        margin: "0 auto", 
        px: 0,
        ...sx 
      }}
    >
      {/* Placa */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        <Plate
          value={plate}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          inputRef={inputRef}
          size={plateSize}
          variant={plateVariant}
          placeholder="ABC-1234"
        />
      </Box>

      {/* Mensagens de erro */}
      {showErrors && errors.length > 0 && (
        <Box sx={{ mb: 2 }}>
          {errors.map((error, index) => (
            <Alert 
              key={index} 
              severity="error" 
              sx={{ mb: 1 }}
            >
              {error}
            </Alert>
          ))}
        </Box>
      )}

      {/* Botão de busca */}
      {showButton && (
        <Button
          type="submit"
          variant={buttonVariant}
          color={buttonColor}
          disabled={!isValid}
          sx={{
            width: '100%',
            height: 48,
            borderRadius: 2,
            fontWeight: 700,
            fontSize: 16,
            mt: 1,
          }}
          startIcon={<SearchIcon />}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
} 