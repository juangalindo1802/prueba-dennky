<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue'
import FormField from './components/FormField.vue'
import { validateRegistration, type Field, type Registration } from './validation'

const teamPhoto = '/images/nucleus-team.jpg'
const form = reactive<Registration>({ name: '', email: '', password: '', confirmPassword: '' })
const touched = reactive<Record<Field, boolean>>({ name: false, email: false, password: false, confirmPassword: false })
const submitted = ref(false)
const success = ref(false)
const notice = ref('')
const successHeading = ref<HTMLHeadingElement>()
const errors = computed(() => validateRegistration(form))
const fields: { id: Field; label: string; type: 'text' | 'email' | 'password'; autocomplete: string }[] = [
  { id: 'name', label: 'Name', type: 'text', autocomplete: 'name' },
  { id: 'email', label: 'Email', type: 'email', autocomplete: 'email' },
  { id: 'password', label: 'Password', type: 'password', autocomplete: 'new-password' },
  { id: 'confirmPassword', label: 'Confirm password', type: 'password', autocomplete: 'new-password' },
]

function fieldError(field: Field) {
  return submitted.value || touched[field] ? errors.value[field] : ''
}

async function submit() {
  submitted.value = true
  notice.value = ''
  const firstInvalid = fields.find(({ id }) => errors.value[id])
  if (firstInvalid) {
    await nextTick()
    document.getElementById(firstInvalid.id)?.focus()
    return
  }
  success.value = true
  // This challenge has no authentication API. Never persist credentials.
  form.password = ''
  form.confirmPassword = ''
  await nextTick()
  successHeading.value?.focus()
}

async function reset() {
  success.value = false
  submitted.value = false
  fields.forEach(({ id }) => { form[id] = ''; touched[id] = false })
  await nextTick()
  document.getElementById('name')?.focus()
}
</script>

<template>
  <main class="registration" aria-label="Nucleus registration">
    <aside class="story" aria-label="A word from our community">
      <img class="story__photo" :src="teamPhoto" alt="" fetchpriority="high" />
      <a class="brand" href="./" aria-label="Nucleus home">
        <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <ellipse cx="10" cy="9" rx="5" ry="7" transform="rotate(-35 10 9)" />
          <circle cx="24" cy="9" r="6" />
          <circle cx="8" cy="24" r="6" />
          <ellipse cx="22" cy="23" rx="5" ry="7" transform="rotate(-35 22 23)" />
        </svg>
        <span>Nucleus</span>
      </a>
      <figure class="testimonial">
        <blockquote>“Simply all the tools that<br class="quote-break" /> my team and I need.”</blockquote>
        <figcaption>
          <span class="testimonial__name">Karen Yue</span>
          <span class="testimonial__role">Director of Digital Marketing Technology</span>
        </figcaption>
      </figure>
    </aside>

    <section class="signup" aria-labelledby="signup-title">
      <div v-if="!success" class="signup__content">
        <header class="signup__header">
          <h1 id="signup-title">Create your account</h1>
          <p>Join Nucleus UI and start designing with ease.</p>
        </header>

        <form novalidate @submit.prevent="submit">
          <div class="fields">
            <FormField
              v-for="field in fields"
              :id="field.id"
              :key="field.id"
              v-model="form[field.id]"
              :label="field.label"
              :type="field.type"
              :autocomplete="field.autocomplete"
              :error="fieldError(field.id)"
              @blur="touched[field.id] = true"
            />
          </div>
          <p v-if="submitted && Object.values(errors).some(Boolean)" class="sr-only" role="alert">
            Please check the form. {{ Object.values(errors).filter(Boolean).join(' ') }}
          </p>
          <button class="button button--primary" type="submit">Create account</button>
        </form>

        <div class="divider"><span>OR</span></div>

        <button
          class="button button--google"
          type="button"
          @click="notice = 'Google sign-up is not connected in this demo. Please try the registration form.'"
        >
          <svg class="google-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z" />
            <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.58-4.12H3.08v2.59A10 10 0 0 0 12 22Z" />
            <path fill="#FBBC05" d="M6.42 13.92a6 6 0 0 1 0-3.84V7.49H3.08a10 10 0 0 0 0 9.02l3.34-2.59Z" />
            <path fill="#EA4335" d="M12 5.96c1.47 0 2.79.51 3.82 1.51l2.87-2.86A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.92 5.49l3.34 2.59C7.2 7.72 9.4 5.96 12 5.96Z" />
          </svg>
          Sign up with Google
        </button>

        <p class="login">Have an account? <button type="button" @click="notice = 'This demo covers registration only. Log in will be available when an authentication service is connected.'">Log in</button></p>
        <p v-if="notice" class="notice" role="status">{{ notice }}</p>
      </div>

      <div v-else class="signup__content success" aria-labelledby="signup-title">
        <span class="success__icon" aria-hidden="true">✓</span>
        <h1 id="signup-title" ref="successHeading" tabindex="-1">You’re all set, {{ form.name.trim().split(/\s+/)[0] }}!</h1>
        <p>Your details passed validation. This is a demo, so no account has been created or data saved.</p>
        <button class="button button--primary" type="button" @click="reset">Back to registration</button>
      </div>
    </section>
  </main>
</template>
