import React from "react";
import Link from "next/link";
import { UrlObject } from "url";
import cn from "classnames";
import { useRouter } from "next/dist/client/router";

interface NavLinkProps {
	href: string | UrlObject;
	className?: string;
	children: React.ReactNode;
}

function NavLink({ href, className, children }: NavLinkProps) {
	const { route } = useRouter();

	return (
		<Link href={href}>
			<a
				className={cn(
					className,
					"border border-transparent rounded-xl px-3 py-px font-light transition-colors",
					{ "text-gray-500 dark:text-gray-300": route !== href },
					{ "hover:text-black dark:hover:white": true },
					{ "text-black dark:text-white": route === href },
				)}
			>
				{children}
			</a>
		</Link>
	);
}

export default NavLink;
