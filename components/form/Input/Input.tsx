import React from "react";
import { UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputProps {
	register: Function;
	fieldName: string;
	type: "text" | "password";
	validation: RegisterOptions;
}

function Input({ register, fieldName, type, validation }: InputProps) {
	return (
		<input
			autoComplete="off"
			id={fieldName}
			type={type}
			placeholder={fieldName}
			className="peer cursor-pointer rounded-none w-full bg-white border-b-[1px] placeholder-transparent focus:outline-none border-gray-300 dark:border-gray-400 focus:border-black dark:bg-black dark:focus:border-white"
			{...register(fieldName, validation)}
		/>
	);
}

export default Input;
