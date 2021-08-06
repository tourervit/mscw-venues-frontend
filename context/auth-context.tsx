import React from "react";
import { Api } from "utils/api";
import { IUserData } from "pages/api/me";

type ContextType = {
	user: IUserData;
	setUser: (data) => void;
};

interface AuthProviderProps {
	children: React.ReactChild;
}

const AuthContext = React.createContext(null);
AuthContext.displayName = "AuthContext";

function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = React.useState(null);

	React.useEffect(() => {
		getUserInfo();
	}, []);

	const getUserInfo = async () => {
		const res = await Api.getUserInfo();
		const data = await res.json();
		setUser(data.user);
	};

	const value = {
		user,
		setUser,
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
