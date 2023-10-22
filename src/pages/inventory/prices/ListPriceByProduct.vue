<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-5">

            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Prices ✨</h1>
            </div>

          </div>

          <!-- Product info -->
          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Product ID</h2>
              <!-- <label class="block text-sm font-medium mb-1" for="mandatory">{{ price.productId }}</label> -->
            </div>
            <div>
              <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Product name</h2>
              <!-- <label class="block text-sm font-medium mb-1" for="mandatory">{{ product.name }}</label> -->
            </div>
          </div>

          <!-- More actions -->
          <div class="sm:flex sm:justify-between sm:items-center mb-5">

            <!-- Left side -->
            <div style="visibility: hidden;" class="mb-4 sm:mb-0">
              <ul class="flex flex-wrap -m-1">
                <li class="m-1">
                  <button
                    class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">All
                    <span class="ml-1 text-indigo-200">67</span></button>
                </li>
                <li class="m-1">
                  <button
                    class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">Paid
                    <span class="ml-1 text-slate-400 dark:text-slate-500">14</span></button>
                </li>
                <li class="m-1">
                  <button
                    class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">Due
                    <span class="ml-1 text-slate-400 dark:text-slate-500">34</span></button>
                </li>
                <li class="m-1">
                  <button
                    class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">Overdue
                    <span class="ml-1 text-slate-400 dark:text-slate-500">19</span></button>
                </li>
              </ul>
            </div>

            <!-- Right side -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <!-- Delete button -->
              <DeleteButton :selectedItems="selectedItems" />
              <!-- Dropdown -->
              <!-- <DateSelect /> -->
              <!-- Filter button -->
              <!-- <FilterButton align="right" /> -->
            </div>

          </div>

          <!-- Table -->
          <PriceTable @change-selection="updateSelectedItems($event)" />

        </div>
      </main>

    </div>

  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { mapGetters, mapActions } from '@/mapState'
import { useRoute } from "vue-router";

import Sidebar from '@/partials/Sidebar.vue'
import Header from '@/partials/Header.vue'
import SearchForm from '@/components/SearchForm.vue'
import DeleteButton from '@/partials/actions/DeleteButton.vue'
import DateSelect from '@/components/DateSelect.vue'
import FilterButton from '@/components/DropdownFilter.vue'
import PriceTable from '@/partials/prices/PriceTable.vue'
import PaginationAdvanced from '@/components/PaginationAdvanced.vue'

export default {
  name: 'Products',
  components: {
    Sidebar,
    Header,
    SearchForm,
    DeleteButton,
    DateSelect,
    FilterButton,
    PriceTable,
    PaginationAdvanced,
  },
  setup() {
    const sidebarOpen = ref(false)
    const selectedItems = ref([])

    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
    }

    const { prices } = mapGetters()
    const { getPricesByProductId } = mapActions()

    const route = useRoute();
    const productId = route.params?.id
    onMounted(() => {
      getPricesByProductId(productId)
    })

    const selectedCategoryId = ref('')
    const selectedPage = ref(1)
    const selectKeyWord = ref('')

    // const onSearchChanged = (keyWord) => {
    //   selectKeyWord.value = keyWord
    // }

    return {
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      selectedCategoryId,
      selectedPage,
      prices
    }
  }
}
</script>