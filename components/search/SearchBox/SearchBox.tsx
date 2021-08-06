import React, { ChangeEvent, FormEvent, useRef } from "react";
import { useRouter } from "next/dist/client/router";

function SearchBox() {
	const router = useRouter();
	const inputRef = useRef(null);
	const [value, setValue] = React.useState("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		router.push({
			pathname: "/search",
			query: {
				q: value.trim(),
			},
		});
		inputRef.current.blur();
		setValue("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				ref={inputRef}
				spellCheck={false}
				placeholder="Search"
				className="cursor-pointer text-right font-light focus:outline-none rounded-none border-b border-transparent focus:border-b focus:border-gray-300 dark:focus:border-white bg-white dark:bg-black placeholder-gray-500 dark:placeholder-gray-300 focus:text-left hover:placeholder-black dark:hover:placeholder-white"
				value={value}
				onChange={handleChange}
			/>
		</form>
	);
}

export default SearchBox;
