# Setup

Gravis is composed from the [React](https://reactjs.org/), [Ant Design](https://ant.design/), and [Material UI](https://mui.com/) libraries.

The following is a list of **required setup steps** in your app's scaffold. 

### 1. Install the MUI Theme
Refer to the [MUI Theme](https://mui.com/material-ui/customization/default-theme/) for customization of the theme object.

```jsx-no-render
// App.jsx
import { ThemeProvider, createTheme, styleConfig } from '@gravis-os'

// Customize your theme here by extending the `styleConfig.baseTheme` object.
const theme = createTheme(styleConfig.baseTheme)

const App = () => (
	<ThemeProvider theme={theme}>
		...
	</ThemeProvider>
)
```

### 2. Install the Ant Design Styles & Dynamic Theme
Enable [Antd Design's Dynamic Theming](https://ant.design/docs/react/customize-theme-variable) by using the [Antd ConfigProvider](https://ant.design/components/config-provider/).

```jsx-no-render
// App.jsx
import { ConfigProvider } from 'antd'
import 'antd/dist/antd.less' // Import Antd less to customize Antd theme via less variables

const App = () => (
	<ConfigProvider>
		<ThemeProvider>
      ...
		</ThemeProvider>
	</ConfigProvider>
)
```

### 3. Install the Gravis Font
Install the official Gravis font, **Jost** via the [Google Fonts CDN](https://fonts.google.com/)

```jsx-no-render
// index.html

<head>
  ..
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap" rel="stylesheet">
  ...
</head>
```
