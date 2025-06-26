"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../components";
import styles from "./AuthForm.module.scss";

export function AuthScreen() {
	const [phone, setPhone] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const convertToEnglishDigits = (input: string): string => {
		const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
		return input.replace(/[۰-۹]/g, (d) =>
			persianDigits.indexOf(d).toString()
		);
	};

	const isValidPhone = (num: string) =>
		/^09\d{9}$/.test(convertToEnglishDigits(num));

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const normalized = convertToEnglishDigits(phone);

		if (!isValidPhone(normalized)) {
			setError("شماره موبایل معتبر نیست.");
			return;
		} else {
		}

		setError("");
		router.push("/dashboard");
	};

	return (
		<div className={styles.screenContainer}>
			<form onSubmit={handleSubmit}>
				<div className={styles.helperText}>
					برای ورود ابتدا شماره تلفن خود را وارد کنید
				</div>

				<input
					type="text"
					placeholder="شماره موبایل"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					className={styles.inputField}
				/>
				{error && <div className={styles.errorMessage}>{error}</div>}
				<Button text="ورود" />
			</form>

			<div className={styles.authImageContainer}>
				<img src="/authImage.jpg" alt="" className={styles.authImage} />
			</div>
		</div>
	);
}
