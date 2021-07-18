import React from "react";
import { GetStaticPropsResult, NextPageContext } from "next";
import { Layout } from "components/common/Layout";
import { Event } from "components/event/types";
import { API_URL } from "config";
import { EventPreviewCard } from "components/event/EventPreviewCard";

interface EventsPageProps {
	events: Event[];
}

export default function EventsPage({ events }: EventsPageProps) {
	return (
		<Layout title="Events">
			<h1 className="mb-6 text-2xl font-light text-center">Upcoming</h1>
			{events.length === 0 && <p>Sorry, no events</p>}
			<div className="max-w-6xl mx-auto">
				{events?.map(event => (
					<EventPreviewCard key={event.id} event={event} className="w-full h-72 mb-10" />
				))}
			</div>
		</Layout>
	);
}

export async function getStaticProps(
	ctx: NextPageContext,
): Promise<GetStaticPropsResult<EventsPageProps>> {
	const response = await fetch(`${API_URL}/api/events`);
	const events = await response.json();
	return {
		props: {
			events,
		},
		revalidate: 5,
	};
}
