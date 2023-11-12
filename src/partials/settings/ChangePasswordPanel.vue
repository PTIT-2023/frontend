<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">Change Password</h2>
      <!-- Business Profile -->
      <section>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1" for="password">Current password</label>
            <input v-model="currentPassword" @input="v$.currentPassword.$touch()" id="password" class="form-input"
              type="password" autoComplete="on" />
            <error-text :v="v$.currentPassword" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1" for="password">New password</label>
            <input v-model="newPassword" @input="v$.newPassword.$touch()" id="password" class="form-input" type="password"
              autoComplete="on" />
            <error-text :v="v$.newPassword" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1" for="password">Confirm password</label>
            <input v-model="confirmPassword" @input="v$.confirmPassword.$touch()" id="password" class="form-input"
              type="password" autoComplete="on" />
            <error-text :v="v$.confirmPassword" />
          </div>
        </div>
      </section>
    </div>
    <!-- Panel footer -->
    <footer>
      <div class="flex flex-col px-6 py-5 border-t border-slate-200 dark:border-slate-700">
        <div class="flex self-end">
          <!-- <button @click="reset()"
            class="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300">Cancel</button> -->
          <button :disabled="v$.$invalid" @click="save()"
            class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 disabled:opacity-50">Save Changes</button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from "vue-router";
import { mapActions, mapGetters } from '@/mapState'
import { useVuelidate } from '@vuelidate/core'
import localStorageHelper from '@/helpers/localStorageHelper'
import ErrorText from '@/components/ErrorText.vue'
import SingleDatePicker from '@/components/SingleDatePicker.vue'
import { required, minLength, sameAs } from '@/helpers/i18n-validators'
import moment from 'moment'

export default {
  name: 'ChangePasswordPanel',
  components: {
    SingleDatePicker,
    'error-text': ErrorText
  },
  setup() {
    const { user } = mapGetters()
    const { updatePassword } = mapActions()

    const currentPassword = ref('')
    const newPassword = ref('')
    const confirmPassword = ref('')

    const save = () => {
      updatePassword({
        id: localStorageHelper.getUser()?.id,
        oldPassword: currentPassword.value,
        newPassword: newPassword.value,
        newPasswordConfirm: confirmPassword.value
      })
      currentPassword.value = newPassword.value = confirmPassword.value = ''
    }

    const rules = {
      currentPassword: { required, minLen: minLength(8) },
      newPassword: { required, minLen: minLength(8) },
      confirmPassword: { required, sameAsPassword: sameAs(newPassword) }
    }

    const v$ = useVuelidate(rules, { currentPassword, newPassword, confirmPassword })

    // onMounted(() => {
    //   v$.value.$touch()
    // })

    return {
      currentPassword,
      newPassword,
      confirmPassword,
      save,
      v$
    }
  }
}
</script>