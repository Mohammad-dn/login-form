import { getRandomUserService } from "../actions/fetchRandomUser";

export const getRandomUser = async (
	phone: string
): Promise<{ success: boolean; data?: any; error?: string }> => {
	try {
		const res = await getRandomUserService(1, "us");

		if (res?.results) {
			localStorage.setItem("userDetail", JSON.stringify(res.results[0]));
			return { success: true, data: res.results };
		} else {
			return { success: false, error: "پاسخی از سرور دریافت نشد." };
		}
	} catch (err) {
		console.error("Login error:", err);
		return { success: false, error: "خطا در اتصال به سرور." };
	}
};
