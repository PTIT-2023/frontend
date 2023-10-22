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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Customer Orders ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <!-- Search form -->
              <SearchForm placeholder="Search by name, email, address..." @onTextChanged="onSearchChanged" />
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
                <StatusBadge title="Waiting" value="WAITING" :active="selectedSupplierOrderStatus"
                  @on-click="onSelectedOrderStatusChanged" />
                <StatusBadge title="Imported" value="IMPORTED" :active="selectedSupplierOrderStatus"
                  @on-click="onSelectedOrderStatusChanged" />
                <StatusBadge title="Cancelled" value="CANCELLED" :active="selectedSupplierOrderStatus"
                  @on-click="onSelectedOrderStatusChanged" />
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
import { ref, watch, onMounted } from 'vue'
import { mapGetters, mapActions, mapMutations } from '@/mapState'

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

    const { selectedSupplierOrderStatus, pSupplierOrders } = mapGetters()
    const { setSelectedSupplierOrderStatus } = mapMutations()
    const { getPSupplierOrders } = mapActions()

    const selectedPage = ref(1)
    const searchText = ref('')

    onMounted(() => {
      getPSupplierOrders({ status: selectedSupplierOrderStatus.value, page: selectedPage.value, keyWord: searchText.value })
    }),

    watch([selectedSupplierOrderStatus, selectedPage, searchText], ([newStatus, newPage, newSearchText]) => {
      getPSupplierOrders({ status: newStatus, page: newPage, keyWord: newSearchText })
    })

    const onSelectedOrderStatusChanged = (status) => {
      setSelectedSupplierOrderStatus(status)
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
      selectedSupplierOrderStatus,
      pSupplierOrders,
      onSelectedOrderStatusChanged,
      selectedPage,
      onPageChanged,
      onSearchChanged,
    }
  }
}
</script>