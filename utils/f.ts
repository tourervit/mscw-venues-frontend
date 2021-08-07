import cookie from "cookie";

export function parseCookies(cks): {
	token?: string;
} {
	return cookie.parse(cks);
}
