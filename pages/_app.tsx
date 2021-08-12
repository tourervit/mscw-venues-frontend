import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { DefaultSeo } from 'next-seo';
import seo from 'seo.config';
import '../styles/globals.css';
import { AuthProvider } from 'context/auth-context';
import { Offline, Online } from 'react-detect-offline';

const defaultTheme = 'light';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Online>
				<ThemeProvider attribute="class" defaultTheme={defaultTheme}>
					<DefaultSeo {...seo} />
					<AuthProvider>
						<Component {...pageProps} />
					</AuthProvider>
					<Toaster />
				</ThemeProvider>
			</Online>
			<Offline>
				<div className="pt-28 h-screen text-center uppercase ">
					<span className="italic">No internet on this device</span>
					<span className="text-2xl">&nbsp; :&#40;</span>
				</div>
			</Offline>
		</>
	);
}

export default MyApp;
