import axiosInstance from 'configs/axiosConfig';
import { get } from 'lodash';

export const getEndpointPromise = async <T>(endpoint: string, config?: object) => {
	return axiosInstance
		.get<T>(endpoint, config)
		.then((response) => {
			const responseData = get(response, 'data.response');
			return responseData || response;
		})
		.catch((error) => Promise.reject(error));
};

export const insertEndpointPromise = async <T>(endpoint: string, data: object, config?: object) => {
	const request = axiosInstance.post<T>(endpoint, data, config);
	return request
		.then((response) => {
			const responseData = get(response, 'data.response');
			return responseData || response;
		})
		.catch((error) => {
			Promise.reject(error);
		});
};

export const updateEndpointPromise = async <T>(endpoint: string, data: object, config?: object) => {
	return axiosInstance.put<T>(endpoint, data, config).catch((error) => Promise.reject(error));
};

export const patchEndpointPromise = async <T>(endpoint: string, data: object, config?: object) => {
	return axiosInstance.patch<T>(endpoint, data, config).catch((error) => Promise.reject(error));
};

export const deleteEndpointPromise = async <T>(endpoint: string, config?: object) => {
	return axiosInstance
		.delete<T>(endpoint, config)
		.then((response) => {
			return response;
		})
		.catch((error) => Promise.reject(error));
};
