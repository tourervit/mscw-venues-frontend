import React from "react";
import { useForm } from "react-hook-form";
import Button from "components/common/Button/Button";
import { Input } from "components/form/Input";
import { Label } from "components/form/Label";
import { Error } from "components/form/Error";
import { Layout } from "components/common/Layout";
import { NavLink } from "components/common/NavLink";
import { useRouter } from "next/dist/client/router";
import { Api } from "utils/api";
import toast from "react-hot-toast";
import { useAsync } from "utils/hooks";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useAuth } from "context/auth-context";

type Inputs = {
	username: string;
	password: string;
};

export default function LoginPage() {
	const {
		register,
		formState: { errors },
		handleSubmit,
		setFocus,
		setError,
	} = useForm<Inputs>();

	const { replace } = useRouter();
	const { login } = useAuth();
	const { data, error, status, run } = useAsync();

	React.useEffect(() => {
		setFocus("username");
	}, [setFocus]);

	React.useEffect(() => {
		if (error) {
			toast.error(error.message);
			setError("username", { message: "" });
			setError("password", { message: "" });
		}
	}, [error, setError]);

	const onSubmit = async data => {
		run(Api.login(data));
		const res = await Api.login(data);
		if (res.ok) {
			const user = await res.json();
			login(user);
			replace("/events");
		}
	};
	return (
		<Layout title="Login">
			<div className="w-full mx-auto pt-[16vh] px-6 max-w-sm">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
					<div className="relative">
						<Input
							autoFocus={true}
							name="username"
							register={register}
							type="text"
							validation={{ required: "Username is required" }}
							isError={!!errors.username}
						/>
						<Label htmlFor="username">Username or email</Label>
						{errors.username && <Error>{errors.username.message}</Error>}
					</div>
					<div className="relative">
						<Input
							name="password"
							register={register}
							type="password"
							validation={{ required: "Password is required" }}
							isError={!!errors.password}
						/>
						<Label htmlFor="password">Password</Label>
						{errors.password && <Error>{errors.password.message}</Error>}
					</div>
					<Button type="submit" loading={status === "pending"}>
						Login
					</Button>
				</form>
				<div className="text-center mt-4 text-sm">
					<span className="mr-1">Don't have an account?</span>
					<NavLink href="/signup">Sign Up!</NavLink>
				</div>
			</div>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { req, res } = ctx;

	if (req.headers.cookie) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
