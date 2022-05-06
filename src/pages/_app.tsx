import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from 'components/templates/Layout';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'configs/theme';
import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from 'components/atoms/Loader';
import { MsalAuthenticationTemplate, MsalProvider } from '@azure/msal-react';
import { forgotPasswordRequest, msalConfig } from 'configs/azureConfig';
import { AuthError, EventType, PublicClientApplication } from '@azure/msal-browser';
import { InteractionType } from '@azure/msal-browser';

function MyApp({ Component, pageProps }: AppProps) {
	const [loading, setLoading] = useState(false);

	Router.events.on('routeChangeStart', () => setLoading(true));
	Router.events.on('routeChangeComplete', () => setLoading(false));

	const msalInstance = new PublicClientApplication(msalConfig);

	useEffect(() => {
		const callbackId = msalInstance.addEventCallback((event) => {
			if (event.eventType === EventType.LOGIN_FAILURE) {
				if (event.error && (event.error as AuthError).errorMessage.indexOf('AADB2C90118') > -1) {
					if (event.interactionType === InteractionType.Redirect) {
						msalInstance.loginRedirect(forgotPasswordRequest);
					} else if (event.interactionType === InteractionType.Popup) {
						msalInstance.loginPopup(forgotPasswordRequest).catch((e) => {
							console.error(e);
							return;
						});
					}
				}
			}
		});

		return () => {
			if (callbackId) {
				msalInstance.removeEventCallback(callbackId);
			}
		};
	}, []);

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
