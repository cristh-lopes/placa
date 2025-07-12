"use client";
import { useState, ChangeEvent, FormEvent, KeyboardEvent, useRef } from "react";
import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function maskPlate(value: string) {
  let v = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  if (v.length <= 3) return v;
  if (v.length <= 7) return v.slice(0, 3) + '-' + v.slice(3, 7);
  return v.slice(0, 3) + '-' + v.slice(3, 7);
}

function isValidPlateChar(char: string, pos: number) {
  if (pos < 3) return /[A-Z]/.test(char);
  if (pos === 3) return /[0-9]/.test(char);
  if (pos === 4) return /[A-Z0-9]/.test(char);
  if (pos > 4 && pos < 7) return /[0-9]/.test(char);
  return false;
}

export default function PlateSearchForm() {
  const [plate, setPlate] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Buscar placa: ${plate}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (value.length > 7) value = value.slice(0, 7);
    setPlate(maskPlate(value));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    const pos = plate.replace(/[^a-zA-Z0-9]/g, "").length;
    const char = e.key.toUpperCase();
    if (e.ctrlKey || e.metaKey || e.altKey || ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)) return;
    if (!isValidPlateChar(char, pos)) {
      e.preventDefault();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", maxWidth: 400, margin: "0 auto", px: 0 }}>
      <Paper elevation={8}
        sx={{
          p: 0,
          bgcolor: "#fff",
          borderRadius: 2,
          border: "4px solid #111",
          position: "relative",
          mb: 3,
          overflow: "hidden",
          boxShadow: "0 4px 16px 0 rgba(0,0,0,0.10)",
          width: '100%',
          maxWidth: 400,
          minWidth: 0,
          aspectRatio: '3.1/1',
          minHeight: 80,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Faixa azul superior */}
        <Box sx={{
          width: "100%",
          height: 32,
          bgcolor: "#0055A5",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1.5,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          flexWrap: 'wrap',
          minWidth: 0,
        }}>
          <Typography variant="caption" sx={{ color: "#fff", fontWeight: 700, fontSize: 10, letterSpacing: 1.2 }}>
            MERCOSUL
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 700, letterSpacing: 2, fontSize: 15 }}>
            BRASIL
          </Typography>
          <Box sx={{ width: 22, height: 15, ml: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="15" viewBox="0 0 38 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="38" height="26" rx="2" fill="#009B3A" />
              <polygon points="19,4 34,13 19,22 4,13" fill="#FEDF00" />
              <circle cx="19" cy="13" r="7" fill="#3E4095" />
              <ellipse cx="19" cy="13" rx="6" ry="2" fill="#fff" transform="rotate(-15 19 13)" />
            </svg>
          </Box>
        </Box>
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
        }}>
          <TextField
            inputRef={inputRef}
            label=""
            variant="standard"
            required
            value={plate}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            inputProps={{
              style: {
                textTransform: "uppercase",
                fontWeight: 900,
                fontSize: '64px',
                letterSpacing: 2,
                lineHeight: 1,
                textAlign: "center",
                background: "#fff",
                color: "#111",
                border: "none",
                width: '100%',
                height: '100%',
                padding: 0,
                margin: 0,
                fontFamily: 'Rajdhani, Arial, sans-serif',
                verticalAlign: 'middle',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
              maxLength: 8,
            }}
            sx={{
              width: '100%',
              height: '100%',
              background: "#fff",
              borderRadius: 0,
              boxShadow: "none",
              border: "none",
              mx: 0,
              p: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              '& input': {
                fontSize: '64px',
                letterSpacing: 2,
                fontWeight: 900,
                fontFamily: 'Rajdhani, Arial, sans-serif',
                lineHeight: 1,
                textAlign: 'center',
                background: '#fff',
                color: '#111',
                border: 'none',
                width: '100%',
                height: '100%',
                padding: 0,
                margin: 0,
                verticalAlign: 'middle',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
              '& .MuiInputBase-root': {
                borderRadius: 0,
                background: '#fff',
                border: 'none',
                boxShadow: 'none',
                px: 0,
                py: 0,
                height: '100%',
                alignItems: 'center',
                display: 'flex',
                minWidth: 0,
              },
              '& .MuiInput-underline:before, & .MuiInput-underline:after': {
                borderBottom: 'none',
              },
            }}
          />
        </Box>
      </Paper>
      <Button
        type="submit"
        variant="contained"
        color="primary"
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
        Buscar
      </Button>
    </Box>
  );
} 