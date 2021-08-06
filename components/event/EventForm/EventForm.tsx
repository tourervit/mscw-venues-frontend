import React, { ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { Input } from "components/form/Input";
import { Label } from "components/form/Label";
import { Error } from "components/form/Error";
import { Textarea } from "components/form/Textarea";
import { Button } from "components/common/Button";

type Inputs = {
	name: string;
	venue: string;
	address: string;
	date: Date;
	time: string;
	description: string;
	image: FileList;
};

interface EventFormProps {
	onSubmit: SubmitHandler<Inputs>;
	defaultValues: Inputs | {};
	isSubmitting: boolean;
}

function EventForm({ onSubmit, defaultValues, isSubmitting = false }: EventFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
		setFocus,
	} = useForm<Inputs>({ defaultValues });

	React.useEffect(() => {
		setFocus("name");
	}, [setFocus]);

	const [previewImage, setPreviewImage] = React.useState<string>("");

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto px-6 max-w-lg space-y-10">
			<div className="relative">
				<Input
					name="name"
					register={register}
					type="text"
					validation={{ required: "Name is required" }}
					isError={!!errors.name}
				/>
				<Label htmlFor="name">Event name</Label>
				{errors.name && <Error>{errors.name.message}</Error>}
			</div>
			<div className="relative">
				<Input
					name="venue"
					register={register}
					type="text"
					validation={{ required: "Venue is required" }}
					isError={!!errors.venue}
				/>
				<Label htmlFor="venue">Venue</Label>
				{errors.venue && <Error>{errors.venue.message}</Error>}
			</div>
			<div className="relative">
				<Input
					name="address"
					register={register}
					type="text"
					validation={{ required: "Address is required" }}
					isError={!!errors.address}
				/>
				<Label htmlFor="address">Address</Label>
				{errors.address && <Error>{errors.address.message}</Error>}
			</div>
			<div className="relative">
				<Input
					name="date"
					register={register}
					type="date"
					validation={{ required: "Date is required" }}
					isError={!!errors.date}
				/>
				{errors.date && <Error>{errors.date.message}</Error>}
			</div>
			<div className="relative">
				<Input
					name="time"
					register={register}
					type="text"
					validation={{ required: "Time is required" }}
					isError={!!errors.time}
				/>
				<Label htmlFor="time">Time</Label>
				{errors.time && <Error>{errors.time.message}</Error>}
			</div>
			<div className="relative">
				<Textarea
					register={register}
					name="description"
					rows={3}
					validation={{ required: "Description is required" }}
				/>
				<Label htmlFor="description" className="peer-placeholder-shown:pl-2">
					Description
				</Label>
				{errors.description && <Error>{errors.description.message}</Error>}
			</div>
			<div className="relative">
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
				{errors.image && <Error>{errors.image.message}</Error>}
			</div>

			<Button type="submit" loading={isSubmitting}>
				Create
			</Button>
		</form>
	);
}

export default EventForm;
