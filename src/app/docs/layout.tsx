"use client";

import { Box, AppBar, Toolbar, Typography, Button, Container, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import PaletteIcon from '@mui/icons-material/Palette';
import BugReportIcon from '@mui/icons-material/BugReport';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '../../components/ThemeRegistry';

const DRAWER_WIDTH = 280;

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { mode, toggleColorMode } = useColorMode();
  const theme = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { text: 'Visão Geral', icon: <InfoIcon />, href: '#overview' },
    { text: 'Exemplos Práticos', icon: <CodeIcon />, href: '#examples' },
    { text: 'Comparações Visuais', icon: <PaletteIcon />, href: '#comparisons' },
    { text: 'Informações Técnicas', icon: <BugReportIcon />, href: '#technical' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setDrawerOpen(false);
  };

  if (!mounted) {
    return <div style={{ minHeight: '100vh' }} />;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Toolbar>
          <IconButton
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ 
              mr: 2,
              color: theme.palette.text.primary
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
            📚 Documentação - Componentes de Placa
          </Typography>
          
          <IconButton
            onClick={toggleColorMode}
            sx={{ 
              mr: 2,
              color: theme.palette.text.primary
            }}
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button 
              startIcon={<HomeIcon />}
              sx={{ 
                backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
                }
              }}
            >
              Voltar ao Sistema
            </Button>
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: DRAWER_WIDTH,
            backgroundColor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider'
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <Typography variant="h6" sx={{ px: 3, py: 2, color: 'primary.main' }}>
            Navegação
          </Typography>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  onClick={() => scrollToSection(item.href)}
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'primary.main' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ px: 3, py: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              Versão: 1.0.0
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Última atualização: {new Date().toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8,
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="xl" sx={{ py: 3 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
} 