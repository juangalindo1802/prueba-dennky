import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App.vue'

afterEach(() => { document.body.innerHTML = '' })

describe('Registration form', () => {
  it('shows required errors on submit and focuses the first invalid field', async () => {
    const wrapper = mount(App, { attachTo: document.body })
    expect(wrapper.findAll('.field__error')).toHaveLength(0)
    await wrapper.get('form').trigger('submit')
    expect(wrapper.findAll('.field__error')).toHaveLength(4)
    expect(document.activeElement?.id).toBe('name')
    expect(wrapper.get('#name').attributes('aria-invalid')).toBe('true')
    expect(wrapper.get('#name').attributes('aria-describedby')).toBe('name-error')
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
    wrapper.unmount()
  })

  it('validates malformed values and rechecks confirmation after password changes', async () => {
    const wrapper = mount(App)
    await wrapper.get('#name').setValue('A')
    await wrapper.get('#email').setValue('alex@')
    await wrapper.get('#password').setValue('short')
    await wrapper.get('#confirmPassword').setValue('different')
    await wrapper.get('form').trigger('submit')
    expect(wrapper.text()).toContain('Use at least 2 characters')
    expect(wrapper.text()).toContain('Enter a valid email address')
    expect(wrapper.text()).toContain('Use at least 8 characters')
    expect(wrapper.text()).toContain('Your passwords do not match')
    await wrapper.get('#password').setValue('long-enough-password')
    await wrapper.get('#confirmPassword').setValue('long-enough-password')
    expect(wrapper.find('#confirmPassword-error').exists()).toBe(false)
    await wrapper.get('#password').setValue('a-different-password')
    expect(wrapper.get('#confirmPassword-error').text()).toBe('Your passwords do not match.')
    wrapper.unmount()
  })

  it('accepts valid details, explains the demo and resets without exposing credentials', async () => {
    const wrapper = mount(App, { attachTo: document.body })
    await wrapper.get('#name').setValue(' Alex Jordan ')
    await wrapper.get('#email').setValue('alex.jordan@example.com')
    await wrapper.get('#password').setValue('my-secret-password')
    await wrapper.get('#confirmPassword').setValue('my-secret-password')
    await wrapper.get('form').trigger('submit')
    expect(wrapper.get('h1').text()).toBe('You’re all set, Alex!')
    expect(wrapper.text()).toContain('no account has been created or data saved')
    expect(wrapper.find('form').exists()).toBe(false)
    expect(document.activeElement?.tagName).toBe('H1')
    await wrapper.get('.success button').trigger('click')
    expect((wrapper.get('#password').element as HTMLInputElement).value).toBe('')
    expect((wrapper.get('#name').element as HTMLInputElement).value).toBe('')
    expect(wrapper.findAll('.field__error')).toHaveLength(0)
    expect(document.activeElement?.id).toBe('name')
    wrapper.unmount()
  })

  it('explains the scope of Google sign-up and Log in', async () => {
    const wrapper = mount(App)
    await wrapper.get('.button--google').trigger('click')
    expect(wrapper.get('[role="status"]').text()).toContain('Google sign-up is not connected')
    await wrapper.get('.login button').trigger('click')
    expect(wrapper.get('[role="status"]').text()).toContain('registration only')
    wrapper.unmount()
  })
})
