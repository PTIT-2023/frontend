<template>
  <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
    <header class="px-5 py-4">
      <h2 class="font-semibold text-slate-800 dark:text-slate-100">Customers <span
          class="text-slate-400 dark:text-slate-500 font-medium">{{ pCustomers.totalResult }}</span></h2>
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
                <div class="font-semibold text-left">Avatar</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Name</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Email</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Address</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Order count</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Action</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
            <CustomersTableItem v-for="customer in pCustomers.data" :key="customer.id" :item="customer"
              v-model:selected="selected" :value="customer.id" />
          </tbody>
        </table>

      </div>
    </div>
  </div>
  <!-- <ConfirmDelete :title="$t('deleteDialog_title', {name: 'product', quantity: productsToDelete.length})"
    :description="$t('deleteDialog_description', {name: 'product'})" :opened="confirmDeleteOpen"
    @on-cancel="showConfirmDelete(false)" @on-yes="handleDelete" /> -->
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { mapActions, mapGetters } from '@/mapState'

import CustomersTableItem from './CustomersTableItem.vue'
import ConfirmDelete from '@/components/ConfirmDelete.vue'

export default {
  components: {
    CustomersTableItem,
    ConfirmDelete,
  },
  props: ['selectedItems'],
  setup(props, { emit }) {
    // Load products
    const { pCustomers } = mapGetters()
    const { deleteProductById } = mapActions()
    
    // Select products
    const selectAll = ref(false)
    const selected = ref([])

    const checkAll = () => {
      selected.value = []
      if (!selectAll.value) {
        const products = pCustomers.value.data;
        selected.value = products.map(product => product.id)
      }
    }

    watch(selected, () => {
      const products = pCustomers.value.data;
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
      pCustomers,
      selectAll,
      selected,
      checkAll,
      confirmDeleteOpen,
      productsToDelete,
      showConfirmDelete,
      onDeleteItemClick,
      handleDelete
    }
  }
}
</script>