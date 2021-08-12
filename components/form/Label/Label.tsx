import React from 'react';
import cn from 'classnames';

interface LabelProps {
	children: React.ReactNode;
	htmlFor: string;
	className?: string;
}

function Label({ children, htmlFor, className }: LabelProps) {
	return (
		<label
			className={cn(
				'absolute left-0 -top-5 cursor-pointer font-light text-xs text-gray-600 dark:text-gray-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 transition-all',
				className,
			)}
			htmlFor={htmlFor}
		>
			{children}
		</label>
	);
}

export default Label;
