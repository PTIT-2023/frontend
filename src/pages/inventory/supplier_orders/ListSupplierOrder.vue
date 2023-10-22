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
              <router-link :to="{ name: 'supplier-orders.create' }">
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
                <StatusBadge v-for="status in supplierOrderStatuses" :title="$t(status)" :value="status" :active="selectedSupplierOrderStatus === status"
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

    const supplierOrderStatuses = ref(['WAITING', 'IMPORTED', 'CANCELLED'])
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
      supplierOrderStatuses,
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