import React from "react";
import {
	GetServerSidePropsResult,
	GetStaticPropsResult,
	GetStaticPropsContext,
	GetServerSidePropsContext,
} from "next";
import qs from "qs";
import { useRouter } from "next/dist/client/router";
import { Layout } from "components/common/Layout";
import { Event } from "components/event/event-types";
import { API_URL } from "config";
import { EventPreviewCard } from "components/event/EventPreviewCard";

interface EventsPageProps {
	events: Event[];
}

export default function EventsPage({ events }: EventsPageProps) {
	const {
		query: { q },
	} = useRouter();
	return (
		<Layout title="Events">
			<h1 className="mb-6 text-2xl font-light text-center">Search results for "{q}"</h1>
			{events.length === 0 && <p>Sorry, no events</p>}
			<div className="max-w-6xl mx-auto">
				{events?.map(event => (
					<EventPreviewCard key={event.id} event={event} className="w-full h-72 mb-10" />
				))}
			</div>
		</Layout>
	);
}

export async function getServerSideProps(
	ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<EventsPageProps>> {
	const {
		query: { q },
	} = ctx;
	const query = qs.stringify({
		_where: {
			_or: [{ name_contains: q }, { venue_contains: q }],
		},
	});

	const response = await fetch(`${API_URL}/events?_sort=date:ASC&${query}`);
	const events = await response.json();
	return {
		props: {
			events,
		},
	};
}
