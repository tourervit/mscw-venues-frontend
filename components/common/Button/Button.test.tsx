import { screen, render } from "test/test-utils";
import Button from "./Button";

describe("Button", () => {
	test("has correct type", () => {
		render(<Button type="reset">Reset</Button>);
		const btn = screen.getByRole("button", { name: /reset/i });
		expect(btn).toBeInTheDocument();
		expect(btn).toHaveAttribute("type", "reset");
	});

	test("displays loading spinner", () => {
		render(<Button loading={true}>Click</Button>);
		expect(screen.getByRole("button", { name: /click/i })).toBeInTheDocument();
		expect(screen.getByTestId("button-spinner")).toBeInTheDocument();
	});
});
