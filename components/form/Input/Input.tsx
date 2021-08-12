import React from 'react';
import { RegisterOptions } from 'react-hook-form';
import cn from 'classnames';

interface InputProps {
	register: Function;
	name: string;
	type: 'text' | 'password' | 'date';
	autoFocus?: boolean;
	autoComplete?: '' | 'new-password';
	validation: RegisterOptions;
	isError?: boolean;
}

function Input({
	register,
	name,
	type = 'text',
	autoFocus = false,
	autoComplete = '',
	validation,
	isError = false,
}: InputProps) {
	return (
		<input
			autoFocus={autoFocus}
			id={name}
			type={type}
			placeholder={name}
			name={name}
			autoComplete={autoComplete}
			className={cn(
				'peer cursor-pointer rounded-none w-full bg-white text-black border-b-[1px] placeholder-transparent focus:outline-none border-gray-300 dark:border-gray-400 focus:border-black dark:bg-black dark:text-white dark:focus:border-white autofil',
				{
					'border-red-500 dark:border-red-500': isError,
				},
			)}
			{...register(name, validation)}
		/>
	);
}

export default Input;
