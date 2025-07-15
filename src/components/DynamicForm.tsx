"use client";

import { generateZodSchema } from "@/utils/generateZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ZodType } from "zod";

export default function DynamicForm() {
	const [fields, setFields] = useState<any[]>([]);
	const [schema, setSchema] = useState<ZodType<any> | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: schema ? zodResolver(schema as any) : undefined,
	});

	useEffect(() => {
		const fetchSchema = async () => {
			const res = await fetch("/api/form-schema");
			const json = await res.json();
			setFields(json);
			setSchema(generateZodSchema(json));
			reset();
		};

		fetchSchema();
	}, [reset]);

	const onSubmit = async (data: any) => {
		console.log("Submitted:", data);
		// await fetch('/api/submit', { method: 'POST', body: JSON.stringify(data) })
	};

	if (!schema) return <p>Loading form...</p>;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			{fields.map((field) => (
				<div key={field.name}>
					<label className="block font-medium mb-1">
						{field.label}
					</label>

					{field.type === "select" ? (
						<select
							{...register(field.name)}
							className="border rounded px-3 py-2 w-full"
						>
							<option value="">Select {field.label}</option>
							{field.options.map((opt: string) => (
								<option key={opt} value={opt}>
									{opt}
								</option>
							))}
						</select>
					) : (
						<input
							type={field.type}
							{...register(field.name)}
							className="border rounded px-3 py-2 w-full"
						/>
					)}

					{errors[field.name] && (
						<p className="text-red-500 text-sm">
							{(errors as any)[field.name]?.message}
						</p>
					)}
				</div>
			))}

			<button
				type="submit"
				className="bg-blue-600 text-white px-4 py-2 rounded"
			>
				Submit
			</button>
		</form>
	);
}
