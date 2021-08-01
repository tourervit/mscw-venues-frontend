import React, { ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";

type Inputs = {
	name: string;
	description: string;
	venue: string;
	address: string;
	date: Date;
	time: string;
	image: FileList;
};

interface EventFormProps {
	onSubmit: SubmitHandler<Inputs>;
	defaultValues: Inputs | {};
}

function EventForm({ onSubmit, defaultValues }: EventFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm<Inputs>({ defaultValues });

	const [previewImage, setPreviewImage] = React.useState<string>("");

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto px-6 max-w-lg space-y-10">
			<div className="relative">
				<input
					id="name"
					type="text"
					placeholder="Media forum 2021"
					className="peer rounded-none w-full bg-white border-b-[1px] placeholder-transparent focus:outline-none border-gray-300 dark:border-gray-400 focus:border-black dark:bg-black dark:focus:border-white"
					{...register("name", { required: "Name is required" })}
				/>
				<label
					className="absolute left-0 -top-5 font-light text-xs text-gray-600 dark:text-gray-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 transition-all"
					htmlFor="name"
				>
					Event name
				</label>
				{errors.name && <div className="text-red-400">{errors.name.message}</div>}
			</div>
			<div className="relative">
				<input
					id="venue"
					type="text"
					placeholder="Venue"
					className="peer rounded-none w-full bg-white border-b-[1px] placeholder-transparent focus:outline-none border-gray-300 dark:border-gray-400 focus:border-black dark:bg-black dark:focus:border-white"
					{...register("venue", { required: "Venue is required" })}
				/>
				<label
					className="absolute left-0 -top-5 font-light text-xs text-gray-600 dark:text-gray-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 transition-all"
					htmlFor="venue"
				>
					Venue
				</label>
				{errors.venue && <div className="text-red-400">{errors.venue.message}</div>}
			</div>

			<div className="relative">
				<textarea
					id="descripton"
					placeholder="Description"
					rows={1}
					className="peer rounded-none w-full bg-white border-b-[1px] placeholder-transparent focus:outline-none border-gray-300 dark:border-gray-400 focus:border-black dark:bg-black dark:focus:border-white"
					{...register("description", { required: "Description is required" })}
				/>
				<label
					className="absolute left-0 -top-5 font-light text-xs text-gray-600 dark:text-gray-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500 transition-all"
					htmlFor="description"
				>
					Description
				</label>
				{errors.description && (
					<div className="text-red-400">{errors.description.message}</div>
				)}
			</div>
			<div className="relative">
				<input
					id="date"
					type="date"
					className="peer rounded-none w-full bg-white border-b-[1px] placeholder-transparent focus:outline-none border-gray-300 dark:border-gray-400 focus:border-black dark:bg-black dark:focus:border-white"
					{...register("date", { required: "Date is required" })}
				/>

				{errors.date && <div className="text-red-400">{errors.date.message}</div>}
			</div>

			{/* <div className="relative">
				<input
					{...register("image", {
						validate: fileList => {
							return fileList.length === 1 ? true : "Please add an image";
						},
						shouldUnregister: false,
					})}
					id="image"
					type="file"
					accept="image/*"
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						const reader = new FileReader();
						const file = event.target.files[0];
						reader.readAsDataURL(file);
						reader.onloadend = () => {
							setPreviewImage(reader.result as string);
						};
						clearErrors("image");
					}}
					className="peer w-0 h-0 absolute focus:outline-none"
				/>
				<label
					role="button"
					htmlFor="image"
					className="p-4 cursor-pointer block border-[2px] border-dotted peer-focus:border-solid border-gray-300 dark:border-gray-400 peer-focus:border-black dark:peer-focus:border-white"
				>
					Click to add image
				</label>
				{previewImage && (
					<div className="relative w-full h-56">
						<Image
							src={previewImage}
							layout="fill"
							objectFit="cover"
							alt="preview image"
						/>
					</div>
				)}
				{errors.image && <div className="text-red-400">{errors.image.message}</div>}
			</div> */}

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
