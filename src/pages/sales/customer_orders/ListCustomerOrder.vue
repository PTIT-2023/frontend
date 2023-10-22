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
                <StatusBadge v-for="status in orderStatuses" :title="$t(status.name)" :value="status"
                  :active="status.id === selectedCustomerOrderStatus.id" @on-click="onSelectedOrderStatusChanged" />
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
          <CustomerOrdersTable @change-selection="updateSelectedItems($event)" />

          <!-- Pagination -->
          <div class="mt-8">
            <PaginationAdvanced @change-page="onPageChanged" :total-page="pCustomerOrders.totalPage" />
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
import CustomerOrdersTable from '@/partials/customer_orders/CustomerOrdersTable.vue'
import PaginationAdvanced from '@/components/PaginationAdvanced.vue'
import StatusBadge from '@/components/StatusBadge.vue'

export default {
  components: {
    Sidebar,
    Header,
    SearchForm,
    DeleteButton,
    DateSelect,
    FilterButton,
    CustomerOrdersTable,
    PaginationAdvanced,
    StatusBadge
  },
  setup() {
    const sidebarOpen = ref(false)
    const selectedItems = ref([])

    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
    }

    const { orderStatuses, pCustomerOrders, selectedCustomerOrderStatus } = mapGetters()
    const { setSelectedCustomerOrderStatus } = mapMutations()
    const { getOrderStatuses, getPCustomerOrders } = mapActions()

    const selectedPage = ref(1)
    const searchText = ref('')

    onMounted(() => {
      getOrderStatuses().then(() => {
        getPCustomerOrders({ orderStatusId: selectedCustomerOrderStatus.value.id, page: selectedPage.value, keyWord: searchText.value })
      })
    })

    watch([selectedCustomerOrderStatus, selectedPage, searchText], ([newStatus, newPage, newSearchText]) => {
      getPCustomerOrders({ orderStatusId: newStatus.id, page: newPage, keyWord: newSearchText })
    })

    const onSelectedOrderStatusChanged = (status) => {
      setSelectedCustomerOrderStatus(status)
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
      orderStatuses,
      selectedCustomerOrderStatus,
      pCustomerOrders,
      onSelectedOrderStatusChanged,
      selectedPage,
      onPageChanged,
      onSearchChanged,
    }
  }
}
</script>