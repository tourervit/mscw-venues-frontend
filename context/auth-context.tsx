import React from "react";

type ContextType = {
	user: {
		name: string;
	};
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

	const register = async ({ email, username, password }) => {
		console.log("register");
	};

	const login = async ({ username, password }) => {
		console.log("login");
	};

	const logout = async () => {
		console.log("logout");
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
