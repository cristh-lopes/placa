"use client";
import React from 'react';
import { Box, Typography, Paper, Divider, useTheme } from "@mui/material";
import Plate from './Plate';
import PlateForm from './PlateForm';
import { usePlateForm } from '../hooks/usePlateForm';

export default function PlateExamples() {
  const theme = useTheme();
  
  const readOnlyPlate = "ABC-1234";

  const plateHook = usePlateForm({
    initialPlate: "XYZ-5678",
    onPlateChange: (plate) => console.log('Placa alterada via hook:', plate),
    onSubmit: (data) => alert(`Submissão via hook: ${data.plate}`)
  });

  const smallPlateHook = usePlateForm({
    onPlateChange: (plate) => console.log('Placa pequena:', plate)
  });

  return (
    <Box sx={{ p: 3, maxWidth: 1400, margin: '0 auto' }}>
      <Typography variant="h2" sx={{ mb: 2, textAlign: 'center', color: theme.palette.primary.main, fontWeight: 'bold' }}>
        📚 Documentação dos Componentes de Placa
      </Typography>
      
      <Typography variant="h5" sx={{ mb: 4, textAlign: 'center', color: theme.palette.text.secondary }}>
        Guia completo de uso, exemplos e referência da API
      </Typography>

      <Paper id="overview" sx={{ p: 4, mb: 4, backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h4" sx={{ mb: 3, color: theme.palette.primary.main }}>
          🚀 Visão Geral
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6, color: theme.palette.text.primary }}>
          Este sistema de componentes permite criar placas de veículo brasileiras de forma reutilizável e flexível. 
          Os componentes incluem validação automática, máscara de formatação e múltiplas opções de customização.
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.6, color: theme.palette.text.primary }}>
          <strong>Principais recursos:</strong> Validação em tempo real, máscara automática (ABC-1234), 
          3 tamanhos diferentes, 3 variantes visuais, estados (normal, desabilitado, somente leitura).
        </Typography>
      </Paper>

      <Typography id="examples" variant="h3" sx={{ mb: 4, textAlign: 'center', color: theme.palette.primary.main }}>
        🎯 Exemplos Práticos
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: 4 
      }}>
        <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
            1. Placa Somente Leitura
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.secondary }}>
            Tamanho: Medium | Variante: Outlined
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Plate
              value={readOnlyPlate}
              readOnly={true}
              size="medium"
              variant="outlined"
            />
          </Box>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            Ideal para exibir placas em modo somente leitura
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
            2. Placa com Hook Personalizado
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.secondary }}>
            Tamanho: Medium | Variante: Default
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Plate
              value={plateHook.plate}
              onChange={plateHook.handleChange}
              onKeyDown={plateHook.handleKeyPress}
              inputRef={plateHook.inputRef}
              size="medium"
              variant="default"
            />
          </Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Válida: <span style={{ color: plateHook.isValid ? '#4CAF50' : '#f44336', fontWeight: 'bold' }}>
              {plateHook.isValid ? 'Sim' : 'Não'}
            </span>
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            Usando usePlateForm hook com validação
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
            3. Placa Pequena
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.secondary }}>
            Tamanho: Small | Variante: Minimal
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Plate
              value={smallPlateHook.plate}
              onChange={smallPlateHook.handleChange}
              onKeyDown={smallPlateHook.handleKeyPress}
              inputRef={smallPlateHook.inputRef}
              size="small"
              variant="minimal"
              showMercosul={false}
              showBrazil={false}
              showFlag={false}
            />
          </Box>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            Versão compacta sem elementos decorativos
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
            4. Formulário Completo
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.secondary }}>
            Tamanho: Medium | Variante: Outlined
          </Typography>
          <PlateForm
            onSubmit={(data) => alert(`Formulário submetido: ${data.plate}`)}
            onPlateChange={(plate) => console.log('Formulário:', plate)}
            buttonText="Consultar"
            plateSize="medium"
            plateVariant="outlined"
            buttonColor="success"
            showErrors={true}
          />
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: 1, display: 'block' }}>
            Componente PlateForm com validação e botão
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
            5. Formulário sem Botão
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.secondary }}>
            Tamanho: Medium | Variante: Minimal
          </Typography>
          <PlateForm
            onSubmit={(data) => console.log('Sem botão:', data.plate)}
            onPlateChange={(plate) => console.log('Mudança:', plate)}
            showButton={false}
            plateSize="medium"
            plateVariant="minimal"
            showErrors={false}
          />
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: 1, display: 'block' }}>
            Apenas o input da placa sem botão de submissão
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
            6. Placa Desabilitada
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.secondary }}>
            Tamanho: Medium | Variante: Default
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Plate
              value="DEF-9999"
              disabled={true}
              size="medium"
              variant="default"
            />
          </Box>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            Estado desabilitado para placas não editáveis
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ my: 4, backgroundColor: theme.palette.divider }} />

      <Typography id="comparisons" variant="h3" sx={{ mb: 4, textAlign: 'center', color: theme.palette.primary.main }}>
        📊 Comparações Visuais
      </Typography>

      <Paper sx={{ p: 3, textAlign: 'center', mb: 4, backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h5" sx={{ mb: 3, color: theme.palette.primary.main }}>
          Comparação de Tamanhos
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: 3,
          flexWrap: 'wrap'
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.secondary }}>Small</Typography>
            <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>200x60px</Typography>
            <Plate
              value="ABC-1234"
              readOnly={true}
              size="small"
              variant="outlined"
            />
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.secondary }}>Medium</Typography>
            <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>300x80px</Typography>
            <Plate
              value="ABC-1234"
              readOnly={true}
              size="medium"
              variant="outlined"
            />
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.secondary }}>Large</Typography>
            <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>400x100px</Typography>
            <Plate
              value="ABC-1234"
              readOnly={true}
              size="large"
              variant="outlined"
            />
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, textAlign: 'center', mb: 4, backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h5" sx={{ mb: 3, color: theme.palette.primary.main }}>
          Comparação de Variantes
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: 3,
          flexWrap: 'wrap'
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.secondary }}>Default</Typography>
            <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>Borda grossa</Typography>
            <Plate
              value="ABC-1234"
              readOnly={true}
              size="medium"
              variant="default"
            />
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.secondary }}>Outlined</Typography>
            <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>Borda fina</Typography>
            <Plate
              value="ABC-1234"
              readOnly={true}
              size="medium"
              variant="outlined"
            />
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.secondary }}>Minimal</Typography>
            <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>Borda sutil</Typography>
            <Plate
              value="ABC-1234"
              readOnly={true}
              size="medium"
              variant="minimal"
            />
          </Box>
        </Box>
      </Paper>

      <Divider sx={{ my: 4, backgroundColor: theme.palette.divider }} />

      <Paper id="technical" sx={{ p: 4, backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h3" sx={{ mb: 3, color: theme.palette.primary.main }}>
          🔧 Informações Técnicas
        </Typography>
        
        <Typography variant="h5" sx={{ mb: 2, color: theme.palette.text.primary }}>
          Como Acessar
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6, color: theme.palette.text.primary }}>
          Esta documentação está disponível em <strong>/docs</strong> e não aparece no sistema principal. 
          Para acessar, digite diretamente na URL: <code style={{ backgroundColor: theme.palette.mode === 'light' ? '#f0f0f0' : '#333', padding: '2px 4px', borderRadius: '4px' }}>http://localhost:3001/docs</code>
        </Typography>

        <Typography variant="h5" sx={{ mb: 2, color: theme.palette.text.primary }}>
          Estrutura dos Arquivos
        </Typography>
        <Box sx={{ fontFamily: 'monospace', backgroundColor: theme.palette.mode === 'light' ? '#f0f0f0' : '#333', p: 2, borderRadius: 1, mb: 3, color: theme.palette.text.primary }}>
          <div>src/</div>
          <div>├── hooks/</div>
          <div>│   └── usePlateForm.ts</div>
          <div>├── components/</div>
          <div>│   ├── Plate.tsx</div>
          <div>│   ├── PlateForm.tsx</div>
          <div>│   ├── PlateExamples.tsx</div>
          <div>│   └── index.ts</div>
          <div>└── app/</div>
          <div>    ├── page.tsx (sistema principal)</div>
          <div>    └── docs/page.tsx (documentação)</div>
        </Box>

        <Typography variant="h5" sx={{ mb: 2, color: theme.palette.text.primary }}>
          Tecnologias Utilizadas
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.6, color: theme.palette.text.primary }}>
          <strong>React 18</strong> + <strong>Next.js 15</strong> + <strong>TypeScript</strong> + <strong>Material-UI</strong>
        </Typography>
      </Paper>
    </Box>
  );
} 