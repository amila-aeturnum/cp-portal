import axios from 'axios';
import { getAuthToken } from 'utils/localStorageUtil';

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL,
	headers: {
		'Content-type': 'application/json',
		'Access-Control-Allow-Origin': true
	}
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = true;
		if (!token) {
			return { ...config, headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': true } };
		}
		return config;
	},
	(error) => {
		// handle the error
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(config) => {
		return config;
	},
	(error) => {
		// handle the error
		return Promise.reject(error);
	}
);

export default axiosInstance;
