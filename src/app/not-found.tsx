"use client";
import { Box, Typography, Button, useTheme } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useColorMode } from "../components/ThemeRegistry";

// SVG do Storyset: https://storyset.com/illustration/404-error-with-person-looking-for/bro
const NotFoundSVG = () => {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  
  return (
    <Box sx={{ maxWidth: 750, width: "100%", mb: 2 }}>
      <Image
        src={isDark ? "/404 error-dark.svg" : "/404 error.svg"}
        alt="404 Error Illustration"
        width={750}
        height={500}
        style={{ 
          width: '100%', 
          height: 'auto',
          maxWidth: '100%',
          display: 'block'
        }}
        priority
      />
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Ilustração por <a href="https://storyset.com/web" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'underline' }}>Storyset</a>
      </Typography>
    </Box>
  );
};

export default function NotFound() {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
        py: 4,
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        transition: 'all 0.2s',
      }}
    >
      <NotFoundSVG />
      
      <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 500 }}>
        Página não encontrada
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
        Desculpe, a página que você está procurando não existe ou foi movida.
      </Typography>
      
      <Button
        component={Link}
        href="/"
        variant="contained"
        size="large"
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: 2,
          textTransform: 'none',
          fontSize: '1.1rem',
          fontWeight: 500,
        }}
      >
        Voltar ao início
      </Button>
    </Box>
  );
} 