import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import toast from 'react-hot-toast';
import { Layout } from 'components/common/Layout';
import { EventForm } from 'components/event/EventForm';
import { Api } from 'utils/api';
import { EventData } from 'components/event/event-types';
import { useAsync } from 'utils/hooks';
import { isOwner, parseCookies } from 'utils/f';

interface EditPageProps {
	event: EventData;
	t: string;
}

export default function EditPage({ event, t }: EditPageProps) {
	const router = useRouter();
	const { run, data, error, isLoading, isSuccess, isError } = useAsync();

	React.useEffect(() => {
		if (isSuccess) {
			toast.success('Successfully created!');
			router.push(`/events/${data.slug}`);
		}
	}, [data, isSuccess, router]);

	React.useEffect(() => {
		if (isError) {
			toast.error(error.message);
		}
	}, [error, isError]);

	const handleSubmit = data => {
		const { image, ...rest } = data;
		const formData = new FormData();
		if (image) {
			formData.append('files.image', image[0]);
		}
		formData.append('data', JSON.stringify(rest));
		run(
			Api.editEvent(router.query.id, formData, {
				Authorization: `Bearer ${t}`,
			}),
		);
	};

	return (
		<Layout title="Edit">
			<div className="w-full mx-auto px-4 max-w-lg">
				<EventForm onSubmit={handleSubmit} event={event} isSubmitting={false} editable />
			</div>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const {
		req,
		params: { id },
	} = ctx;

	const t = req.headers.cookie && parseCookies(req.headers.cookie).token;
	const response = await Api.getEvent(id);
	const event: EditPageProps['event'] = await response.json();

	if (!isOwner(t, event)) {
		return {
			props: {},
			redirect: {
				destination: '/dashboard',
			},
		};
	}

	return {
		props: {
			event,
			t,
		},
	};
};
