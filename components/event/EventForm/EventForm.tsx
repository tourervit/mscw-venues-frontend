import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
	name: string;
	description: string;
	venue: string;
	address: string;
	date: Date;
	time: string;
};

interface EventFormProps {
	onSubmit: SubmitHandler<Inputs>;
}

function EventForm({ onSubmit }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto px-6 max-w-lg space-y-10">
			<div className="relative">
				<input
					id="name"
					type="text"
					placeholder="Media forum 2021"
					className="peer w-full bg-white border-b-[1px] placeholder-transparent focus:outline-none border-gray-300 dark:border-gray-400 focus:border-black dark:bg-black dark:focus:border-white"
					{...register("name", { required: "Name is required" })}
				/>
				<label
					className="absolute left-0 -top-5 font-light text-xs text-gray-600 dark:text-gray-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 transition-all"
					htmlFor="name"
				>
					Event name
				</label>
				{errors.name && <div>{errors.name.message}</div>}
			</div>
			<div className="relative">
				<input
					id="venue"
					type="text"
					placeholder="Venue"
					className="peer w-full bg-white border-b-[1px] placeholder-transparent focus:outline-none border-gray-300 dark:border-gray-400 focus:border-black dark:bg-black dark:focus:border-white"
					{...register("venue", { required: "Venue is required" })}
				/>
				<label
					className="absolute left-0 -top-5 font-light text-xs text-gray-600 dark:text-gray-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 transition-all"
					htmlFor="venue"
				>
					Venue
				</label>
				{errors.name && <div>{errors.name.message}</div>}
			</div>
			<div className="relative">
				<textarea
					id="descripton"
					placeholder="Description"
					rows={1}
					className="peer w-full bg-white border-b-[1px] placeholder-transparent focus:outline-none border-gray-300 dark:border-gray-400 focus:border-black dark:bg-black dark:focus:border-white"
					{...register("description", { required: "Description is required" })}
				/>
				<label
					className="absolute left-0 -top-5 font-light text-xs text-gray-600 dark:text-gray-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 transition-all"
					htmlFor="description"
				>
					Description
				</label>
				{errors.name && <div>{errors.name.message}</div>}
			</div>
			<button
				type="submit"
				className="w-full px-6 py-1 rounded-md bg-black text-white dark:bg-white dark:text-black"
			>
				Create
			</button>
		</form>
	);
}

export default EventForm;
