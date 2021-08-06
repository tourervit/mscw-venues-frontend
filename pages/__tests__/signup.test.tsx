import React from "react";
import { screen, render, mockNextUseRouter, mockUseAuth } from "test/test-utils";
import SignupPage from "pages/signup";

jest.mock("next/image", () => ({
	__esModule: true,
	default: () => {
		return "Next image stub";
	},
}));

describe("Sign Up", () => {
	test("renders all sign up elements", () => {
		mockNextUseRouter({
			route: "/signup",
		});
		const expectedSetUser = jest.fn();
		mockUseAuth({
			user: null,
			setUser: expectedSetUser,
		});
		render(<SignupPage />);
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
		expect(screen.getByLabelText("Password")).toBeInTheDocument();
		expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
	});
});
