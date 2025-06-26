"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getRandomUser } from "../../services/getRandomUser";

export function useAuth() {
	const [phone, setPhone] = useState("");
	const [error, setError] = useState("");
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
	const router = useRouter();

	const convertToEnglishDigits = useCallback((input: string): string => {
		const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
		return input.replace(/[۰-۹]/g, (d) =>
			persianDigits.indexOf(d).toString()
		);
	}, []);

	const isValidPhone = useCallback(
		(num: string) => /^09\d{9}$/.test(convertToEnglishDigits(num)),
		[convertToEnglishDigits]
	);

	const normalizePhone = useCallback(
		(): string => convertToEnglishDigits(phone),
		[phone, convertToEnglishDigits]
	);

	useEffect(() => {
		const normalized = convertToEnglishDigits(phone);
		if (isValidPhone(normalized)) {
			setError("");
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}, [phone, convertToEnglishDigits, isValidPhone]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const normalized = normalizePhone();

		if (!isValidPhone(normalized)) {
			setError("شماره موبایل معتبر نیست.");
			return;
		}

		setError("");
		const result = await getRandomUser(normalized);

		if (result.success) {
			router.push("/dashboard");
		} else {
			setError(result.error || "خطای نامشخصی رخ داده است.");
		}
	};

	return {
		phone,
		setPhone,
		error,
		isButtonDisabled,
		handleSubmit,
	};
}
