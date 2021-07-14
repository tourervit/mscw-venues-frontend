import { Layout } from "components/common/Layout";
import React, { useEffect, useState } from "react";

export default function AboutPage({ onChange }) {
	return (
		<Layout title="About">
			<h1 className="text-2xl">About</h1>
			<a href="fsdfsdfsd" className="sdf">
				heh
			</a>
			{/* <ThemeSwitch /> */}
			<p>
				This is an app to find all kinds of cultural events in the best city of the world.
			</p>
			<p>Version 1.0.0</p>
		</Layout>
	);
}
