import { API_URL } from "config";

interface FetchConfig {
	data?: BodyInit;
	method?: "POST" | "PUT" | "DELETE";
	headers?: {};
}

const _fetch = (endpoint: string, config: FetchConfig = {}) => {
	const { data, method = "GET", headers, ...customConfig } = config;

	return fetch(`${API_URL}/${endpoint.startsWith("/") ? endpoint.slice(1) : endpoint}`, {
		method,
		body: data ? JSON.stringify(data) : undefined,
		headers: {
			// Authorization: `Bearer ${process.env.TOKEN}`,
			"Content-Type": data ? "application/json" : undefined,
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
	static editEvent(id, data) {
		return _fetch(`/events/${id}`, { method: "PUT", data });
	}
}
