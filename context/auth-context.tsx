import React from "react";
import { ILoginCredentials } from "pages/api/login";
import { Api } from "utils/api";
import { IUserData } from "pages/api/me";

type ContextType = {
	user: IUserData;
	register: ({ username, email, password }) => void;
	login: ({ username, password }) => void;
	logout: () => void;
};

interface AuthProviderProps {
	children: React.ReactChild;
}

const AuthContext = React.createContext(null);
AuthContext.displayName = "AuthContext";

function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = React.useState(null);
	const [error, setError] = React.useState(null);

	React.useEffect(() => {
		getUserInfo();
	}, []);

	const getUserInfo = async () => {
		const res = await Api.getUserInfo();
		const data = await res.json();
		console.log(data);
		setUser(data.user);
	};

	const register = async ({ email, username, password }) => {
		console.log("register");
	};

	const login = user => {
		setUser(user);
	};

	const logout = async () => {
		setUser(null);
	};

	const value = {
		user,
		register,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
	const context: ContextType = React.useContext(AuthContext);
	if (context === undefined) {
		throw new Error(`useAuth must be used within a AuthProvider`);
	}
	return context;
}

export { AuthProvider, useAuth };
