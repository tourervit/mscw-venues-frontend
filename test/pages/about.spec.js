import React from "react";
import { screen, render } from "../test-utils";
import AboutPage from "pages/about";

test("should contain header with About", () => {
	render(<AboutPage />);
	expect(screen.getByRole("heading", { name: /about/i })).toBeInTheDocument();
});
