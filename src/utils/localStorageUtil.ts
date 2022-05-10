export const ACCESS_TOKEN_KEY = 'auth.access_token';

const storage = {
	get: (key: string) => {
		return window.localStorage.getItem(key);
	},
	set: (key: string, val: string) => {
		return window.localStorage.setItem(key, val);
	},
	remove: (key: string) => {
		return window.localStorage.removeItem(key);
	}
};

const setAuthToken = (token: string) => {
	storage.set(ACCESS_TOKEN_KEY, token);
};

const getAuthToken = () => {
	return storage.get(ACCESS_TOKEN_KEY);
};

const removeAuthToken = () => {
	storage.remove(ACCESS_TOKEN_KEY);
};

export { getAuthToken, setAuthToken, removeAuthToken };
