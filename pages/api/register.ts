import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { IUserData } from './me';

export interface IRegisterCredentials {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
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

export default async function register(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { email, username, password, confirmPassword }: IRegisterCredentials = req.body;
		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Passwords don't match" });
		}

		const body = { username, email, password };
		const strapiResponse = await fetch('http://localhost:1337/auth/local/register', {
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
			return res.status(200).json(data.user);
		} else {
			const data: ILoginError = await strapiResponse.json();
			return res.status(data.statusCode).json({ message: data.message[0].messages[0].message });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ message: `Method ${req.method} is not allowed.` });
	}
}
