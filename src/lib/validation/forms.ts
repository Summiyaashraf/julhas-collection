export interface FieldValidation {
  valid: boolean;
  error?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+\d\s().-]+$/;
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}\s'.-]*$/u;

function invalid(error: string): FieldValidation {
  return { valid: false, error };
}

function valid(): FieldValidation {
  return { valid: true };
}

export function validateEmail(value: string): FieldValidation {
  const email = value.trim();

  if (!email) {
    return invalid("Enter your email address.");
  }

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return invalid("Enter a valid email address.");
  }

  return valid();
}

export function validatePhone(value: string): FieldValidation {
  const phone = value.trim();
  const digits = phone.replace(/\D/g, "");

  if (!phone) {
    return invalid("Enter your phone number.");
  }

  if (
    !PHONE_PATTERN.test(phone) ||
    digits.length < 10 ||
    digits.length > 15
  ) {
    return invalid("Enter a valid phone number.");
  }

  return valid();
}

export function validateName(value: string): FieldValidation {
  const name = value.trim().replace(/\s+/g, " ");

  if (!name) {
    return invalid("Enter your name.");
  }

  if (name.length < 2 || name.length > 80) {
    return invalid("Enter a name between 2 and 80 characters.");
  }

  if (!NAME_PATTERN.test(name)) {
    return invalid("Enter a valid name.");
  }

  return valid();
}

export function validatePassword(value: string): FieldValidation {
  if (!value) {
    return invalid("Enter your password.");
  }

  if (value.length < 8) {
    return invalid("Use at least 8 characters.");
  }

  if (value.length > 128) {
    return invalid("Keep your password under 128 characters.");
  }

  return valid();
}

export function validateOrderNumber(value: string): FieldValidation {
  const order = value.trim().replace(/^#/, "");

  if (!order) {
    return invalid("Enter your order number.");
  }

  if (!/^[A-Za-z0-9][A-Za-z0-9-]{3,23}$/.test(order)) {
    return invalid(
      "Use 4–24 letters, numbers, or hyphens (for example JC-10245).",
    );
  }

  return valid();
}
