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
            <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Create new supplier order ✨</h1>
          </div>

          <div class="border-t border-slate-200 dark:border-slate-700">

            <!-- Components -->
            <div class="space-y-8 mt-8">

              <div class="grid gap-5 md:grid-cols-2">
                <div>
                  <label class="block text-sm font-medium mb-1" for="mandatory">Supplier name <span
                      class="text-rose-500">*</span></label>
                  <input class="form-input w-full" type="text" required v-model="entity.supplierName" />
                  <error-text :v="v$.supplierName" />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1" for="mandatory">Delivery date <span
                      class="text-rose-500">*</span></label>
                  <SingleDatePicker @onDateChanged="handleDateChanged" />
                </div>

              </div>
              <div>
                <label class="block text-sm font-medium mb-1" for="mandatory">Supplier order detail <span
                    class="text-rose-500">*</span></label>
                <error-text :v="v$.orderSupplierDetailList" />
                <SOPTable :products="orderSupplierDetailList" class="mt-4" addButtonVisible="true" quantityEditable="true"
                  priceEditable="true" deleteButtonVisible="true" />
              </div>

            </div>

          </div>

          <div class="space-y-8 mt-8" />

          <div class="m-1.5 inline-block">
            <button @click="save" :disabled="v$.$invalid"
              class="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-50">Save</button>
          </div>

          <router-link :to="{ name: 'supplier-orders.list' }">
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
import { ref, computed } from 'vue'
import { mapActions, mapGetters } from '@/mapState'
import { useVuelidate } from '@vuelidate/core'

import Sidebar from '@/partials/Sidebar.vue'
import Header from '@/partials/Header.vue'
import Tooltip from '@/components/Tooltip.vue'
import ErrorText from '@/components/ErrorText.vue'
import SingleDatePicker from '@/components/SingleDatePicker.vue'
import SOPTable from '@/partials/supplier_orders/SOPTable.vue';
// import SearchModal from '@/components/ModalSearch.vue'
import { required, minLength } from '@/helpers/i18n-validators'

export default {
  name: 'FormPage',
  components: {
    Sidebar,
    Header,
    Tooltip,
    SingleDatePicker,
    'error-text': ErrorText,
    SOPTable,
    // SearchModal
  },

  validations() {
    return {
      name: { required }
    }
  },

  mounted() {
    this.v$.$touch();
  },

  setup() {
    const sidebarOpen = ref(false)

    const { supplierOrder, orderSupplierDetailList } = mapGetters()
    const { createSupplierOrder, resetSupplierOrder } = mapActions()

    resetSupplierOrder()

    const handleDateChanged = (selectedDate) => {
      supplierOrder.value.deliveryDate = selectedDate.getTime()
    }

    const save = () => {
      createSupplierOrder(supplierOrder.value)
    }

    const rules = {
      supplierName: { required },
      orderSupplierDetailList: {
        required,
      }
    }

    const v$ = useVuelidate(rules, supplierOrder)

    return {
      sidebarOpen,
      entity: supplierOrder,
      orderSupplierDetailList,
      handleDateChanged,
      save,
      v$
    }
  },
}
</script>