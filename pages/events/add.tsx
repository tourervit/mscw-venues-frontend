import React from "react";
import { Layout } from "components/common/Layout";
import { EventForm } from "components/event/EventForm";
import { API_URL } from "config";
import toast from "react-hot-toast";
import { useRouter } from "next/dist/client/router";
import { EventData } from "components/event/event-types";
import { Api } from "utils/api";

export default function AddPage() {
	const { push } = useRouter();

	const handleSubmit = async data => {
		const { image, ...rest } = data;
		const formData = new FormData();
		formData.append("files.image", image[0]);
		formData.append("data", JSON.stringify(rest));

		const response = await Api.addEvent(formData);
		if (response.ok) {
			const event: EventData = await response.json();
			toast.success("Successfully created!");
			push(`/events/${event.slug}`);
		} else {
			toast.error("Oops, can't create event with that name");
		}
	};

	return (
		<Layout title="Add">
			<div className="max-w-6xl mx-auto ">
				<EventForm onSubmit={handleSubmit} defaultValues={{}} />
			</div>
		</Layout>
	);
}
