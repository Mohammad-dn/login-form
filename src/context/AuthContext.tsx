"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type UserType = any;

interface AuthContextType {
	user: UserType | null;
	setUser: (user: UserType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<UserType | null>(null);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within AuthProvider");
	}
	return context;
};
