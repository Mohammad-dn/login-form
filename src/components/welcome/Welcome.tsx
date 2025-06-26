"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../button/button";
import styles from "./Welcome.module.scss";

export function Welcome() {
	const router = useRouter();
	const handleRedirectToAuth = () => {
		router.push("/auth");
	};

	useEffect(() => {
		const userDetail = localStorage.getItem("userDetail");
		if (!userDetail) {
			router.push("/auth");
		}
	}, []);
	return (
		<div className={styles.welcomeContainer}>
			<motion.div
				initial={{ opacity: 0, y: 200 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 2, ease: "easeInOut" }}
			>
				<h1 className={styles.title}>خوش آمدید 👋</h1>
			</motion.div>
			<div
				style={{
					width: "20rem",
				}}
			>
				<Button
					onClick={handleRedirectToAuth}
					text="مشاهده فرم لاگین"
				/>
			</div>
		</div>
	);
}
