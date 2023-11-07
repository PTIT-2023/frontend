<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">My Account</h2>
      <!-- Picture -->
      <section>
        <div class="flex items-center">
          <div class="mr-4">
            <img class="w-20 h-20 rounded-full" :src="localStorageHelper.getUser()?.avatar" width="80" height="80"
              alt="User upload" />
          </div>
          <!-- <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Change</button> -->
        </div>
      </section>
      <!-- Business Profile -->
      <section>
        <div>
          <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Avatar</h2>
          <input class="form-input w-full" type="text" required v-model="user.avatar" />
          <error-text :v="v$.avatar" />
        </div>

        <div>
          <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Email</h2>
          <input disabled class="form-input" type="text" v-model="user.email" />
          <error-text :v="v$.email" />
        </div>

        <div>
          <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">First name</h2>
          <input class="form-input" type="text" required v-model="user.firstName" />
          <error-text :v="v$.firstName" />
        </div>

        <div>
          <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Last name</h2>
          <input class="form-input" type="text" required v-model="user.lastName" />
          <error-text :v="v$.lastName" />
        </div>

        <div>
          <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Birthday</h2>
          <SingleDatePicker :date="toDateString(user.birthday)" :minDate="null" maxDate="today"
            @onDateChanged="handleDateChanged" />
        </div>

        <div>
          <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Gender</h2>
          <select class="form-select" v-model="user.gender">
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>

        <div>
          <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Address</h2>
          <textarea class="form-input w-full h-40" type="text" v-model="user.address" />
          <error-text :v="v$.address" />
        </div>

        <div>
          <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Phone</h2>
          <input class="form-input" type="text" required v-model="user.phone" />
          <error-text :v="v$.phone" />
        </div>

      </section>
      <!-- Password -->
      <section>
        <h3 class="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">Password</h3>
        <div class="mt-5">
          <button
            class="btn border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm text-indigo-500">Set
            New Password</button>
        </div>
      </section>
    </div>
    <!-- Panel footer -->
    <footer>
      <div class="flex flex-col px-6 py-5 border-t border-slate-200 dark:border-slate-700">
        <div class="flex self-end">
          <button
            class="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300">Cancel</button>
          <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Save Changes</button>
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
import { required, email, minLength, url } from '@/helpers/i18n-validators'
import moment from 'moment'

export default {
  name: 'AccountPanel',
  components: {
    SingleDatePicker,
    'error-text': ErrorText
  },
  setup() {

    const sync = ref('Off')

    const { user, employee, comboEmpRoles, selectedEmpRoleId } = mapGetters()
    const { getEmployeeById, getEmployeeRoles, editEmployee } = mapActions()
    // const route = useRoute();
    // const empId = route.params?.id

    const toDateString = (value) => {
      return moment(value).format('DD/MM/yyyy')
    }

    onMounted(() => {
      getEmployeeRoles().then(() => {
        // getEmployeeById(empId)
        getUserProfile(localStorageHelper.getUser()?.id)
      })
    })

    const save = () => {
      editEmployee(employee.value)
    }

    const handleDateChanged = (selectedDate) => {
      employee.value.birthday = selectedDate.getTime()
    }

    const rules = {
      email: { required, email },
      firstName: { required },
      lastName: { required },
      address: { required },
      phone: { required },
      avatar: { url }
    }

    const v$ = useVuelidate(rules, employee)

    return {
      sync,
      localStorageHelper,
      toDateString,
      handleDateChanged,
      moment,
      comboEmpRoles,
      user,
      employee,
      v$
    }
  }
}
</script>