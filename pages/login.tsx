import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/dist/client/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "components/form/Input";
import { Label } from "components/form/Label";
import { Error } from "components/form/Error";
import { Button } from "components/common/Button";
import { Layout } from "components/common/Layout";
import { NavLink } from "components/common/NavLink";
import { useAuth } from "context/auth-context";
import { Api } from "utils/api";
import { useAsync } from "utils/hooks";

type Inputs = {
	username: string;
	password: string;
};

export default function LoginPage() {
	const router = useRouter();
	const {
		register,
		formState: { errors },
		handleSubmit,
		setFocus,
		setError,
	} = useForm<Inputs>();

	const { setUser } = useAuth();
	const { data, error, isLoading, isSuccess, isError, run } = useAsync();

	React.useEffect(() => {
		setFocus("username");
	}, [setFocus]);

	const onSubmit = async data => {
		run(Api.login(data));
	};

	React.useEffect(() => {
		if (isSuccess) {
			setUser(data);
			router.replace("/dashboard");
		}
	}, [isSuccess, router, setUser, data]);

	React.useEffect(() => {
		if (isError) {
			toast.error(error.message);
			setError("username", { message: "" });
			setError("password", { message: "" });
		}
	}, [isError, error, setError]);

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
					<Button type="submit" loading={isLoading}>
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
