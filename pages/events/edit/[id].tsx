import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Layout } from "components/common/Layout";
import { EventForm } from "components/event/EventForm";
import { API_URL } from "config";
import toast from "react-hot-toast";
import { useRouter } from "next/dist/client/router";
import dateformat from "dateformat";
import { Api } from "utils/api";
import { EventData } from "components/event/event-types";

interface EditPageProps {
	event: EventData;
}

export default function EditPage({ event }: EditPageProps) {
	const { push, query } = useRouter();
	const defaultValues = { ...event, date: dateformat(event.date, "yyyy-mm-dd") };

	const handleSubmit = async data => {
		const response = await Api.editEvent(query.id, data);
		if (response.ok) {
			const event: EventData = await response.json();
			toast.success("Changes commited");
			push(`/events/${event.slug}`);
		} else {
			toast.error("Oops, can't edit event with that name");
		}
	};

	return (
		<Layout title="Edit">
			<div className="max-w-6xl mx-auto ">
				<EventForm onSubmit={handleSubmit} defaultValues={defaultValues} />
			</div>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const {
		params: { id },
	} = ctx;

	const response = await Api.getEvent(id);
	const event: EditPageProps["event"] = await response.json();

	return {
		props: {
			event,
		},
	};
};
