import { ThemeOptions } from '@mui/material'

// Colors
const neutral = {
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
}
const background = {
  default: '#0B0F19', // Body background color
  muted: neutral[900],
  paper: neutral[800],
}
const divider = '#2D3748'
const primary = {
  contrastText: '#fff',
  dark: '#134B63',
  light: '#f5fcff',
  main: '#36a1cf',
}
const secondary = {
  contrastText: '#fff',
  dark: '#0B815A',
  light: '#3FC79A',
  main: '#10B981',
}
const success = {
  contrastText: neutral[900],
  dark: '#0E8074',
  light: '#43C6B7',
  main: '#14B8A6',
}
const info = {
  contrastText: neutral[900],
  dark: '#0B79D0',
  light: '#64B6F7',
  main: '#2196F3',
}
const warning = {
  contrastText: neutral[900],
  dark: '#B27B16',
  light: '#FFBF4C',
  main: '#FFB020',
}
const error = {
  contrastText: neutral[900],
  dark: '#922E2E',
  light: '#DA6868',
  main: '#D14343',
}
const text = {
  disabled: 'rgba(255, 255, 255, 0.48)',
  primary: '#edf2f7',
  secondary: '#A0AEC0',
}

const deviasThemeDark: ThemeOptions = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[500],
          color: '#FFFFFF',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            color: text.secondary,
            opacity: 1,
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: 'solid',
          borderWidth: 1,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: divider,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: 'solid',
          borderWidth: 1,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: neutral[700],
        },
        track: {
          backgroundColor: neutral[500],
          opacity: 1,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${divider}`,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '.MuiTableCell-root': {
            color: neutral[300],
          },
          backgroundColor: neutral[800],
        },
      },
    },
  },
  palette: {
    action: {
      active: neutral[400],
      disabled: 'rgba(255, 255, 255, 0.26)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      hover: 'rgba(255, 255, 255, 0.04)',
      selected: 'rgba(255, 255, 255, 0.08)',
    },
    background,
    divider,
    error,
    info,
    mode: 'dark',
    neutral,
    primary,
    secondary,
    success,
    text,
    warning,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.24)',
    '0px 1px 2px rgba(0, 0, 0, 0.24)',
    '0px 1px 4px rgba(0, 0, 0, 0.24)',
    '0px 1px 5px rgba(0, 0, 0, 0.24)',
    '0px 1px 6px rgba(0, 0, 0, 0.24)',
    '0px 2px 6px rgba(0, 0, 0, 0.24)',
    '0px 3px 6px rgba(0, 0, 0, 0.24)',
    '0px 4px 6px rgba(0, 0, 0, 0.24)',
    '0px 5px 12px rgba(0, 0, 0, 0.24)',
    '0px 5px 14px rgba(0, 0, 0, 0.24)',
    '0px 5px 15px rgba(0, 0, 0, 0.24)',
    '0px 6px 15px rgba(0, 0, 0, 0.24)',
    '0px 7px 15px rgba(0, 0, 0, 0.24)',
    '0px 8px 15px rgba(0, 0, 0, 0.24)',
    '0px 9px 15px rgba(0, 0, 0, 0.24)',
    '0px 10px 15px rgba(0, 0, 0, 0.24)',
    '0px 12px 22px -8px rgba(0, 0, 0, 0.24)',
    '0px 13px 22px -8px rgba(0, 0, 0, 0.24)',
    '0px 14px 24px -8px rgba(0, 0, 0, 0.24)',
    '0px 20px 25px rgba(0, 0, 0, 0.24)',
    '0px 25px 50px rgba(0, 0, 0, 0.24)',
    '0px 25px 50px rgba(0, 0, 0, 0.24)',
    '0px 25px 50px rgba(0, 0, 0, 0.24)',
    '0px 25px 50px rgba(0, 0, 0, 0.24)',
  ],
}

export default deviasThemeDark
