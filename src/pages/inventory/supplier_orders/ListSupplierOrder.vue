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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Supplier Orders ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

              <!-- Search form -->
              <SearchForm placeholder="Search by id, supplier name or employee name" @onTextChanged="onSearchChanged" />
              <!-- Create product button -->
              <router-link :to="{ name: 'products.create' }">
                <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path
                      d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span class="hidden xs:block ml-2">Create Supplier Order</span>
                </button>
              </router-link>
            </div>

          </div>

          <!-- More actions -->
          <div class="sm:flex sm:justify-between sm:items-center mb-5">

            <!-- Left side -->
            <div class="mb-4 sm:mb-0">
              <ul class="flex flex-wrap -m-1">
                <!-- <li class="m-1">
                  <button
                    class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">All
                    <span class="ml-1 text-indigo-200">67</span>
                  </button>
                </li>
                <li class="m-1">
                  <button
                    class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">Waiting
                    <span class="ml-1 text-slate-400 dark:text-slate-500">14</span>
                  </button>
                </li>
                <li class="m-1">
                  <button
                    class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">Imported
                    <span class="ml-1 text-slate-400 dark:text-slate-500">34</span>
                  </button>
                </li>
                <li class="m-1">
                  <button
                    class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">Cancelled
                    <span class="ml-1 text-slate-400 dark:text-slate-500">19</span>
                  </button>
                </li> -->
                <StatusBadge title="Waiting" value="WAITING" @on-click="onSelectedOrderStatusChanged" />
                <StatusBadge title="Imported" value="IMPORTED" @on-click="onSelectedOrderStatusChanged" />
                <StatusBadge title="Cancelled" value="CANCELLED" @on-click="onSelectedOrderStatusChanged" />
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
          <SupplierOrdersTable @change-selection="updateSelectedItems($event)" />

          <!-- Pagination -->
          <div class="mt-8">
            <PaginationAdvanced @change-page="onPageChanged" :total-page="pSupplierOrders.totalPage" />
          </div>

        </div>
      </main>

    </div>

  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { mapGetters, mapActions } from '@/mapState'

import Sidebar from '@/partials/Sidebar.vue'
import Header from '@/partials/Header.vue'
import SearchForm from '@/components/SearchForm.vue'
import DeleteButton from '@/partials/actions/DeleteButton.vue'
import DateSelect from '@/components/DateSelect.vue'
import FilterButton from '@/components/DropdownFilter.vue'
import SupplierOrdersTable from '@/partials/supplier_orders/SupplierOrdersTable.vue'
import PaginationAdvanced from '@/components/PaginationAdvanced.vue'
import StatusBadge from '@/components/StatusBadge.vue'

export default {
  name: 'ListSupplierOrder',
  components: {
    Sidebar,
    Header,
    SearchForm,
    DeleteButton,
    DateSelect,
    FilterButton,
    SupplierOrdersTable,
    PaginationAdvanced,
    StatusBadge
  },
  setup() {
    const sidebarOpen = ref(false)
    const selectedItems = ref([])

    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
    }

    const { pSupplierOrders } = mapGetters()
    const { getPSupplierOrders } = mapActions()

    const selectedOrderStatus = ref('WAITING')
    const selectedPage = ref(1)
    const searchText = ref('')

    watch([selectedOrderStatus, selectedPage, searchText], ([newStatus, newPage, newSearchText]) => {
      console.log(newSearchText);
      getPSupplierOrders({status: newStatus, page: newPage, keyWord: newSearchText})
    })

    const onSelectedOrderStatusChanged = (status) => {
      selectedOrderStatus.value = status
    }

    const onPageChanged = (page) => {
      selectedPage.value = page
    }

    const onSearchChanged = (keyWord) => {
      searchText.value = keyWord
    }

    return {
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      pSupplierOrders,
      onSelectedOrderStatusChanged,
      selectedOrderStatus,
      selectedPage,
      onPageChanged,
      onSearchChanged,
    }
  }
}
</script>