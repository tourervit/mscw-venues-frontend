import { Layout } from "components/common/Layout";
import Link from "next/link";

function NotFoundPage() {
	return (
		<Layout title="Not Found">
			<h1 className="text-7xl">
				<svg viewBox="0 0 24 24" focusable="false" className="w-10 h-10">
					<path
						fill="yellow"
						d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"
					></path>
				</svg>
				404
			</h1>
			<h3>Doesn't exist</h3>
			<Link href="/">
				<a>Go home</a>
			</Link>
		</Layout>
	);
}

export default NotFoundPage;
