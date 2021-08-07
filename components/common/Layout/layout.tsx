import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import logo from "public/logo-sm.png";
import { SearchBox } from "components/search/SearchBox";
import { useRouter } from "next/dist/client/router";
import { NavLink } from "../NavLink";
import { useAuth } from "context/auth-context";
import { Api } from "utils/api";

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

	const router = useRouter();
	const { user, setUser } = useAuth();
	const handleLogout = () => {
		Api.logout();
		setUser(null);
		router.push("/");
	};

	return (
		<>
			<Head>
				<title>{title ? `${title} | VENUE MSCW` : "VENUE MSCW"}</title>
				<meta content={description} name="description" />
				<meta content={keywords} name="keywords" />
			</Head>

			<header className="max-w-7xl w-full h-20 mx-auto">
				<div className="px-6 h-full">
					<div className="px-6 h-full flex items-center justify-between">
						<Link href="/">
							<a className="flex items-center">
								<Image
									src={logo}
									height={24}
									width={24}
									alt="Venue MSCW logo"
									priority
								/>
								<h1 className="ml-2 uppercase font-medium text-lg tracking-wide transform translate-y-px">
									VENUE MSCW
								</h1>
							</a>
						</Link>
						<nav className="flex items-center">
							<SearchBox />
							{user && (
								<NavLink href="/dashboard" className="ml-4">
									Dashboard
								</NavLink>
							)}
							<NavLink href="/events" className="ml-4">
								Events
							</NavLink>
							<NavLink href="/about" className="ml-4">
								About
							</NavLink>
							{user ? (
								<>
									<button
										className="ml-4 flex items-center text-gray-500 dark:text-gray-300"
										onClick={handleLogout}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-4 w-4"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
											/>
										</svg>
										Logout
									</button>
								</>
							) : (
								<>
									<NavLink
										href="/login"
										className="ml-4 flex items-center font-normal"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-4 w-4"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
											/>
										</svg>
										Login
									</NavLink>
								</>
							)}
						</nav>
					</div>
				</div>
			</header>

			<main className="min-h-[calc(100vh-300px)] mb-28">{children}</main>

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
