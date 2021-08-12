import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { IUserData } from './me';

export interface ILoginCredentials {
	username: string;
	password: string;
}

interface ILoginData {
	jwt: string;
	user: IUserData;
}

interface ILoginError {
	statusCode: number;
	error: string;
	message: [{ messages: [{ id: number; message: string }] }];
	// data: [{ messages: [Array] }];
}

export default async function login(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { password, username }: ILoginCredentials = req.body;
		const body = { identifier: username, password };
		const strapiResponse = await fetch('http://localhost:1337/auth/local', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: typeof body === 'string' ? body : JSON.stringify(body),
		});

		if (strapiResponse.ok) {
			const data: ILoginData = await strapiResponse.json();
			res.setHeader(
				'Set-Cookie',
				cookie.serialize('token', data.jwt, {
					httpOnly: true,
					secure: process.env.NODE_ENV !== 'development',
					maxAge: 60 * 60 * 24 * 7, // 1 day
					sameSite: 'strict',
					path: '/',
				}),
			);
			res.status(200).json(data.user);
		} else {
			const data: ILoginError = await strapiResponse.json();
			res.status(data.statusCode).json({ message: data.message[0].messages[0].message });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ message: `Method ${req.method} is not allowed.` });
	}
}
