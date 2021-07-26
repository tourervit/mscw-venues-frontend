import { API_URL } from "config";

interface FetchConfig {
	data?: BodyInit;
	method?: "POST" | "PUT" | "DELETE";
	headers?: {};
}

const _fetch = (endpoint: string, config: FetchConfig = {}) => {
	const { data, method = "GET", headers, ...customConfig } = config;
	const isClient = typeof window !== "undefined";
	const getContentType = () => {
		return isClient && data instanceof FormData ? {} : data ? "application-json" : undefined;
	};
	const transformedData = isClient && data instanceof FormData ? data : JSON.stringify(data);

	return fetch(`${API_URL}/${endpoint.startsWith("/") ? endpoint.slice(1) : endpoint}`, {
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
	static getEvent(id) {
		return _fetch(`/events/${id}`);
	}
	static addEvent(data) {
		return _fetch(`/events`, { method: "POST", data });
	}
	static editEvent(id, data) {
		return _fetch(`/events/${id}`, { method: "PUT", data });
	}
}
