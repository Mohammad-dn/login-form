"use client";

import { Button } from "../../components";
import styles from "./AuthForm.module.scss";
import { useAuth } from "./useAuth";

export function AuthScreen() {
	const {
		phone,
		setPhone,
		error,
		isButtonDisabled,
		handleSubmit,
		isLoading,
	} = useAuth();

	return (
		<div className={styles.screenContainer}>
			<form onSubmit={handleSubmit}>
				<div className={styles.helperText}>
					برای ورود ابتدا شماره تلفن خود را وارد کنید
				</div>
				<div className={styles.formContainer}>
					<input
						className={styles.inputField}
						type="text"
						placeholder="شماره موبایل"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
					{error && (
						<div className={styles.errorMessage}>{error}</div>
					)}
					<Button
						isLoading={isLoading}
						disabled={!isButtonDisabled}
						text="ورود"
					/>
				</div>
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
