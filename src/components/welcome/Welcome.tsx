"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "../button/button";
import styles from "./Welcome.module.scss";

export function Welcome() {
	const router = useRouter();
	const handleRedirectToAuth = () => {
		router.push("/auth");
	};
	return (
		<motion.div
			className={styles.welcomeContainer}
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
		>
			<h1 className={styles.title}>خوش آمدید 👋</h1>

			<Button onClick={handleRedirectToAuth} text="مشاهده فرم لاگین" />
		</motion.div>
	);
}
