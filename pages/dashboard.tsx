import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Layout } from 'components/common/Layout';
import { parseCookies } from 'utils/f';
import { EventData } from 'components/event/event-types';
import { EventPreviewCard } from 'components/event/EventPreviewCard';
import { NLink } from 'components/common/NLink';
import { PageTitle } from 'components/common/PageTitle';
import { STRAPI_API_URL } from 'config';

interface DashboardPageProps {
	events: EventData[];
}

export default function DashboardPage({ events }: DashboardPageProps) {
	return (
		<Layout description="My Events">
			<div className="max-w-6xl mx-auto">
				<div className="px-4 flex items-center">
					<PageTitle>My events</PageTitle>
					<NLink
						href="/events/add"
						className="mb-4 md:mb-10 px-3 py-1 hover:-rotate-90 transition-all duration-300"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v16m8-8H4"
							/>
						</svg>
					</NLink>
				</div>
				{events.length === 0 && (
					<p className="text-center">
						You have no events. Do you want to <NLink href="/events/add">create one?</NLink>
					</p>
				)}
				{events?.map(event => (
					<EventPreviewCard key={event.id} event={event} className="w-full h-72 mb-10" />
				))}
			</div>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { req, res } = ctx;
	if (!req.headers.cookie) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}
	const { token } = parseCookies(req.headers.cookie);
	let events = null;
	if (token) {
		const res = await fetch(`${STRAPI_API_URL}/events/me?_sort=created_at:DESC`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		events = await res.json();
	}
	return {
		props: {
			events,
		},
	};
};
