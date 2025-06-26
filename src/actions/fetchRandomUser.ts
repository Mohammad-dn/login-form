export async function getRandomUserService(results: number, nat: string) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_RANDOMUSER}?${results}&${nat}`,
			{
				next: { tags: ["filterData"] },
				cache: "no-store",
			}
		);

		if (!res.ok) {
			throw new Error(`Error fetching data: ${res.statusText}`);
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch frequently bought products:", error);
		throw error;
	}
}
