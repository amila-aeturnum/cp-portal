import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from 'components/templates/Layout';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'configs/theme';
import { Router } from 'next/router';
import { useState } from 'react';
import Loader from 'components/atoms/Loader';
import { MsalAuthenticationTemplate, MsalProvider } from '@azure/msal-react';
import { msalConfig } from 'configs/azureConfig';
import { PublicClientApplication } from '@azure/msal-browser';
import { InteractionType } from '@azure/msal-browser';

function MyApp({ Component, pageProps }: AppProps) {
	const [loading, setLoading] = useState(false);

	Router.events.on('routeChangeStart', () => setLoading(true));
	Router.events.on('routeChangeComplete', () => setLoading(false));

	const msalInstance = new PublicClientApplication(msalConfig);

	return (
		<MsalProvider instance={msalInstance}>
			<ThemeProvider theme={theme}>
				<Layout>
					<MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
						<div>{!loading ? <Component {...pageProps} /> : <Loader />}</div>
					</MsalAuthenticationTemplate>
				</Layout>
			</ThemeProvider>
		</MsalProvider>
	);
}

export default MyApp;
