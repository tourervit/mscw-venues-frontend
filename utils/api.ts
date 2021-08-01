import { API_URL } from "config";
import { ILoginCredentials } from "pages/api/login";

interface FetchConfig {
	data?: BodyInit;
	method?: "POST" | "PUT" | "DELETE";
	headers?: {};
}

const _fetch = (url: string, config: FetchConfig = {}) => {
	const { data, method = "GET", headers, ...customConfig } = config;
	const isClient = typeof window !== "undefined";
	const getContentType = () => {
		return isClient && data instanceof FormData
			? {}
			: data
			? { "Content-Type": "application/json" }
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
		return _fetch("http://localhost:3000/api/me");
	}
	static getEvent(id) {
		return _fetch(`http://localhost:1337/events/${id}`);
	}
	static addEvent(data) {
		return _fetch(`http://localhost:1337/events`, { method: "POST", data });
	}
	static editEvent(id, data) {
		return _fetch(`http://localhost:1337/events/${id}`, { method: "PUT", data });
	}
	static login(credentials) {
		return _fetch("http://localhost:3000/api/login", { method: "POST", data: credentials });
	}
	static logout() {
		return _fetch("http://localhost:3000/api/logout", { method: "POST" });
	}
}
