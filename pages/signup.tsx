import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "components/form/Input";
import { Label } from "components/form/Label";
import { Button } from "components/common/Button";
import { Error } from "components/form/Error";
import { Layout } from "components/common/Layout";
import { NavLink } from "components/common/NavLink";
import { useAuth } from "context/auth-context";
import { useAsync } from "utils/hooks";
import { Api } from "utils/api";

type Inputs = {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
};

export default function SignupPage() {
	const router = useRouter();
	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
		setFocus,
		setError,
	} = useForm<Inputs>();

	const { setUser } = useAuth();
	const { data, error, isLoading, isSuccess, isError, run } = useAsync();

	React.useEffect(() => {
		setFocus("email");
	}, [setFocus]);

	const onSubmit = async data => {
		run(Api.register(data));
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
			setError("email", { message: "" });
			setError("username", { message: "" });
		}
	}, [isError, error, setError]);

	return (
		<Layout title="Sign Up">
			<div className="w-full mx-auto pt-[16vh] px-6 max-w-sm">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
					<div className="relative">
						<Input
							autoFocus
							name="email"
							register={register}
							type="text"
							validation={{ required: "Email is required" }}
							isError={!!errors.email}
						/>
						<Label htmlFor="email">Email</Label>
						{errors.email && <Error>{errors.email.message}</Error>}
					</div>
					<div className="relative">
						<Input
							name="username"
							register={register}
							type="text"
							validation={{ required: "Username is required" }}
							isError={!!errors.username}
						/>
						<Label htmlFor="username">Username</Label>
						{errors.username && <Error>{errors.username.message}</Error>}
					</div>
					<div className="relative">
						<Input
							name="password"
							register={register}
							type="password"
							validation={{ required: "Password is required" }}
						/>
						<Label htmlFor="password">Password</Label>
						{errors.password && <Error>{errors.password.message}</Error>}
					</div>
					<div className="relative">
						<Input
							name="confirmPassword"
							register={register}
							type="password"
							validation={{
								validate: value => {
									const password = getValues("password");
									if (!value) return "Confirm-password is required";
									if (password === value) return true;
									return "Password doesn't match";
								},
							}}
						/>
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						{errors.confirmPassword && <Error>{errors.confirmPassword.message}</Error>}
					</div>
					<Button type="submit" loading={isLoading}>
						Sign Up
					</Button>
				</form>
				<div className="text-center mt-4 text-sm">
					<span className="mr-1">Already have an account?</span>
					<NavLink href="/login">Log In!</NavLink>
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
