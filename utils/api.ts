import { NEXT_API_URL, STRAPI_API_URL } from 'config';

interface FetchConfig {
	data?: BodyInit;
	method?: 'POST' | 'PUT' | 'DELETE';
	headers?: {};
}

const _fetch = (url: string, config: FetchConfig = {}) => {
	const { data, method = 'GET', headers, ...customConfig } = config;
	const isClient = typeof window !== 'undefined';
	const getContentType = () => {
		return isClient && data instanceof FormData
			? {}
			: data
			? { 'Content-Type': 'application/json' }
			: undefined;
	};
	const transformedData = isClient && data instanceof FormData ? data : JSON.stringify(data);
	return fetch(url, {
		method,
		body: transformedData,
		headers: {
			// Authorization: `Bearer ${process.env.TOKEN}`,
			...getContentType(),
			...headers,
		},
		...customConfig,
	});
};

/**
 * TODO
 * Move another methods here
 */
export class Api {
	static getUserInfo() {
		return _fetch(`${NEXT_API_URL}/api/me`);
	}
	static getEvent(id) {
		return _fetch(`${STRAPI_API_URL}/events/${id}`);
	}
	static addEvent(data, headers = {}) {
		return _fetch(`${STRAPI_API_URL}/events`, { method: 'POST', data, headers });
	}
	static editEvent(id, data, headers = {}) {
		return _fetch(`${STRAPI_API_URL}/events/${id}`, { method: 'PUT', data, headers });
	}
	static login(credentials) {
		return _fetch(`${NEXT_API_URL}/api/login`, { method: 'POST', data: credentials });
	}
	static register(credentials) {
		return _fetch(`${NEXT_API_URL}/api/register`, { method: 'POST', data: credentials });
	}
	static logout() {
		return _fetch(`${NEXT_API_URL}/api/logout`, { method: 'POST' });
	}
}
