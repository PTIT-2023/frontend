<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          <!-- Page header -->
          <div class="mb-8">
            <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Edit employee ✨</h1>
          </div>

          <div class="border-t border-slate-200 dark:border-slate-700">

            <!-- Components -->
            <div class="space-y-8 mt-8">

              <div class="grid gap-5 md:grid-cols-2">

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Email <span
                      class="text-rose-500">*</span></h2>
                  <input class="form-input w-full" type="text" required v-model="employee.email" />
                  <error-text :v="v$.email" />
                </div>

                <div>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">First name <span
                      class="text-rose-500">*</span></h2>
                  <input class="form-input w-full" type="text" required v-model="employee.firstName" />
                  <error-text :v="v$.firstName" />
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Last name <span
                      class="text-rose-500">*</span></h2>
                  <input class="form-input w-full" type="text" required v-model="employee.lastName" />
                  <error-text :v="v$.lastName" />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1" for="mandatory">Birthday <span
                      class="text-rose-500">*</span></label>
                  <SingleDatePicker :minDate="null" maxDate="today" @onDateChanged="handleDateChanged" />
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Gender <span
                      class="text-rose-500">*</span></h2>
                  <select class="form-select" v-model="employee.gender">
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                  </select>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Address <span
                      class="text-rose-500">*</span></h2>
                  <textarea class="form-input w-full h-40" type="text" v-model="employee.address" />
                  <error-text :v="v$.address" />
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Phone <span
                      class="text-rose-500">*</span></h2>
                  <input class="form-input w-full" type="text" required v-model="employee.phone" />
                  <error-text :v="v$.phone" />
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Role</h2>
                  <select class="form-select" v-model="employee.roleId">
                    <option v-for="empRole in comboEmpRoles" :key="empRole.id" :value="empRole.id"
                      :selected="empRole.id === employee.roleId">{{
                        empRole.name }}
                    </option>
                  </select>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Status</h2>
                  <div class="flex items-center mt-5">
                    <div class="form-switch">
                      <input type="checkbox" id="toggle" class="sr-only" v-model="employee.status" :true-value="true"
                        :false-value="false" :disabled="false" />
                      <label class="bg-slate-400 dark:bg-slate-700" for="toggle">
                        <span class="bg-white shadow-sm" aria-hidden="true"></span>
                        <span class="sr-only">Toggle</span>
                      </label>
                    </div>
                    <div class="text-sm text-slate-400 dark:text-slate-500 italic ml-2">{{ employee.status ? 'Active' :
                      'Inactive' }}</div>
                  </div>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Avatar</h2>
                  <input class="form-input w-full" type="text" required v-model="employee.avatar" />
                  <error-text :v="v$.avatar" />
                </div>

                <div>
                  <img class="rounded-full" :src="employee.avatar" width="150" height="150" alt="Avatar" />
                </div>

              </div>

            </div>

          </div>

          <div class="space-y-8 mt-8" />

          <div class="m-1.5 inline-block">
            <button @click="save" :disabled="v$.$invalid"
              class="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-50">Save</button>
          </div>

          <router-link :to="{ name: 'employees.list' }">
            <div class="m-1.5 inline-block">
              <button class="btn bg-gray-500 hover:bg-gray-600 text-white">Cancel</button>
            </div>
          </router-link>

        </div>

      </main>

    </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from "vue-router";
import { mapActions, mapGetters } from '@/mapState'
import { useVuelidate } from '@vuelidate/core'

import Sidebar from '@/partials/Sidebar.vue'
import Header from '@/partials/Header.vue'
import Tooltip from '@/components/Tooltip.vue'
import ErrorText from '@/components/ErrorText.vue'
import SingleDatePicker from '@/components/SingleDatePicker.vue'
import { required, email, minLength, url } from '@/helpers/i18n-validators'

export default {
  components: {
    Sidebar,
    Header,
    Tooltip,
    SingleDatePicker,
    'error-text': ErrorText
  },

  mounted() {
    this.v$.$touch();
  },

  setup() {
    const sidebarOpen = ref(false)

    const { employee, comboEmpRoles, selectedEmpRoleId } = mapGetters()
    const { getEmployeeById, getEmployeeRoles } = mapActions()
    const route = useRoute();
    const empId = route.params?.id

    onMounted(() => {
      getEmployeeRoles().then(() => {
        getEmployeeById(empId)
      })
    })

    employee.value.roleId = selectedEmpRoleId.value

    const save = () => {
      console.log('edit');
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
      sidebarOpen,
      comboEmpRoles,
      employee,
      save,
      v$
    }
  },
}
</script>