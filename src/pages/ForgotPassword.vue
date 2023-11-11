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
                  <label class="block text-sm font-medium mb-1" for="email">Email Address <span
                      class="text-rose-500">*</span></label>
                  <input @input="v$.emailText.$touch()" v-model="emailText" id="email" class="form-input w-full"
                    type="email" />
                  <error-text :v="v$.emailText" />
                </div>
              </div>
              <div class="flex justify-end mt-6">
                <button @click="sendResetLink()" :disabled="v$.$invalid"
                  class="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap disabled:opacity-50">Send
                  Reset
                  Link</button>
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
import { required, email, minLength, url } from '@/helpers/i18n-validators'
import Logo from '@/components/Logo.vue';

export default {
  name: 'ForgotPassword',
  components: {
    'error-text': ErrorText,
    Logo
},
  setup() {
    const { forgotPassword } = mapActions()
    const emailText = ref('')

    const sendResetLink = () => {
      forgotPassword({ email: emailText.value })
    }

    const rules = {
      emailText: { required, email },
    }

    const v$ = useVuelidate(rules, { emailText })

    return {
      localStorageHelper,
      sendResetLink,
      emailText,
      v$
    }
  }
}
</script>