"use client";
import React from 'react';
import { Box, TextField, Typography, useTheme } from "@mui/material";

export interface PlateProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'outlined' | 'minimal';
  showMercosul?: boolean;
  showBrazil?: boolean;
  showFlag?: boolean;
  className?: string;
  sx?: any;
}

const sizeStyles = {
  small: {
    width: 200,
    height: 65,
    fontSize: '32px',
    headerHeight: 20,
    headerFontSize: 8,
    countryFontSize: 12,
    flagSize: 16,
  },
  medium: {
    width: 300,
    height: 90,
    fontSize: '48px',
    headerHeight: 24,
    headerFontSize: 9,
    countryFontSize: 13,
    flagSize: 18,
  },
  large: {
    width: 400,
    height: 115,
    fontSize: '64px',
    headerHeight: 32,
    headerFontSize: 10,
    countryFontSize: 15,
    flagSize: 22,
  },
};

const getVariantStyles = (theme: any) => ({
  default: {
    border: `4px solid ${theme.palette.mode === 'light' ? '#111' : '#333'}`,
    boxShadow: theme.palette.mode === 'light' 
      ? "0 4px 16px 0 rgba(0,0,0,0.10)" 
      : "0 4px 16px 0 rgba(0,0,0,0.30)",
    borderRadius: 2,
  },
  outlined: {
    border: `2px solid ${theme.palette.mode === 'light' ? '#ccc' : '#555'}`,
    boxShadow: theme.palette.mode === 'light' 
      ? "0 2px 8px 0 rgba(0,0,0,0.05)" 
      : "0 2px 8px 0 rgba(0,0,0,0.20)",
    borderRadius: 1,
  },
  minimal: {
    border: `1px solid ${theme.palette.mode === 'light' ? '#eee' : '#333'}`,
    boxShadow: "none",
    borderRadius: 1,
  },
});

export default function Plate({
  value,
  onChange,
  onKeyDown,
  inputRef,
  disabled = false,
  readOnly = false,
  placeholder = "",
  size = 'large',
  variant = 'default',
  showMercosul = true,
  showBrazil = true,
  showFlag = true,
  className,
  sx = {},
}: PlateProps) {
  const theme = useTheme();
  const sizeConfig = sizeStyles[size];
  const variantConfig = getVariantStyles(theme)[variant];

  return (
    <Box
      className={className}
      sx={{
        width: sizeConfig.width,
        height: sizeConfig.height,
        bgcolor: theme.palette.background.paper,
        position: "relative",
        display: 'flex',
        flexDirection: 'column',
        ...variantConfig,
        ...sx,
      }}
    >
      {/* Faixa azul superior */}
      {showMercosul && (
        <Box sx={{
          width: "100%",
          height: sizeConfig.headerHeight,
          bgcolor: "#0055A5",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1.5,
          borderTopLeftRadius: variantConfig.borderRadius,
          borderTopRightRadius: variantConfig.borderRadius,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          flexWrap: 'wrap',
          minWidth: 0,
        }}>
          {showMercosul && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: "#fff", 
                fontWeight: 700, 
                fontSize: sizeConfig.headerFontSize, 
                letterSpacing: 1.2 
              }}
            >
              MERCOSUL
            </Typography>
          )}
          {showBrazil && (
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: "#fff", 
                fontWeight: 700, 
                letterSpacing: 2, 
                fontSize: sizeConfig.countryFontSize 
              }}
            >
              BRASIL
            </Typography>
          )}
          {showFlag && (
            <Box sx={{ 
              width: sizeConfig.flagSize, 
              height: sizeConfig.flagSize * 0.68, 
              ml: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <svg 
                width={sizeConfig.flagSize} 
                height={sizeConfig.flagSize * 0.68} 
                viewBox="0 0 38 26" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="38" height="26" rx="2" fill="#009B3A" />
                <polygon points="19,4 34,13 19,22 4,13" fill="#FEDF00" />
                <circle cx="19" cy="13" r="7" fill="#3E4095" />
                <ellipse cx="19" cy="13" rx="6" ry="2" fill="#fff" transform="rotate(-15 19 13)" />
              </svg>
            </Box>
          )}
        </Box>
      )}
      
      {/* Corpo da placa */}
      <Box sx={{
        flex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        px: 0,
        py: 0,
        position: 'relative',
        minWidth: 0,
        borderBottomLeftRadius: variantConfig.borderRadius,
        borderBottomRightRadius: variantConfig.borderRadius,
        overflow: 'visible',
      }}>
        <TextField
          inputRef={inputRef}
          label=""
          variant="standard"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          InputProps={{
            readOnly: readOnly,
          }}
          placeholder={placeholder}
          inputProps={{
            style: {
              textTransform: "uppercase",
              fontWeight: 900,
              fontSize: sizeConfig.fontSize,
              letterSpacing: 2,
              lineHeight: 'normal',
              textAlign: "center",
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              border: "none",
              width: '100%',
              height: 'auto',
              minHeight: sizeConfig.fontSize,
              padding: 0,
              margin: 0,
              fontFamily: 'Rajdhani, Arial, sans-serif',
              verticalAlign: 'middle',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible',
            },
            maxLength: 8,
          }}
          sx={{
            width: '100%',
            height: 'auto',
            minHeight: sizeConfig.fontSize,
            background: theme.palette.background.paper,
            borderRadius: 0,
            boxShadow: "none",
            border: "none",
            mx: 0,
            p: 0,
            overflow: 'visible',
            '& input': {
              fontSize: sizeConfig.fontSize,
              letterSpacing: 2,
              fontWeight: 900,
              fontFamily: 'Rajdhani, Arial, sans-serif',
              lineHeight: 'normal',
              textAlign: 'center',
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              border: 'none',
              width: '100%',
              height: 'auto',
              minHeight: sizeConfig.fontSize,
              padding: 0,
              margin: 0,
              verticalAlign: 'middle',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible',
            },
            '& input::placeholder': {
              fontSize: sizeConfig.fontSize,
              letterSpacing: 2,
              fontWeight: 900,
              fontFamily: 'Rajdhani, Arial, sans-serif',
              lineHeight: 'normal',
              textAlign: 'center',
              color: theme.palette.text.secondary,
              textTransform: 'uppercase',
            },
            '& .MuiInputBase-root': {
              borderRadius: 0,
              background: theme.palette.background.paper,
              border: 'none',
              boxShadow: 'none',
              px: 0,
              py: 0,
              height: 'auto',
              minHeight: sizeConfig.fontSize,
              alignItems: 'center',
              display: 'flex',
              minWidth: 0,
              justifyContent: 'center',
            },
            '& .MuiInput-underline:before, & .MuiInput-underline:after': {
              borderBottom: 'none',
            },
            '& .Mui-disabled': {
              backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#333',
              '& input': {
                color: theme.palette.text.disabled,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
} 