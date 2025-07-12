"use client";
import { Box, List, ListItem, ListItemText, Divider, ListItemButton, Drawer, useTheme, useMediaQuery, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const SIDEBAR_WIDTH = 220;
const NAVBAR_HEIGHT = 64;
const FOOTER_HEIGHT = 48;

export default function Sidebar({ open, onClose }: { open?: boolean, onClose?: () => void }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={!!open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: SIDEBAR_WIDTH,
            bgcolor: 'background.paper',
            boxShadow: "2px 0 8px 0 rgba(0,0,0,0.08)",
            pt: `${NAVBAR_HEIGHT}px`,
            position: 'relative',
          }
        }}
      >
        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1301 }}>
          <IconButton onClick={() => { 
  if (onClose) { 
    onClose(); 
    console.log('Fechar sidebar chamado'); 
  } 
}} size="large" aria-label="Fechar menu">
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ mt: 5 }}>
          <ListItem disablePadding>
            <ListItemButton selected={true} onClick={onClose}>
              <ListItemText primary="Página Inicial" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={onClose}>
              <ListItemText primary="Outra Página" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    );
  }

  return (
    <Box
      component="nav"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        position: "fixed",
        top: 0,
        left: 0,
        height: `calc(100vh - ${FOOTER_HEIGHT}px)`,
        bgcolor: "background.paper",
        boxShadow: "2px 0 8px 0 rgba(0,0,0,0.08)",
        zIndex: 1200,
        display: { xs: "none", sm: "block" },
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingTop: `${NAVBAR_HEIGHT}px`,
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton selected={true}>
            <ListItemText primary="Página Inicial" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Outra Página" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
} 