import React from "react";
import { Layout } from "components/common/Layout";
import { EventForm } from "components/event/EventForm";

export default function AddPage() {
	const handleSubmit = data => {
		console.log(data);
	};
	return (
		<Layout title="Add">
			<div className="max-w-6xl mx-auto ">
				<EventForm onSubmit={handleSubmit} />
			</div>
		</Layout>
	);
}
