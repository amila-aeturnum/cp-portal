import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from 'components/templates/Layout';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'configs/theme';
import { Router } from 'next/router';
import { useState } from 'react';
import Loader from 'components/atoms/Loader';

function MyApp({ Component, pageProps }: AppProps) {
	const [loading, setLoading] = useState(false);

	Router.events.on('routeChangeStart', () => setLoading(true));
	Router.events.on('routeChangeComplete', () => setLoading(false));

	return (
		<ThemeProvider theme={theme}>
			<Layout>{!loading ? <Component {...pageProps} /> : <Loader />}</Layout>
		</ThemeProvider>
	);
}

export default MyApp;
