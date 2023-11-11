<template>
  <TemplatePage>
    <div class="max-w-sm mx-auto w-full px-4 py-8">
      <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Welcome back! ✨</h1>
      <!-- Form -->
      <div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1" for="email">Email Address <span
                class="text-rose-500">*</span></label>
            <input v-model="loginRequest.email" @input="v$.email.$touch()" id="email" class="form-input w-full"
              type="email" />
            <error-text :v="v$.email" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1" for="password">Password <span
                class="text-rose-500">*</span></label>
            <input v-model="loginRequest.password" @input="v$.password.$touch()" id="password" class="form-input w-full"
              type="password" autoComplete="on" />
            <error-text :v="v$.password" />
          </div>
        </div>
        <div class="flex items-center justify-between mt-6">
          <div class="mr-1">
            <router-link class="text-sm underline hover:no-underline" to="/reset-password">Forgot
              Password?</router-link>
          </div>
          <button @click="handleLogin()" :disabled="v$.$invalid"
            class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 disabled:opacity-50">Sign In</button>
        </div>
      </div>
    </div>
  </TemplatePage>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { mapGetters, mapActions } from '@/mapState'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@/helpers/i18n-validators'

import TemplatePage from '@/pages/TemplatePage.vue'
import ErrorText from '@/components/ErrorText.vue'
import Logo from '@/components/Logo.vue'

export default {
  name: 'Signin',
  components: {
    TemplatePage,
    'error-text': ErrorText,
    Logo
  },
  setup() {
    const { login } = mapActions()

    const loginRequest = ref({})
    const handleLogin = () => {
      login(loginRequest.value)
    }

    const rules = {
      email: { required, email },
      password: { required },
    }

    const v$ = useVuelidate(rules, loginRequest)

    return {
      loginRequest,
      handleLogin,
      v$
    }
  }
}

</script>