export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Invalid email format";
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password))
    return "Password must contain an uppercase letter";
  if (!/[a-z]/.test(password))
    return "Password must contain a lowercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain a number";
  return null;
};

export const validateFullName = (name: string): string | null => {
  if (!name) return "Full name is required";
  return null;
};

export const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^\+?[0-9]{10,14}$/;
  if (!phone) return "Phone number is required";
  if (!phoneRegex.test(phone.replace(/\s/g, ""))) return "Invalid phone number";
  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return null;
};

export const validateNonEmpty = (value: string): string | null => {
  if (!value) return "Field is required";
  return null;
};

export const validateInput = (field: string, value: string): string | null => {
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
      return validateConfirmPassword(value, value);
    default:
      return null;
  }
};
