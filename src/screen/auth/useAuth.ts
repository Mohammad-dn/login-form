"use client";

import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getRandomUser } from "../../services/getRandomUser";
export function useAuth() {
	const [phone, setPhone] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
	const router = useRouter();

	const { setUser } = useAuthContext();
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
		setIsLoading(true);
		e.preventDefault();

		const normalized = normalizePhone();

		if (!isValidPhone(normalized)) {
			setError("شماره موبایل معتبر نیست.");
			return;
		}

		setError("");
		const result = await getRandomUser(normalized);

		if (result.success) {
			setIsLoading(false);
			setUser(result.data[0]);
			Cookie.set("auth", "true");
			router.push("/dashboard");
		} else {
			setIsLoading(false);
			setError(result.error || "خطای نامشخصی رخ داده است.");
		}
	};

	return {
		phone,
		setPhone,
		error,
		isButtonDisabled,
		handleSubmit,
		isLoading,
	};
}
