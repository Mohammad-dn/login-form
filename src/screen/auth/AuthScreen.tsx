"use client";

import { Button } from "../../components";
import styles from "./AuthForm.module.scss";
import { useAuth } from "./useAuth";

export function AuthScreen() {
	const { phone, setPhone, error, isButtonDisabled, handleSubmit } =
		useAuth();

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

				<Button disabled={isButtonDisabled} text="ورود" />
			</form>

			<div className={styles.authImageContainer}>
				<img
					src="/authImage.jpg"
					alt="auth image"
					className={styles.authImage}
				/>
			</div>
		</div>
	);
}
