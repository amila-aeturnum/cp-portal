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
		main: '#00000'
	},
	secondary: {
		main: '#352B61'
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
						backgroundColor: '#352B61',
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
