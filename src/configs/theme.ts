import { createTheme, PaletteOptions, SimplePaletteColorOptions } from '@mui/material/styles';

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
	interface SimplePaletteColorOptions {
		cpSwitch?: {
			primaryBackground: string;
			disableBackground: string;
		};
	  }
	
	  interface  PaletteColor {
		cpSwitch?: {
			primaryBackground: string;
			disableBackground: string;
		};
	  }
}

interface DefaultPaletteOptions extends PaletteOptions {
	primary?: SimplePaletteColorOptions;
  }
  const DefaultPalette = (): DefaultPaletteOptions => {
	return {
		mode: 'light',
		primary: {
		main: "#352B61",
		cpSwitch: {
			primaryBackground: "#FFFFFF",
			disableBackground: "#E9E9EB"
		},
	  }
	};
  };
  
	const defaultColors = DefaultPalette();
	
	const palette: PaletteOptions = {
	  ...defaultColors,
	};

export const theme = createTheme({
	primary: {
		main: '#00000'
	},
	secondary: {
		main: '#352B61'
	},
	palette,
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
						"&:hover": {
							backgroundColor: '#352B61',
						  }
					},
				}
			]
		}
	},
	typography: {
		fontFamily: 'Poppins',
		button: {
			textTransform: 'none'
		}
	}
});
