export const convertToEnglishDigits = (input: string): string => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return input.replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d).toString());
};

export const isValidPhone = (input: string): boolean => {
  const normalized = convertToEnglishDigits(input);
  return /^09\d{9}$/.test(normalized);
};

export const normalizePhone = (input: string): string => {
  return convertToEnglishDigits(input);
};
