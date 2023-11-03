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
            <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Add new employee ✨</h1>
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
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Password <span
                      class="text-rose-500">*</span></h2>
                  <input class="form-input w-full" type="password" required v-model="employee.password" />
                  <error-text :v="v$.password" />
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
import { ref } from 'vue'
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
  name: 'FormPage',
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

    const { product, categories } = mapGetters()
    const { createEmployee, resetProduct, getCategories, createProduct, editProduct } = mapActions()
    const route = useRoute();
    const productId = route.params?.id

    const employee = ref({ gender: 'MALE', avatar: 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png' })

    const save = () => {
      createEmployee(employee.value)
    }

    const rules = {
      email: { required, email },
      password: { required, minLen: minLength(8) },
      firstName: { required },
      lastName: { required },
      address: { required },
      phone: { required },
      avatar: { url }
    }

    const v$ = useVuelidate(rules, employee)

    return {
      sidebarOpen,
      categories,
      employee,
      save,
      v$
    }
  },
}
</script>