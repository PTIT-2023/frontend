<template>
  <main class="bg-white dark:bg-slate-900">

    <div class="relative flex">

      <!-- Image -->
      <div class="w-full md:w-1/2">
        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">
          <img class="object-cover object-center w-full h-full"
            src="https://png.pngtree.com/background/20230517/original/pngtree-cartoon-scene-of-a-tropical-aquarium-featuring-fish-picture-image_2640140.jpg"
            width="760" height="1024" alt="Authentication" />
        </div>
      </div>

      <!-- Content -->
      <div class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">
          <div class="flex-1">
            <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <!-- Logo -->
              <router-link class="block" to="/">
                <Logo/>
              </router-link>
            </div>
          </div>

          <div class="max-w-sm mx-auto w-full px-4 py-8">
            <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Welcome back! ✨</h1>
            <!-- Form -->
            <div>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="email">Email Address</label>
                  <input v-model="loginRequest.email" @input="v$.email.$touch()" id="email" class="form-input w-full"
                    type="email" />
                  <error-text :v="v$.email" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="password">Password</label>
                  <input v-model="loginRequest.password" @input="v$.password.$touch()" id="password"
                    class="form-input w-full" type="password" autoComplete="on" />
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
        </div>
      </div>

    </div>

  </main>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { mapGetters, mapActions } from '@/mapState'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@/helpers/i18n-validators'

import ErrorText from '@/components/ErrorText.vue'
import Logo from '@/components/Logo.vue'

export default {
  name: 'Signin',
  components: {
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