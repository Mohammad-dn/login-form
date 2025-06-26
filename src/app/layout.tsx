import type { Metadata } from "next";
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
		<html lang="fa">
			<body>{children}</body>
		</html>
	);
}
