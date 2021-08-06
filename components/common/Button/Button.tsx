import React from "react";
import cn from "classnames";

interface ButtonProps {
	children: React.ReactNode;
	type?: "button" | "submit" | "reset";
	loading?: boolean;
	disabled?: boolean;
}
function Button({ children, type = "button", loading = false, disabled = false }: ButtonProps) {
	return (
		<button
			type={type}
			className={cn(
				"flex items-center justify-center w-full pl-6 pr-6 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black transition-spacing duration-300",
				{ ["pl-10"]: loading },
				{ "bg-[#444] dark:bg-[#ccc] cursor-not-allowed": loading },
			)}
			disabled={loading || disabled}
		>
			{loading && (
				<i className="inline-block -ml-4" data-testid="button-spinner">
					<svg
						viewBox="0 0 1024 1024"
						focusable="false"
						data-icon="loading"
						fill="currentColor"
						aria-hidden="true"
						className="animate-spin h-4 w-4"
					>
						<path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
					</svg>
				</i>
			)}
			<span className={cn("transition-spacing duration-300", { ["ml-2"]: loading })}>
				{children}
			</span>
		</button>
	);
}

export default Button;
