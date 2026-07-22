import { createTheme } from '@mui/material/styles';

// Single source of truth for colors. Tailwind's config mirrors these
// manually since the two tools don't share config natively.
export const tokens = {
  bg: '#09090B',
  surface: '#18181B',
  ink: '#FAFAFA',
  blue: '#3B82F6',
  violet: '#8B5CF6',
  cyan: '#06B6D4'
};

const theme = createTheme({
  direction: 'ltr',
  palette: {
    mode: 'dark',
    background: {
      default: tokens.bg,
      paper: tokens.surface
    },
    text: {
      primary: tokens.ink,
      secondary: 'rgba(250, 250, 250, 0.64)'
    },
    primary: { main: tokens.blue },
    secondary: { main: tokens.violet },
    info: { main: tokens.cyan },
    success: { main: '#22C55E' },
    error: { main: '#EF4444' },
    divider: 'rgba(250, 250, 250, 0.08)'
  },
  shape: {
    borderRadius: 16
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif"
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#27272A',
          fontSize: '0.75rem'
        }
      }
    }
  }
});

export default theme;
