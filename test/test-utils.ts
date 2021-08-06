import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "mutationobserver-shim";
import { IUserData } from "pages/api/me";
import * as authHook from "context/auth-context";

const useRouter = jest.spyOn(require("next/router"), "useRouter");
function mockNextUseRouter(props: {
	route?: string;
	pathname?: string;
	query?: string;
	asPath?: string;
}) {
	useRouter.mockImplementation(() => ({
		route: props.route,
		pathname: props.pathname,
		query: props.query,
		asPath: props.asPath,
	}));
}

const useAuth = jest.spyOn(authHook, "useAuth");

function mockUseAuth(props: { user?: IUserData; setUser: (data) => void }) {
	useAuth.mockImplementation(() => ({
		user: props.user,
		setUser: props.setUser,
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
export { userEvent, waitForLoadingToFinish, mockNextUseRouter, mockUseAuth };
