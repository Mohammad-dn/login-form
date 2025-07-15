import { z } from "zod";

export const generateZodSchema = (fields: any[]) => {
	const shape: Record<string, any> = {};

	fields.forEach((field) => {
		let zodField;

		switch (field.type) {
			case "text":
			case "email":
				zodField = z.string();
				if (field.type === "email") zodField = zodField.email();
				break;
			case "number":
				zodField = z.coerce.number();
				break;
			case "select":
				zodField = z.enum(field.options);
				break;
			default:
				zodField = z.any();
		}

		if (field.required) {
			if (field.type === "text" || field.type === "email") {
				zodField = (zodField as any).min(
					1,
					`${field.label} is required`
				);
			} else if (field.type === "number") {
				zodField = zodField;
			} else if (field.type === "select") {
				zodField = zodField;
			} else {
				zodField = zodField;
			}
		} else {
			zodField = zodField.optional();
		}

		shape[field.name] = zodField;
	});

	return z.object(shape);
};
