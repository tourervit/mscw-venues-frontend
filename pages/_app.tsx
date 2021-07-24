import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { DefaultSeo } from "next-seo";
import seo from "seo.config";
import "../styles/globals.css";

const defaultTheme = "light";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider attribute="class" defaultTheme={defaultTheme}>
			<DefaultSeo {...seo} />
			<Component {...pageProps} />
			<Toaster />
		</ThemeProvider>
	);
}

export default MyApp;
