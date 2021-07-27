import React from "react";
import { useForm } from "react-hook-form";
import Button from "components/common/Button/Button";
import { Input } from "components/form/Input";
import { Label } from "components/form/Label";
import { Error } from "components/form/Error";
import { Layout } from "components/common/Layout";
import { NavLink } from "components/common/NavLink";
import { useRouter } from "next/dist/client/router";

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
	} = useForm<Inputs>();

	React.useEffect(() => {
		setFocus("username");
	}, [setFocus]);

	const { push } = useRouter();

	const onSubmit = data => {
		push("/events");
	};

	return (
		<Layout title="Login">
			<div className="w-full mx-auto px-6 max-w-sm">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
					<div className="relative">
						<Input
							autoFocus={true}
							name="username"
							register={register}
							type="text"
							validation={{ required: "Username is required" }}
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
					<Button type="submit" loading={false}>
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
