import { Layout } from 'components/common/Layout';
import { PageTitle } from 'components/common/PageTitle';
import React, { useEffect, useState } from 'react';

export default function AboutPage({ onChange }) {
	return (
		<Layout title="About">
			<div className="max-w-6xl mx-auto">
				<PageTitle>About</PageTitle>
				<p>Classy app to find all kinds of cultural events in the best city of the world.</p>
			</div>
		</Layout>
	);
}
