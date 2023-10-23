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
            <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Customer detail ✨</h1>
          </div>

          <div class="border-t border-slate-200 dark:border-slate-700">

            <!-- Components -->
            <div class="space-y-8 mt-8">

              <div class="grid gap-5 md:grid-cols-2">
                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">ID</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ entity.id }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Email</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ entity.email }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">First name</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ entity.firstName }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Last name</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ entity.lastName }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Gender</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ entity.gender }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Birthday</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ $filters.toDateString(entity.birthday)
                  }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Address</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ entity.address }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Phone</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ entity.phone }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Created at</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ $filters.toDateString(entity.createAt)
                  }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Updated at</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ $filters.toDateString(entity.updateAt)
                  }}</label>
                </div>

                <!-- <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Status</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ entity.status }}</label>
                </div> -->

              </div>

            </div>

          </div>

          <div class="space-y-8 mt-8" />

          <!-- Back -->
          <router-link :to="{ name: 'customers.list' }">
            <div class="m-1.5 inline-block">
              <button class="btn bg-gray-500 hover:bg-gray-600 text-white">Back</button>
            </div>
          </router-link>

        </div>

      </main>

    </div>

  </div>

  <!-- <ConfirmDelete title="Cancel this supplier order?" description="You cannot undo this action" :opened="confirmCancelOpen"
    :cancelText="'No, go back'" :actionText="'Yes, cancel it'" @on-cancel="showConfirmCancelDialog(false)"
    @on-yes="handleCancelOrder" /> -->
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters } from '@/mapState'
import { useRoute } from "vue-router";

import Sidebar from '@/partials/Sidebar.vue'
import Header from '@/partials/Header.vue'
import Tooltip from '@/components/Tooltip.vue'
import ErrorText from '@/components/ErrorText.vue'
import SingleDatePicker from '@/components/SingleDatePicker.vue'
import SOPTable from '@/partials/supplier_orders/SOPTable.vue';
import ConfirmDelete from '@/components/ConfirmDelete.vue'
import ModalBlank from '@/components/ModalBlank.vue'

export default {
  components: {
    Sidebar,
    Header,
    Tooltip,
    SingleDatePicker,
    'error-text': ErrorText,
    SOPTable,
    ConfirmDelete,
    ModalBlank,
  },

  setup() {
    const sidebarOpen = ref(false)

    const { customer } = mapGetters()
    const { getCustomerById } = mapActions()

    const route = useRoute();
    const id = route.params?.id

    onMounted(() => {
      getCustomerById(id)
    })

    return {
      sidebarOpen,
      entity: customer,
    }
  },
}
</script>