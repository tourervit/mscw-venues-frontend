import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export interface IUserData {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	role: {
		id: number;
		name: 'Authenticated' | '??';
		description: string;
		type: 'authenticated' | '??';
	};
	created_at: Date;
	updated_at: Date;
}

export default async function me(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		if (!req.headers.cookie) {
			res.status(401).json({ message: 'Not authorized' });
			return;
		}
		const { token } = cookie.parse(req.headers.cookie);
		const strapiResponse = await fetch('http://localhost:1337/users/me', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (strapiResponse.ok) {
			const user = await strapiResponse.json();
			res.send({ user });
		} else {
			res.status(403).json({ message: 'Forbidden' });
		}
	} else {
		res.setHeader('Allow', ['GET']);
		res.status(405).json({ message: `Method ${req.method} is not allowed.` });
	}
}
