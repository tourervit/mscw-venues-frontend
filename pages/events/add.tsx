import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import toast from "react-hot-toast";
import { useRouter } from "next/dist/client/router";
import { Layout } from "components/common/Layout";
import { EventForm } from "components/event/EventForm";
import { Api } from "utils/api";
import { useAsync } from "utils/hooks";
import { parseCookies } from "utils/f";

interface AddPageProps {
	t: string;
}

export default function AddPage({ t }: AddPageProps) {
	const router = useRouter();
	const { run, data, error, isLoading, isSuccess, isError } = useAsync();

	React.useEffect(() => {
		if (isSuccess) {
			toast.success("Successfully created!");
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
		formData.append("files.image", image[0]);
		formData.append("data", JSON.stringify(rest));
		run(
			Api.addEvent(formData, {
				Authorization: `Bearer ${t}`,
			}),
		);
	};

	return (
		<Layout title="Add">
			<div className="max-w-6xl mx-auto ">
				<EventForm onSubmit={handleSubmit} defaultValues={{}} isSubmitting={isLoading} />
			</div>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { req } = ctx;
	const t = req.headers.cookie && parseCookies(req.headers.cookie).token;
	return {
		props: {
			t,
		},
	};
};
