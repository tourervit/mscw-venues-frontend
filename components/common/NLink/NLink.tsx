import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useRouter } from 'next/router';

interface NLinkProps {
	href: string;
	className?: string;
	children: React.ReactNode;
}

function NLink({ href, className, children }: NLinkProps) {
	const router = useRouter();

	return (
		<Link href={href}>
			<a
				className={cn(
					className,
					'border border-transparent rounded-xl py-px font-light transition-colors hover:text-black dark:hover:text-white',
					{ 'text-gray-500 dark:text-gray-300': router.route !== href },
					{ 'text-black dark:text-white': router.route === href },
				)}
			>
				{children}
			</a>
		</Link>
	);
}

export default NLink;
