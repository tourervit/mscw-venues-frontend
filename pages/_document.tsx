import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					{/* TODO: Add proper favicons, images */}
					{/* <meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta title="MSCW | Find the best drink deals and happy hours in your area." />
					<link rel="icon" sizes="96x96" href="/favicons/favicon.ico" />
					<meta name="theme-color" content="#68e988"></meta>
					<link
						href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
						rel="stylesheet"
					/> */}
				</Head>
				<body className="bg-white dark:bg-black">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
