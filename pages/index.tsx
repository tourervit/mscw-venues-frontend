import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "components/common/Layout";
import heroPic from "public/hero.jpg";

export default function HomePage() {
	return (
		<Layout>
			<Link href="/events">
				<a className="block relative w-full h-80 mb-36">
					<Image
						src={heroPic}
						alt="girl in a night club"
						className="animate-flicker"
						layout="fill"
						objectFit="cover"
						priority
					/>
				</a>
			</Link>
			<div className="text-center ">
				<Link href="/login">
					<a className="px-8 py-1 rounded-md bg-black text-white dark:bg-white dark:text-black">
						Login
					</a>
				</Link>
			</div>
		</Layout>
	);
}
