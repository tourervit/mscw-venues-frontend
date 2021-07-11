import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// async function render(ui, options) {
// 	const returnValue = {
// 		...rtlRender(ui, { wrapper: AppProviders, ...renderOptions }),
// 		user,
// 	};

// 	await waitForLoadingToFinish();

// 	return returnValue;
// }

const waitForLoadingToFinish = () =>
	waitForElementToBeRemoved(() => [
		...screen.queryAllByLabelText(/loading/i),
		...screen.queryAllByText(/loading/i),
	]);

export * from "@testing-library/react";
export { userEvent, waitForLoadingToFinish };
