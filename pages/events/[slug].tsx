import React from 'react';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Image from 'next/image';
import { Layout } from 'components/common/Layout';
import { EventData } from 'components/event/event-types';
import { NLink } from 'components/common/NLink';
import { EventMap } from 'components/event/EventMap';
import { PageTitle } from 'components/common/PageTitle';
import { STRAPI_API_URL } from 'config';
import thumbImg from 'public/logo-sm.png';

interface EventPageProps {
	event: EventData;
}

export default function EventPage({ event }: EventPageProps) {
	const url = event.image?.formats?.xlarge ? event.image.formats.xlarge.url : event.image.url;
	return (
		<Layout>
			<div className="max-w-6xl mx-auto flex items-center">
				<PageTitle>{event.name}</PageTitle>
				<NLink href={`/events/edit/${event.id}`} className="mb-4 md:mb-10 px-4 pb-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
						/>
					</svg>
				</NLink>
			</div>
			<div className="mb-6 md:mb-14 relative h-60 sm:h-96 w-full">
				<Image
					src={
						url ??
						'https://images.forwardcdn.com/image/1300x/center/images/cropped/pepe-1467736135-1472136530.jpg'
					}
					layout="fill"
					objectFit="cover"
					placeholder="blur"
					blurDataURL={event.image?.formats?.thumbnail?.url ?? thumbImg.src}
					alt={event.name}
				/>
			</div>
			<div className="max-w-6xl mx-auto px-4 text-base md:text-lg font-light leading-tight">
				<p className="mb-4 md:mb-8">
					<span className="text-sm font-bold uppercase tracking-widest">What:</span>{' '}
					{event.description}
				</p>
				<p className="mb-4 md:mb-8">
					<span className="text-sm font-bold uppercase tracking-widest">Where:</span> @{event.venue}
				</p>
			</div>
			<EventMap address={event.address} />
		</Layout>
	);
}

export async function getStaticPaths() {
	const response = await fetch(`${STRAPI_API_URL}/events`);
	const events = await response.json();
	const paths = events.map(event => ({ params: { slug: event.slug } }));
	return {
		paths,
		fallback: 'blocking',
	};
}

export async function getStaticProps(
	ctx: GetStaticPropsContext,
): Promise<GetStaticPropsResult<EventPageProps>> {
	const response = await fetch(`${STRAPI_API_URL}/events?slug=${ctx.params.slug}`);
	const event = await response.json();
	return {
		props: {
			event: event[0],
		},
		revalidate: 5,
	};
}
