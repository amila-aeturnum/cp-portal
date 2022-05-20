import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
const resources = {
	en: {
		translation: {
			userType: 'User type',
			client: 'Client',
			email: 'Email',
			value_required: 'Value Required',
			name: 'Name',
			invalid_email: 'Invalid email address',
			error: 'Error',
			successful: 'Successful',
			new_user_account_created: 'New user account has been created.'
		}
	},
	fr: {
		translation: {
			value_required: 'Value Required',
			name: 'Name'
		}
	}
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: 'en', // language to use

		interpolation: {
			escapeValue: false // react already safes from xss
		}
	});

export default i18n;
