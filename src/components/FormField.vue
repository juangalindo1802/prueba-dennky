<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  id: string
  label: string
  modelValue: string
  type?: 'text' | 'email' | 'password'
  autocomplete: string
  error?: string
}>(), { type: 'text', error: '' })

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: []
}>()
const hasValue = computed(() => props.modelValue.length > 0)
</script>

<template>
  <div class="field" :class="{ 'field--error': error }">
    <div class="field__control" :class="{ 'field__control--filled': hasValue }">
      <input
        :id="id"
        :name="id"
        :type="type"
        :value="modelValue"
        :autocomplete="autocomplete"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="error ? `${id}-error` : undefined"
        :maxlength="type === 'password' ? 128 : 254"
        required
        placeholder=" "
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="emit('blur')"
      />
      <label :for="id">{{ label }}</label>
    </div>
    <p v-if="error" :id="`${id}-error`" class="field__error">{{ error }}</p>
  </div>
</template>
