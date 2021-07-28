import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { DefaultSeo } from "next-seo";
import seo from "seo.config";
import "../styles/globals.css";
import { AuthProvider } from "context/auth-context";

const defaultTheme = "light";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider attribute="class" defaultTheme={defaultTheme}>
			<DefaultSeo {...seo} />
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
			<Toaster />
		</ThemeProvider>
	);
}

export default MyApp;
