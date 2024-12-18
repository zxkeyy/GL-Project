import i18n from "i18next";

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return i18n.t("auth.validations.email.required");
  if (!emailRegex.test(email)) return i18n.t("auth.validations.email.invalid");
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return i18n.t("auth.validations.password.required");
  if (password.length < 8) return i18n.t("auth.validations.password.minLength");
  if (!/[A-Z]/.test(password))
    return i18n.t("auth.validations.password.uppercase");
  if (!/[a-z]/.test(password))
    return i18n.t("auth.validations.password.lowercase");
  if (!/[0-9]/.test(password))
    return i18n.t("auth.validations.password.number");
  return null;
};

export const validateFullName = (name: string): string | null => {
  if (!name) return i18n.t("auth.validations.fullName.required");
  return null;
};

export const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^\+?[0-9]{10,14}$/;
  if (!phone) return i18n.t("auth.validations.phone.required");
  if (!phoneRegex.test(phone.replace(/\s/g, "")))
    return i18n.t("auth.validations.phone.invalid");
  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword)
    return i18n.t("auth.validations.confirmPassword.required");
  if (password !== confirmPassword)
    return i18n.t("auth.validations.confirmPassword.mismatch");
  return null;
};

export const validateNonEmpty = (value: string): string | null => {
  if (!value) return i18n.t("auth.validations.generic.required");
  return null;
};

export const validateInput = (
  field: string,
  value: string,
  additionalValue?: string
): string | null => {
  switch (field) {
    case "email":
      return validateEmail(value);
    case "password":
      return validatePassword(value);
    case "fullName":
      return validateFullName(value);
    case "phone":
      return validatePhone(value);
    case "confirmPassword":
      return validateConfirmPassword(additionalValue || "", value);
    default:
      return null;
  }
};
