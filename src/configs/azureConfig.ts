const tenantName = 'devconversionpath';
const signInPolicy = 'B2C_1A_SIGNUP_SIGNIN_FORCEPASSWORDRESET';
const AuthorityUrl = `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${signInPolicy}`;
const PasswordResetAuthorityUrl = `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/B2C_1A_PASSWORDRESET`;
const clientID = '0527feb0-5ebb-4096-8c5d-0ffeb4df4b8a';
const scope = `${clientID} openid offline_access`;
const msalConfig = {
	auth: {
		clientId: clientID,
		authority: AuthorityUrl,  // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
		redirectUri: typeof window !== 'undefined' ? window.location.origin : '',
		knownAuthorities: [`${tenantName}.b2clogin.com`],
		validateAuthority: false,
		postLogoutRedirectUri: typeof window !== 'undefined' ? window.location.origin : '',
		navigateToLoginRequestUrl: false
	},
	cache: {
		cacheLocation: 'sessionStorage', // This configures where your cache will be stored
		storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
	}
};

const forgotPasswordRequest = {
	scopes: [scope],
	authority: PasswordResetAuthorityUrl,
	navigateToLoginRequestUrl: false
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
const loginRequest = {
	scopes: [scope]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
const graphConfig = {
	graphMeEndpoint: 'https://graph.microsoft.com/oidc/userinfo'
};
//graph.windows.net

export { msalConfig, loginRequest, graphConfig, forgotPasswordRequest };
