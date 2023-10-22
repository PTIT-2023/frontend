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
            <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Supplier order detail ✨</h1>
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
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Supplier name</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ entity.supplierName }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Order date</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ $filters.toDateString(entity.orderDate)
                  }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Delivery date</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{
                    $filters.toDateString(entity.deliveryDate) }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Status</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ entity.status }}</label>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Employee name</h2>
                  <label class="block text-sm font-medium mb-1" for="mandatory">{{ entity.employeeName }}</label>
                </div>

              </div>
              <div>
                <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Supplier order detail</h2>
                {{ mOrderSupplierDetailList }}
                <SOPTable class="mt-4" :products="mOrderSupplierDetailList" :quantityEditable="entity.status === 'WAITING'" />
              </div>

            </div>

          </div>

          <div class="space-y-8 mt-8" />

          <div class="m-1.5 inline-block">
            <button @click.stop="showConfirmCancelDialog(true)"
              class="btn bg-rose-500 hover:bg-rose-600 text-white">Cancel</button>
          </div>

          <div class="m-1.5 inline-block">
            <button @click.stop="openConfirmImportDialog(true)"
              class="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-50">Import</button>
          </div>
          <!-- Confirm import dialog -->
          <ModalBlank id="info-modal" :modalOpen="infoModalOpen" @close-modal="infoModalOpen = false">
            <div class="p-5 flex space-x-4">
              <!-- Icon -->
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-indigo-100 dark:bg-indigo-500/30">
                <svg class="w-4 h-4 shrink-0 fill-current text-indigo-500" viewBox="0 0 16 16">
                  <path
                    d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
                </svg>
              </div>
              <!-- Content -->
              <div>
                <!-- Modal header -->
                <div class="mb-2">
                  <div class="text-lg font-semibold text-slate-800 dark:text-slate-100">Create new Event?</div>
                </div>
                <!-- Modal content -->
                <div class="text-sm mb-10">
                  <div class="space-y-2">
                    <p>Semper eget duis at tellus at urna condimentum mattis pellentesque lacus suspendisse faucibus
                      interdum.</p>
                  </div>
                </div>
                <!-- Modal footer -->
                <div class="flex flex-wrap justify-end space-x-2">
                  <button
                    class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                    @click.stop="infoModalOpen = false">Cancel</button>
                  <button @click="handleImport" class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Yes, Create it</button>
                </div>
              </div>
            </div>
          </ModalBlank>

          <!-- Back -->
          <router-link :to="{ name: 'supplier-orders.list' }">
            <div class="m-1.5 inline-block">
              <button class="btn bg-gray-500 hover:bg-gray-600 text-white">Back</button>
            </div>
          </router-link>

        </div>

      </main>

    </div>

  </div>

  <ConfirmDelete title="Cancel this supplier order?" description="You cannot undo this action" :opened="confirmCancelOpen"
    :cancelText="'No, go back'" :actionText="'Yes, cancel it'" @on-cancel="showConfirmCancelDialog(false)"
    @on-yes="handleCancelOrder" />
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
  name: 'FormPage',
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

    const { mSupplierOrder, mOrderSupplierDetailList } = mapGetters()
    const { getSupplierOrderById, cancelSupplierOrderById, createImportForm } = mapActions()

    const route = useRoute();
    const orderId = route.params?.id

    onMounted(() => {
      getSupplierOrderById(orderId)
    })

    // const productsList = computed(() => {
    //   return mOrderSupplierDetailList.value.map(p => {
    //     return {
    //       id: p.productId, image: p.productImage, name: p.name, inventoryQuantity: p.inventoryQuantity,
    //       quantity: p.quantity, unitPrice: p.unitPrice, totalPrice: p.totalPrice
    //     }
    //   })
    // })

    const confirmCancelOpen = ref(false)
    const showConfirmCancelDialog = (opened) => {
      confirmCancelOpen.value = opened
    }
    const handleCancelOrder = () => {
      confirmCancelOpen.value = false
      cancelSupplierOrderById(orderId)
    }

    const infoModalOpen = ref(false)
    const openConfirmImportDialog = (opened) => {
      infoModalOpen.value = opened
    }
    const handleImport = () => {
      createImportForm(mSupplierOrder.value)
    }

    return {
      sidebarOpen,
      entity: mSupplierOrder,
      mOrderSupplierDetailList,
      confirmCancelOpen,
      showConfirmCancelDialog,
      handleCancelOrder,
      infoModalOpen,
      openConfirmImportDialog,
      handleImport,
    }
  },
}
</script>