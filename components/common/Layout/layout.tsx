import Head from "next/head";
import Link from "next/link";

interface LayoutProps {
	children: React.ReactNode;
	title?: string;
	description?: string;
	keywords?: string;
}

function Layout({
	children,
	title,
	description = "Find the best drink deals and happy hours in your area.",
	keywords = "venue, art, music, theather, museum, cinema, free time",
}: LayoutProps) {
	return (
		<>
			<Head>
				<title>{title ? `VENUE MSCW | ${title}` : "VENUE MSCW"}</title>
				<meta content={description} name="description" />
				<meta content={keywords} name="keywords" />
			</Head>

			<header className="max-w-7xl w-full h-16">
				<div className="px-6 h-full">
					<div className="px-6 h-full flex items-center justify-between">
						<Link href="/">
							<a className="uppercase font-medium text-lg tracking-wide">
								VENUE MSCW
							</a>
						</Link>
						<nav>
							<ul>
								<li>
									<Link href="/events">
										<a className="border-b-0 border-transparent hover:border-b hover:border-white">
											Events
										</a>
									</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</header>

			<main className="px-8 mb-28">{children}</main>

			<footer className="text-center">
				<p>Copyright &copy; MSCW VENUE</p>
				<p>
					<Link href="/about">
						<a>About this project</a>
					</Link>
				</p>
			</footer>
		</>
	);
}

export default Layout;
