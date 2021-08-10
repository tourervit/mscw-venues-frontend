import cookie from 'cookie';
import jwtDecode from 'jwt-decode';
import { EventData } from 'components/event/event-types';

export function parseCookies(cks): {
	token?: string;
} {
	return cookie.parse(cks);
}

export function isOwner(token, event: EventData) {
	const {
		id: userId,
	}: {
		id: number;
	} = jwtDecode(token);
	return event.user.id === userId;
}
