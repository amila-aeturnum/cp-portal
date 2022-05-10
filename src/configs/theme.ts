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
export const enum cpColor {
	primary = '#352B61',
	primaryBackground = "#FFFFFF",
	disableBackgroundLight = '#E9E9EB'
}

export const theme = createTheme({
	primary: {
		main: '#00000'
	},
	secondary: {
		main: cpColor.primary
	},
	palette: {
		mode: 'light',
	},
	components: {
		MuiButton:{
			variants:[
				{
					props: { variant : 'contained'},
					style:{
						backgroundColor: cpColor.primary,
						fontWeight:700,
						transform: 'none',
						fontSize: '0.875em',
						fontFamily: 'Poppins'
					},
				}
			]
		}
	},
	typography: {
		button: {
			textTransform: 'none'
		}
	}
});
