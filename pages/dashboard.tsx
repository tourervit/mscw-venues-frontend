import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Layout } from "components/common/Layout";
import { parseCookies } from "utils/f";
import { EventData } from "components/event/event-types";
import { EventPreviewCard } from "components/event/EventPreviewCard";
import { NavLink } from "components/common/NavLink";

interface DashboardPageProps {
	events: EventData[];
}

export default function DashboardPage({ events }: DashboardPageProps) {
	console.log(events);
	return (
		<Layout description="My Events">
			<h1 className="mb-6 text-2xl font-light text-center">My events</h1>

			<div className="max-w-6xl mx-auto">
				{events.length === 0 && (
					<p className="text-center">
						You have no events. Do you want to{" "}
						<NavLink href="/events/add">create one?</NavLink>
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
				destination: "/login",
				permanent: false,
			},
		};
	}
	const { token } = parseCookies(req.headers.cookie);
	let events = null;
	console.log(token);
	if (token) {
		const res = await fetch("http://localhost:1337/events/me", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		events = await res.json();
	}
	console.log(events);
	return {
		props: {
			events,
		},
	};
};
