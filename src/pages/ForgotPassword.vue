<template>
  <TemplatePage>
    <div class="max-w-sm mx-auto w-full px-4 py-8">
      <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Reset your Password ✨</h1>
      <!-- Form -->
      <div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1" for="email">Email Address <span
                class="text-rose-500">*</span></label>
            <input @input="v$.emailText.$touch()" v-model="emailText" id="email" class="form-input w-full" type="email" />
            <error-text :v="v$.emailText" />
          </div>
        </div>
        <div class="flex items-center justify-between mt-6">
          <div class="mr-1">
            <router-link class="text-sm underline hover:no-underline" to="/signin">Back to sign in</router-link>
          </div>
          <button @click="sendResetLink()" :disabled="v$.$invalid"
            class="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap disabled:opacity-50">Send
            Reset
            Link</button>
        </div>
      </div>
    </div>
  </TemplatePage>
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
import TemplatePage from '@/pages/TemplatePage.vue';

export default {
  name: 'ForgotPassword',
  components: {
    TemplatePage,
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