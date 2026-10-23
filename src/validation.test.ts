import { describe, expect, it } from 'vitest'
import { validateRegistration } from './validation'

const valid = { name: '李明', email: 'alex+design@example.com', password: 'a-good-password', confirmPassword: 'a-good-password' }

describe('Registration validation edge cases', () => {
  it('accepts international names and email aliases', () => {
    expect(Object.values(validateRegistration(valid)).every(error => error === '')).toBe(true)
  })

  it('rejects whitespace-only names and passwords', () => {
    const errors = validateRegistration({ ...valid, name: '   ', password: '        ', confirmPassword: '        ' })
    expect(errors.name).not.toBe('')
    expect(errors.password).not.toBe('')
  })

  it('ignores surrounding spaces in email but compares passwords exactly', () => {
    const errors = validateRegistration({ ...valid, email: ' alex@example.com ', confirmPassword: 'a-good-password ' })
    expect(errors.email).toBe('')
    expect(errors.confirmPassword).not.toBe('')
  })
})
