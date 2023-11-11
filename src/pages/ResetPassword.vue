<template>
  <TemplatePage>
    <div class="max-w-sm mx-auto w-full px-4 py-8">
      <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Reset your Password ✨</h1>
      <!-- Form -->
      <div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1" for="password">Password</label>
            <input v-model="password" @input="v$.password.$touch()" id="password" class="form-input w-full"
              type="password" autoComplete="on" />
            <error-text :v="v$.password" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1" for="password">Confirm password</label>
            <input v-model="confirmPassword" @input="v$.confirmPassword.$touch()" id="password" class="form-input w-full"
              type="password" autoComplete="on" />
            <error-text :v="v$.confirmPassword" />
          </div>
        </div>
        <div class="flex items-center justify-between mt-6">
          <div class="mr-1">
            <router-link class="text-sm underline hover:no-underline" to="/signin">Back to sign in</router-link>
          </div>
          <button @click="handleResetPassword()" :disabled="v$.$invalid"
            class="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap disabled:opacity-50">Reset</button>
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
import { required, sameAs, minLength } from '@/helpers/i18n-validators'
import Logo from '@/components/Logo.vue'
import TemplatePage from '@/pages/TemplatePage.vue'

export default {
  name: 'ResetPassword',
  components: {
    TemplatePage,
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