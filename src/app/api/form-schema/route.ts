// app/api/form-schema/route.ts
import { NextResponse } from "next/server";

export async function GET() {
	const formFields = [
		{
			name: "fullName",
			label: "Full Name",
			type: "text",
			required: true,
		},
		{
			name: "password",
			label: "password",
			type: "password",
			required: true,
		},
		{
			name: "age",
			label: "Age",
			type: "number",
			required: false,
		},
		{
			name: "gender",
			label: "Gender",
			type: "select",
			options: ["Male", "Female", "Other"],
			required: true,
		},
	];

	return NextResponse.json(formFields);
}
