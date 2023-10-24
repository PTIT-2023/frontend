<template>
  <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
    <header class="px-5 py-4">
      <div class="grid gap-5 md:grid-cols-2">
        <h2 class="font-semibold text-slate-800 dark:text-slate-100">Images <span
            class="text-slate-400 dark:text-slate-500 font-medium">{{ product.imageList?.length }}</span></h2>
        <button @click.stop="setAddImageDialogOpened(true)" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
          <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
            <path
              d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span class="ml-2">Add Image</span>
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
                <div class="font-semibold text-left">URL</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Action</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
            <ImageTableItem v-for="(image, index) in product.imageList" :key="index" :item="{ image, index }"
              v-model:selected="selected" :value="image" @on-delete="" />
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { mapActions, mapGetters, mapMutations } from '@/mapState'

import ImageTableItem from './ImageTableItem.vue'
import ConfirmDelete from '@/components/ConfirmDelete.vue'

export default {
  components: {
    ImageTableItem,
    ConfirmDelete,
  },
  props: ['selectedItems'],
  setup(props, { emit }) {

    const { product } = mapGetters()
    const { setAddImageDialogOpened } = mapMutations()

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
      product,
      selectAll,
      selected,
      checkAll,
      setAddImageDialogOpened
    }
  }
}
</script>