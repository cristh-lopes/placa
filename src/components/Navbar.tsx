"use client";
import { AppBar, Toolbar, Typography, IconButton, Box, useTheme } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from '@mui/icons-material/Menu';
import { useColorMode } from "./ThemeRegistry";

export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { mode, toggleColorMode } = useColorMode();
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        zIndex: 1300,
        width: '100%',
        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
        background: mode === "dark"
          ? theme.palette.background.paper
          : theme.palette.primary.main,
        transition: 'background 0.2s',
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Botão de menu só no mobile */}
          {onMenuClick && (
            <IconButton
              onClick={onMenuClick}
              sx={{ color: '#fff', display: { xs: 'inline-flex', sm: 'none' }, mr: 1 }}
              edge="start"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ fontWeight: 700, letterSpacing: 2, color: '#fff' }}>
            FIPE Placas
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={toggleColorMode} sx={{ color: '#fff' }}>
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 