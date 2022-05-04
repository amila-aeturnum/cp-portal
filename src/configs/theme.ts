import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Theme {
		primary: {
			main: string;
		};
		secondary: {
			main: string;
		};
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		primary?: {
			main?: string;
		};
		secondary?: {
			main?: string;
		};
	}
}

export const theme = createTheme({
	primary: {
		main: '#000'
	},
	secondary: {
		main: '#000'
	},
	palette: {
		mode: 'light'
	}
});
