"use client";

import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getRandomUser } from "../../services/getRandomUser";
import { isValidPhone, normalizePhone } from "@/utils/auth";

export function useAuth() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();

  const { setUser, user } = useAuthContext();

  useEffect(() => {
    setIsButtonDisabled(!isValidPhone(phone));
    if (!isValidPhone(phone)) {
      setError("شماره موبایل معتبر نیست.");
    } else {
      setError("");
    }
  }, [phone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isValidPhone(phone)) {
      setError("شماره موبایل معتبر نیست.");
      setIsLoading(false);
      return;
    }

    const result = await getRandomUser(normalizePhone(phone));

    if (result.success) {
      setUser(result.data[0]);
      localStorage.setItem("userDetail", JSON.stringify(result.data[0]));
      Cookie.set("auth", "true", { path: "/" });
      router.push("/dashboard");
    } else {
      setError(result.error || "خطای نامشخصی رخ داده است.");
    }

    setIsLoading(false);
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
