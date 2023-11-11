<template>
  <main class="bg-white dark:bg-slate-900">

    <div class="relative flex">

      <!-- Content -->
      <div class="w-full md:w-1/2">
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
            <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Reset your Password ✨</h1>
            <!-- Form -->
            <div>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="password">Password</label>
                  <input v-model="password" @input="v$.password.$touch()" id="password"
                    class="form-input w-full" type="password" autoComplete="on" />
                  <error-text :v="v$.password" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="password">Confirm password</label>
                  <input v-model="confirmPassword" @input="v$.confirmPassword.$touch()" id="password"
                    class="form-input w-full" type="password" autoComplete="on" />
                  <error-text :v="v$.confirmPassword" />
                </div>
              </div>
              <div class="flex justify-end mt-6">
                <button @click="handleResetPassword()" :disabled="v$.$invalid"
                  class="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap disabled:opacity-50">Reset</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Image -->
      <div class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
        <img class="object-cover object-center w-full h-full" src="../images/auth-image.jpg" width="760" height="1024"
          alt="Authentication" />
        <img class="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block" src="../images/auth-decoration.png"
          width="218" height="224" alt="Authentication decoration" />
      </div>

    </div>

  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from "vue-router";
import { mapActions, mapGetters } from '@/mapState'
import { useVuelidate } from '@vuelidate/core'
import localStorageHelper from '@/helpers/localStorageHelper'
import ErrorText from '@/components/ErrorText.vue'
import { required, sameAs, minLength } from '@/helpers/i18n-validators'
import Logo from '@/components/Logo.vue'

export default {
  name: 'ResetPassword',
  components: {
    'error-text': ErrorText,
    Logo
  },
  setup() {
    const { resetPassword } = mapActions()
    const password = ref('')
    const confirmPassword = ref('')

    const route = useRoute();
    const token = route.params?.token

    const handleResetPassword = () => {
      resetPassword({ token, password: password.value })
    }

    const rules = {
      password: { required, minLen: minLength(8) },
      confirmPassword: { required, sameAsPassword: sameAs(password) }
    }

    const v$ = useVuelidate(rules, { password, confirmPassword })

    return {
      localStorageHelper,
      handleResetPassword,
      password,
      confirmPassword,
      v$
    }
  }
}
</script>