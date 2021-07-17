import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "components/common/Layout";
import heroPic from "public/hero.jpg";

export default function HomePage() {
	return (
		<Layout>
			<div className="relative w-full h-80 mb-36">
				<Image
					src={heroPic}
					alt="girl in a night club"
					className="animate-flicker"
					layout="fill"
					objectFit="cover"
					priority
				/>
			</div>
		</Layout>
	);
}
