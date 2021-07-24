import React from "react";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { Layout } from "components/common/Layout";
import { EventData } from "components/event/event-types";
import { API_URL } from "config";
import { EventPreviewCard } from "components/event/EventPreviewCard";

interface EventsPageProps {
	events: EventData[];
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
	ctx: GetStaticPropsContext,
): Promise<GetStaticPropsResult<EventsPageProps>> {
	const response = await fetch(`${API_URL}/events?_sort=date:ASC`);
	const events = await response.json();
	return { props: { events }, revalidate: 5 };
}
