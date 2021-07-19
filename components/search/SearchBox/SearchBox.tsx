import React, { ChangeEvent, FormEvent, useRef } from "react";
import { useRouter } from "next/dist/client/router";

function SearchBox() {
	const { push } = useRouter();
	const inputRef = useRef(null);
	const [value, setValue] = React.useState("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		push({
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
				className="text-center font-light focus:outline-none rounded-none border-b border-transparent focus:border-b focus:border-gray-300 dark:focus:border-gray-500"
				value={value}
				onChange={handleChange}
			/>
		</form>
	);
}

export default SearchBox;
