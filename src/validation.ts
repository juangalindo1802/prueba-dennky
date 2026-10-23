export interface Registration {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type Field = keyof Registration
export type FormErrors = Record<Field, string>

export function validateRegistration(values: Registration): FormErrors {
  return {
    name: !values.name.trim()
      ? 'Please enter your name.'
      : values.name.trim().length < 2 ? 'Use at least 2 characters for your name.' : '',
    email: !values.email.trim()
      ? 'Please enter your email address.'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
        ? 'Enter a valid email address, like alex@example.com.' : '',
    password: !values.password
      ? 'Please enter a password.'
      : values.password.trim().length < 8 ? 'Use at least 8 characters, excluding surrounding spaces.' : '',
    confirmPassword: !values.confirmPassword
      ? 'Please confirm your password.'
      : values.confirmPassword !== values.password ? 'Your passwords do not match.' : '',
  }
}
