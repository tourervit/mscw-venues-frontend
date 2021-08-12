import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import { useTheme } from 'next-themes';
import cn from 'classnames';
import { NLink } from '../NLink';
import { SearchBox } from 'components/search/SearchBox';
import { useAuth } from 'context/auth-context';
import { Api } from 'utils/api';
import logo from 'public/logo-sm.png';

interface LayoutProps {
	children: React.ReactNode;
	title?: string;
	description?: string;
	keywords?: string;
}

function Layout({
	children,
	title,
	description = 'Find the best drink deals and happy hours in your area.',
	keywords = 'venue, art, music, theather, museum, cinema, free time',
}: LayoutProps) {
	const [isMounted, setIsMounted] = React.useState(false);
	const { theme, setTheme } = useTheme();
	const isDarkMode = theme === 'dark';

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	const router = useRouter();
	const isHome = router.pathname === '/';
	const isCenterFormScreen =
		router.pathname === '/login' ||
		router.pathname === '/signup' ||
		router.pathname === '/events/add' ||
		router.pathname === '/events/edit/[id]';

	const { user, setUser } = useAuth();
	const handleLogout = () => {
		Api.logout();
		setUser(null);
		router.push('/login');
	};
	return (
		<>
			<Head>
				<title>{title ? `${title} | VENUE MSCW` : 'VENUE MSCW'}</title>
				<meta content={description} name="description" />
				<meta content={keywords} name="keywords" />
			</Head>

			<header className="max-w-6xl w-full h-20 md:h-28 mx-auto mb-0 md:mb-9">
				<div className="px-4 xl:px-0 h-full">
					<div className="h-full flex items-center justify-between">
						<Link href="/">
							<a className="flex items-center">
								<Image src={logo} height={24} width={24} alt="Venue MSCW logo" priority />
								<h1 className="ml-2 uppercase font-medium text-lg tracking-wide transform translate-y-px">
									<span className="hidden sm:block ">VENUE MSCW</span>
									<span className="block sm:hidden">V M</span>
								</h1>
							</a>
						</Link>
						<nav className="flex items-center">
							<SearchBox />
							{user && (
								<NLink href="/dashboard" className="ml-2 xs:ml-4 py-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 sm:hidden"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
										/>
									</svg>
									<span className="hidden sm:block">Dashboard</span>
								</NLink>
							)}
							<NLink href="/events" className="ml-2 xs:ml-4 py-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 sm:hidden"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
									/>
								</svg>
								<span className="hidden sm:block">Events</span>
							</NLink>
							{user ? (
								<>
									<button
										className="ml-2 xs:ml-4 py-3 flex items-center text-gray-500 dark:text-gray-300"
										onClick={handleLogout}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6 sm:h-4 sm:w-4"
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
										<span className="hidden sm:block">Logout</span>
									</button>
								</>
							) : (
								<>
									<NLink href="/login" className="ml-2 xs:ml-4 flex items-center font-normal py-3">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6 sm:h-4 sm:w-4"
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
										<span className="hidden sm:block">Login</span>
									</NLink>
								</>
							)}
						</nav>
					</div>
				</div>
			</header>

			<main
				className={cn('min-h-[calc(100vh-300px)] mb-28', {
					'pt-4 sm:pt-0': isCenterFormScreen,
					'flex items-center': isCenterFormScreen,
				})}
			>
				{children}
			</main>

			<footer className="text-center text-xs font-light">
				<button
					aria-label="toggle dark mode"
					className="mb-2 w-7 h-7 px-2 bg-gray-200 dark:bg-[#222] rounded"
					onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
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
				<NLink href="/about" className="block mb-5">
					About
				</NLink>
			</footer>
		</>
	);
}

export default Layout;
