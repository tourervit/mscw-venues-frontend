import React from "react";
import { RegisterOptions } from "react-hook-form";
import cn from "classnames";

interface TextareaProps {
	register: Function;
	name: string;
	rows?: number;
	validation: RegisterOptions;
	isError?: boolean;
}

function Textarea({ register, name, rows = 1, validation, isError = false }: TextareaProps) {
	return (
		<textarea
			id={name}
			placeholder={name}
			name={name}
			rows={rows}
			className={cn(
				"peer cursor-pointer rounded-none w-full pl-1 pr-1 bg-white text-black border-b-[1px] border-l-[1px] border-r-[1px] border-t-[1px] placeholder-transparent focus:outline-none border-gray-300 dark:border-gray-400 focus:border-black dark:bg-black dark:text-white dark:focus:border-white autofil",
				{
					"border-red-500 dark:border-red-500": isError,
				},
			)}
			{...register(name, validation)}
		/>
	);
}

export default Textarea;
