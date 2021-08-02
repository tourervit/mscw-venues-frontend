import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "mutationobserver-shim";

const useRouter = jest.spyOn(require("next/router"), "useRouter");
function mockNextUseRouter(props: {
	route?: string;
	pathname?: string;
	query?: string;
	asPath?: string;
}) {
	useRouter.mockImplementationOnce(() => ({
		route: props.route,
		pathname: props.pathname,
		query: props.query,
		asPath: props.asPath,
	}));
}

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
export { userEvent, waitForLoadingToFinish, mockNextUseRouter };
