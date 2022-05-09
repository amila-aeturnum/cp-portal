const tenantName = 'sachithatestapp2';
const signInPolicy = 'B2C_1A_DEMO_SIGNUP_SIGNIN_FORCEPASSWORDRESET';
const AuthorityUrl = `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${signInPolicy}`;
const PasswordResetAuthorityUrl = `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/B2C_1A_PASSWORDRESET`;
const msalConfig = {
	auth: {
		clientId: 'afcff42d-55cc-45ea-8475-58214904c683', //"e3197c57-b74b-4d2c-98e7-7607f22e91f2",
		authority: AuthorityUrl, //"https://ConversionPathTest.b2clogin.com/ConversionPathTest.onmicrosoft.com/B2C_1_cpsignupandsignin", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
		redirectUri: 'http://localhost:3000',
		knownAuthorities: [`${tenantName}.b2clogin.com`],
		validateAuthority: false,
		postLogoutRedirectUri: 'http://localhost:3000',
		//navigateToLoginRequestUrl: true,
		// client_secret: 'nEo8Q~XyvtT3xjEbGTuCMvocme2bRoJVkMSF.dcm', //"ETb8Q~~WwPfzRa0Lc5-T~w35Ys3JPTqI0EfoVbbc"
		// grant_type: 'authorization_code',
		// grantType: 'authorization_code',
		resetPasswordPolicy: 'B2C_1A_PASSWORDRESET',
		navigateToLoginRequestUrl: false
	},
	cache: {
		cacheLocation: 'sessionStorage', // This configures where your cache will be stored
		storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
	}
};

const forgotPasswordRequest = {
	scopes: ["afcff42d-55cc-45ea-8475-58214904c683 openid offline_access"],
	authority: PasswordResetAuthorityUrl,
	navigateToLoginRequestUrl: false
}

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
const loginRequest = {
	scopes: ['afcff42d-55cc-45ea-8475-58214904c683 openid offline_access']
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
const graphConfig = {
	graphMeEndpoint: 'https://graph.microsoft.com/oidc/userinfo'
};
//graph.windows.net

export { msalConfig, loginRequest, graphConfig, forgotPasswordRequest };
