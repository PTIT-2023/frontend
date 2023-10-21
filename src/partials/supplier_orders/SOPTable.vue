<template>
  <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
    <header class="px-5 py-4">
      <div class="grid gap-5 md:grid-cols-2">
        <h2 class="font-semibold text-slate-800 dark:text-slate-100">Products <span
            class="text-slate-400 dark:text-slate-500 font-medium">{{ orderSupplierDetailList.length }}</span></h2>

        <button @click.stop="searchModalOpen = true" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
          <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
            <path
              d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span class="ml-2">Add Product</span>
        </button>
      </div>
    </header>
    <div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full dark:text-slate-300">
          <!-- Table header -->
          <thead
            class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                <div class="flex items-center">
                  <label class="inline-flex">
                    <span class="sr-only">Select all</span>
                    <input class="form-checkbox" type="checkbox" v-model="selectAll" @click="checkAll" />
                  </label>
                </div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Image</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Name</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Quantity</div>
              </th>
              <!-- <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Price</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Action</div>
              </th> -->
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
            <SOPTableItem v-for="product in orderSupplierDetailList" :key="product.id" :product="product"
              v-model:selected="selected" :value="product.id" @on-delete="onDeleteItemClick" />
          </tbody>
        </table>

        <SearchModal id="search-modal" searchId="search" :modalOpen="searchModalOpen"
            @open-modal="searchModalOpen = true" @close-modal="searchModalOpen = false" />

      </div>
    </div>
  </div>
  <!-- <ConfirmDelete :title="$t('deleteDialog_title', {name: 'product', quantity: productsToDelete.length})"
    :description="$t('deleteDialog_description', {name: 'product'})" :opened="confirmDeleteOpen"
    @on-cancel="showConfirmDelete(false)" @on-yes="handleDelete" /> -->
</template>

<script>
import { ref, watch } from 'vue'
import { mapActions, mapGetters } from '@/mapState'

import SOPTableItem from './SOPTableItem.vue'
import ConfirmDelete from '@/components/ConfirmDelete.vue'
import SearchModal from '@/components/ModalSearch.vue'

export default {
  components: {
    SOPTableItem,
    ConfirmDelete,
    SearchModal
  },
  props: ['selectedItems'],
  setup(props, { emit }) {
    // Load products
    const { pProducts, orderSupplierDetailList } = mapGetters()
    const { getPProducts, deleteProductById, resetSupplierOrder } = mapActions()

    resetSupplierOrder()

    const searchModalOpen = ref(false)
    
    // Select products
    const selectAll = ref(false)
    const selected = ref([])

    const checkAll = () => {
      selected.value = []
      if (!selectAll.value) {
        const products = pProducts.value.data;
        selected.value = products.map(product => product.id)
      }
    }

    watch(selected, () => {
      const products = pProducts.value.data;
      selectAll.value = products.length === selected.value.length ? true : false
      emit('change-selection', selected.value)
    })

    // Confirm delete dialog
    const productsToDelete = ref([])

    const onDeleteItemClick = (productId) => {
      productsToDelete.value = [productId]
      showConfirmDelete(true)
    }

    const confirmDeleteOpen = ref(false)
    const showConfirmDelete = (opened) => {
      confirmDeleteOpen.value = opened
    }

    const handleDelete = () => {
      showConfirmDelete(false)
      deleteProductById(productsToDelete.value)
    }

    return {
      searchModalOpen,
      pProducts,
      selectAll,
      selected,
      checkAll,
      orderSupplierDetailList,
      confirmDeleteOpen,
      productsToDelete,
      showConfirmDelete,
      onDeleteItemClick,
      handleDelete
    }
  }
}
</script>