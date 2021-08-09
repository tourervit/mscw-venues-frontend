import { Layout } from "components/common/Layout";
import React, { useEffect, useState } from "react";

export default function AboutPage({ onChange }) {
	return (
		<Layout title="About">
			<div className="max-w-6xl mx-auto">
				<h1 className="mb-6 text-3xl font-light">About</h1>
				<p>
					Classy app to find all kinds of cultural events in the best city of the world.
				</p>
			</div>
		</Layout>
	);
}
