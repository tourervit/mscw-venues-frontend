import { screen, render, mockNextUseRouter } from "test/test-utils";
import NavLink from "./NavLink";

describe("NavLink", () => {
	test("has correct href in <a> tag", () => {
		mockNextUseRouter({
			route: "/",
		});
		render(<NavLink href="/about">About</NavLink>);
		const lnk = screen.getByRole("link", { name: /about/i });
		expect(lnk).toBeInTheDocument();
		expect(lnk).toHaveAttribute("href", "/about");
	});

	test("changes color on hover", () => {
		mockNextUseRouter({
			route: "/",
		});
		render(<NavLink href="/about">About</NavLink>);
		const lnk = screen.getByRole("link", { name: /about/i });
		expect(lnk).toHaveClass(
			"text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white",
		);
	});

	test("has different color on active route", () => {
		mockNextUseRouter({
			route: "/about",
		});
		render(<NavLink href="/about">About</NavLink>);
		const about = screen.getByRole("link", { name: /about/i });
		expect(about).toHaveClass("text-black dark:text-white");
	});
});
