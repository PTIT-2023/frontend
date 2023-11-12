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
            <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Customer order detail ✨</h1>
          </div>

          <div class="border-t border-slate-200 dark:border-slate-700">

            <!-- Components -->
            <div class="space-y-8 mt-8">

              <div class="grid gap-5 md:grid-cols-2">
                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">ID</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ order.id }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Customer name</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ order.customerName }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Delivery email</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ order.deliveryEmail }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Delivery address</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ order.deliveryAddress }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Delivery phone</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ order.deliveryPhone }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Order date</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ $filters.toDateString(order.orderDate)
                  }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Status</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ order.orderStatusName ?
                    $t(order.orderStatusName) : '' }}</label>
                </div>

              </div>
              <div>
                <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Customer order detail</h2>
                <SOPTable class="mt-4" :products="order.detail" />
              </div>

            </div>

          </div>

          <div class="space-y-8 mt-8" />

          <!-- Confirm dialog -->

          <!-- Pickup button -->
          <div v-if="order.orderStatusName === 'Waiting for confirm'" class="m-1.5 inline-block">
            <button @click.stop="setDialogOptions({
              opened: true,
              actionText: 'Yes, it will be pick up!',
              onYes: () => updateOrderStatus('Waiting for pick up')
            })" class="btn bg-lime-500 hover:bg-lime-600 text-white disabled:opacity-50">Accept</button>
          </div>

          <!-- Delivered button -->
          <div v-if="order.orderStatusName === 'Waiting for confirm'" class="m-1.5 inline-block">
            <button @click.stop="setDialogOptions({
              opened: true,
              actionText: 'Yes, cancel it!',
              onYes: () => updateOrderStatus('Cancelled')
            })" class="btn bg-red-500 hover:bg-red-600 text-white disabled:opacity-50">Cancel</button>
          </div>

           <!-- Delivering button -->
           <div v-if="order.orderStatusName === 'Waiting for pick up'" class="m-1.5 inline-block">
            <button @click.stop="setDialogOptions({
              opened: true,
              actionText: 'Yes, it is delivering!',
              onYes: () => updateOrderStatus('Delivering')
            })" class="btn bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50">Delivering</button>
          </div>

          <!-- Delivered button -->
          <div v-if="order.orderStatusName === 'Delivering'" class="m-1.5 inline-block">
            <button @click.stop="setDialogOptions({
              opened: true,
              actionText: 'Yes, it is delivered!',
              onYes: () => updateOrderStatus('Delivered')
            })" class="btn bg-green-500 hover:bg-green-600 text-white disabled:opacity-50">Delivered</button>
          </div>

          <!-- Back -->
          <router-link :to="{ name: 'customer-orders.list' }">
            <div class="m-1.5 inline-block">
              <button class="btn bg-gray-500 hover:bg-gray-600 text-white">Back</button>
            </div>
          </router-link>

        </div>

      </main>

    </div>

  </div>

  <ConfirmDelete title="Cancel this Customer order?" description="You cannot undo this action" :opened="confirmCancelOpen"
    :cancelText="'No, go back'" :actionText="'Yes, cancel it'" @on-cancel="showConfirmCancelDialog(false)"
    @on-yes="handleCancelOrder" />
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapActions, mapGetters, mapMutations } from '@/mapState'
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
  name: 'FormPage',
  components: {
    Sidebar,
    Header,
    Tooltip,
    SOPTable,
    SingleDatePicker,
    'error-text': ErrorText,
    ConfirmDelete,
    ModalBlank,
  },

  setup() {
    const sidebarOpen = ref(false)

    const { customerOrder, orderStatuses } = mapGetters()
    const { setDialogOptions } = mapMutations()
    const { getCustomerOrderById, updateCustomerOrderStatus, getOrderStatuses } = mapActions()

    const route = useRoute();
    const orderId = route.params?.id

    onMounted(() => {
      getCustomerOrderById(orderId)
      getOrderStatuses()
    })

    const confirmDialogOpen = ref(false)
    const showConfirmDialog = (opened) => {
      confirmDialogOpen.value = opened
    }

    const updateOrderStatus = (toStatusName) => {
      setDialogOptions({ opened: false })
      const toStatus = orderStatuses.value.find(s => s.name === toStatusName)
      updateCustomerOrderStatus({ id: orderId, toStatus })
    }

    return {
      sidebarOpen,
      order: customerOrder,
      confirmDialogOpen,
      showConfirmDialog,
      setDialogOptions,
      updateOrderStatus
    }
  },
}
</script>