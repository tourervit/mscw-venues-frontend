/* eslint-disable react/display-name */
import React from "react";
import { UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputProps {
	register: Function;
	name: string;
	type: "text" | "password";
	autoFocus?: boolean;
	validation: RegisterOptions;
}

function Input({ register, name, type, autoFocus, validation }: InputProps) {
	return (
		<input
			autoFocus={autoFocus}
			id={name}
			type={type}
			placeholder={name}
			name={name}
			className="peer cursor-pointer rounded-none w-full bg-white text-black border-b-[1px] placeholder-transparent focus:outline-none border-gray-300 dark:border-gray-400 focus:border-black dark:bg-black dark:text-white dark:focus:border-white autofil"
			{...register(name, validation)}
		/>
	);
}

export default Input;
