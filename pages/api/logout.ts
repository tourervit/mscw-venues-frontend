import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		res.setHeader(
			"Set-Cookie",
			cookie.serialize("token", "", {
				maxAge: -1,
				path: "/",
			}),
		);
		res.send({ message: "success" });
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).json({ message: `Method ${req.method} is not allowed.` });
	}
}
