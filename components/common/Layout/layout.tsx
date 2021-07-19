import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import logo from "public/logo-sm.png";
import { SearchBox } from "components/search/SearchBox";

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
	const [isMounted, setIsMounted] = React.useState(false);
	const { theme, setTheme } = useTheme();
	const isDarkMode = theme === "dark";

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<>
			<Head>
				<title>{title ? `VENUE MSCW | ${title}` : "VENUE MSCW"}</title>
				<meta content={description} name="description" />
				<meta content={keywords} name="keywords" />
			</Head>

			<header className="w-60 mx-auto mb-7">
				<div className="pt-8 md:py-28 h-full text-center relative">
					<Link href="/">
						<a>
							<div>
								<div className="relative mb-1 w-10 h-10 inset-x-0 mx-auto">
									<Image src={logo} alt="Venue MSCW logo" />
								</div>
								<h1 className="font-medium text-xl tracking-tighter transform translate-y-px">
									VENUE MSCW
								</h1>
							</div>
						</a>
					</Link>
				</div>
				<div className="text-center mt-8">
					<SearchBox />
				</div>
			</header>

			<main className="min-h-[calc(100vh-500px)] mb-28">{children}</main>

			<footer className="text-center text-xs font-light">
				<button
					aria-label="toggle dark mode"
					className="mb-2 w-7 h-7 px-2 bg-gray-200 dark:bg-[#222] rounded"
					onClick={() => setTheme(isDarkMode ? "light" : "dark")}
				>
					{isMounted && (
						<svg viewBox="0 0 24 24" focusable="false" className="h-3 w-3">
							{isDarkMode ? (
								<g
									strokeLinejoin="round"
									strokeLinecap="round"
									strokeWidth="2"
									fill="currentColor"
									stroke="currentColor"
								>
									<circle cx="12" cy="12" r="5"></circle>
									<path d="M12 1v2"></path>
									<path d="M12 21v2"></path>
									<path d="M4.22 4.22l1.42 1.42"></path>
									<path d="M18.36 18.36l1.42 1.42"></path>
									<path d="M1 12h2"></path>
									<path d="M21 12h2"></path>
									<path d="M4.22 19.78l1.42-1.42"></path>
									<path d="M18.36 5.64l1.42-1.42"></path>
								</g>
							) : (
								<path
									fill="currentColor"
									d="M21.4,13.7C20.6,13.9,19.8,14,19,14c-5,0-9-4-9-9c0-0.8,0.1-1.6,0.3-2.4c0.1-0.3,0-0.7-0.3-1 c-0.3-0.3-0.6-0.4-1-0.3C4.3,2.7,1,7.1,1,12c0,6.1,4.9,11,11,11c4.9,0,9.3-3.3,10.6-8.1c0.1-0.3,0-0.7-0.3-1 C22.1,13.7,21.7,13.6,21.4,13.7z"
								></path>
							)}
						</svg>
					)}
				</button>
				<p className="mb-5">&copy; venue.moscow </p>
			</footer>
		</>
	);
}

export default Layout;
