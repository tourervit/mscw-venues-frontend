import React from "react";
import Image from "next/image";
import { Layout } from "components/common/Layout";
import { EventData } from "components/event/event-types";
import { API_URL } from "config";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";

interface EventPageProps {
	event: EventData;
}

export default function EventPage({ event }: EventPageProps) {
	return (
		<Layout>
			<div className="mb-6 relative h-60 sm:h-96 w-full">
				<Image src={event.image.url} layout="fill" objectFit="cover" alt={event.name} />
			</div>
			<div className="px-4">
				<h1 className="text-xl mb-4">{event.name}</h1>
				<p className="text-sm font-light leading-tight mb-4">{event.description}</p>
				<p className="text-sm font-bold">@{event.venue}</p>
				<p className="text-sm font-light text-blue-600">{event.address}</p>
			</div>
		</Layout>
	);
}

export async function getStaticPaths() {
	const response = await fetch(`${API_URL}/events`);
	const events = await response.json();
	const paths = events.map(event => ({ params: { slug: event.slug } }));
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps(
	ctx: GetStaticPropsContext,
): Promise<GetStaticPropsResult<EventPageProps>> {
	const response = await fetch(`${API_URL}/events?slug=${ctx.params.slug}`);
	const event = await response.json();
	return {
		props: {
			event: event[0],
		},
	};
}
