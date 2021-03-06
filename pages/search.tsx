import React from 'react';
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import qs from 'qs';
import { useRouter } from 'next/dist/client/router';
import { Layout } from 'components/common/Layout';
import { EventData } from 'components/event/event-types';
import { EventPreviewCard } from 'components/event/EventPreviewCard';
import { PageTitle } from 'components/common/PageTitle';
import { STRAPI_API_URL } from 'config';

interface EventsPageProps {
	events: EventData[];
}

export default function EventsPage({ events }: EventsPageProps) {
	const {
		query: { q },
	} = useRouter();
	return (
		<Layout title="Events">
			<div className="max-w-6xl mx-auto">
				<div className="px-4">
					<PageTitle>
						Search results for <span className="font-normal">"{q}"</span>
					</PageTitle>
					{events.length === 0 && <p>Sorry, no events</p>}
				</div>
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

	const response = await fetch(`${STRAPI_API_URL}/events?_sort=date:ASC&${query}`);
	const events = await response.json();
	return {
		props: {
			events,
		},
	};
}
