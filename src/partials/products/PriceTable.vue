<template>
  <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
    <header class="px-5 py-4">
      <div class="grid gap-5 md:grid-cols-2">
        <h2 class="font-semibold text-slate-800 dark:text-slate-100">Prices <span
            class="text-slate-400 dark:text-slate-500 font-medium">{{ prices.length }}</span></h2>
        <button @click.stop="setAddPriceDialogOpened(true)" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
          <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
            <path
              d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span class="ml-2">Add Price Detail</span>
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
                <div class="font-semibold text-left">Apply date</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Value</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Employee name</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Note</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Create at</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Action</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
            <PriceTableItem v-for="price in prices" :key="price.id" :price="price" v-model:selected="selected"
              :value="price.id" @on-delete="" />
          </tbody>
        </table>

      </div>
    </div>
  </div>
  <!-- <ConfirmDelete :title="$t('deleteDialog_title', { name: 'product', quantity: productsToDelete.length })"
    :description="$t('deleteDialog_description', { name: 'product' })" :opened="confirmDeleteOpen"
    @on-cancel="showConfirmDelete(false)" @on-yes="handleDelete" /> -->
</template>

<script>
import { ref, watch } from 'vue'
import { mapActions, mapGetters, mapMutations } from '@/mapState'

import PriceTableItem from './PriceTableItem.vue'
import ConfirmDelete from '@/components/ConfirmDelete.vue'

export default {
  name: 'ProductsTable',
  components: {
    PriceTableItem,
    ConfirmDelete,
  },
  props: ['selectedItems'],
  setup(props, { emit }) {

    const { prices } = mapGetters()
    const { setAddPriceDialogOpened } = mapMutations()

    // Select products
    const selectAll = ref(false)
    const selected = ref([])

    const checkAll = () => {
      selected.value = []
      if (!selectAll.value) {
        const products = prices.value.data;
        selected.value = products.map(product => product.id)
      }
    }

    watch(selected, () => {
      const products = prices.value.data;
      selectAll.value = products.length === selected.value.length ? true : false
      emit('change-selection', selected.value)
    })

    return {
      prices,
      selectAll,
      selected,
      checkAll,
      setAddPriceDialogOpened
    }
  }
}
</script>