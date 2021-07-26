import React from "react";

interface LabelProps {
	children: React.ReactNode;
	htmlFor: string;
}

function Label({ children, htmlFor }: LabelProps) {
	return (
		<label
			className="absolute left-0 -top-5 font-light text-xs text-gray-600 dark:text-gray-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 transition-all"
			htmlFor={htmlFor}
		>
			{children}
		</label>
	);
}

export default Label;
