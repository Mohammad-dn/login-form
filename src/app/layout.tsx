import type { Metadata } from "next";
import { AuthProvider } from "../context/AuthContext";
import "./globals.scss";

export const metadata: Metadata = {
	title: "Task App",
	description: "Simple authentication with phone number",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html dir="rtl" lang="fa">
			<body>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
