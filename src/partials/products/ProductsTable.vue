<template>
  <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
    <header class="px-5 py-4">
      <h2 class="font-semibold text-slate-800 dark:text-slate-100">Products <span
          class="text-slate-400 dark:text-slate-500 font-medium">{{ pProducts.totalResult }}</span></h2>
    </header>
    <div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full dark:text-slate-300">
          <!-- Table header -->
          <thead
            class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
            <tr>
              <!-- <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                <div class="flex items-center">
                  <label class="inline-flex">
                    <span class="sr-only">Select all</span>
                    <input class="form-checkbox" type="checkbox" v-model="selectAll" @click="checkAll" />
                  </label>
                </div>
              </th> -->
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Image</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Name</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Description</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3">
                <div class="font-semibold text-left">Inventory quantity</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3">
                <div class="font-semibold text-left">Sold quantity</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3">
                <div class="font-semibold text-left">Price</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Action</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
            <ProductsTableItem v-for="product in pProducts.data" :key="product.id" :product="product"
              v-model:selected="selected" :value="product.id" @on-delete="onDeleteItemClick" />
          </tbody>
        </table>

      </div>
    </div>
  </div>
  <ConfirmDelete :title="$t('deleteDialog_title', {name: 'product', quantity: productsToDelete.length})"
    :description="$t('deleteDialog_description', {name: 'product'})" :opened="confirmDeleteOpen"
    @on-cancel="showConfirmDelete(false)" @on-yes="handleDelete" />
</template>

<script>
import { ref, watch } from 'vue'
import { mapActions, mapGetters } from '@/mapState'

import ProductsTableItem from './ProductsTableItem.vue'
import ConfirmDelete from '@/components/ConfirmDelete.vue'

export default {
  name: 'ProductsTable',
  components: {
    ProductsTableItem,
    ConfirmDelete,
  },
  props: ['selectedItems'],
  setup(props, { emit }) {
    // Load products
    const { pProducts } = mapGetters()
    const { getPProducts, deleteProductById } = mapActions()
    getPProducts({categoryId: '', page: 1, keyWord: ''})

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
      pProducts,
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