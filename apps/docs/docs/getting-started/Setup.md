# Setup

The following is a list of **required setup steps** in your app's scaffold.

## 1. Install Theme

```tsx
// App.jsx
import { ThemeProvider, createTheme, styleConfig } from '@gravis-os/*'

const theme = createTheme(styleConfig.baseTheme)

const App = () => (
	<ThemeProvider theme={theme}>
		...
	</ThemeProvider>
)
```

## 2. Install Supabase

**Installing** **Supabase**: Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to your app's .env file like so:

```
NEXT_PUBLIC_SUPABASE_URL=http://localhost:6006
NEXT_PUBLIC_SUPABASE_ANON_KEY=MOCK
```
