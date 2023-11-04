<template>
  <!-- Modal backdrop -->
  <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0"
    enter-to-class="opacity-100" leave-active-class="transition ease-out duration-100" leave-from-class="opacity-100"
    leave-to-class="opacity-0">
    <div v-show="modalOpen" class="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity" aria-hidden="true">
    </div>
  </transition>
  <!-- Modal dialog -->
  <transition enter-active-class="transition ease-in-out duration-200" enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in-out duration-200"
    leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-4">
    <div v-show="modalOpen" :id="id"
      class="fixed inset-0 z-50 overflow-hidden flex items-start top-16 mb-10 justify-center px-4 sm:px-6" role="dialog"
      aria-modal="true">
      <div ref="modalContent"
        class="bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 overflow-auto w-full max-w-6xl max-h-full rounded shadow-lg">
        <!-- Search form -->
        <div class="w-[71rem] fixed border-b border-slate-200 dark:border-slate-700">
          <div class="relative">
            <label :for="searchId" class="sr-only">Search</label>
            <input :id="searchId" v-model="searchText" @keydown.native.enter="search()"
              class="w-full dark:text-slate-300 bg-white dark:bg-slate-800 border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none py-3 pl-10 pr-4"
              type="search" placeholder="Search by name or description…" ref="searchInput" />
            <button class="absolute inset-0 right-auto group" type="submit" aria-label="Search">
              <svg
                class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-4 mr-2"
                viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                <path
                  d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="py-4 px-2">
          <!-- Recent searches -->
          <div class="mb-3 last:mb-0 mt-8">
            <!-- <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase px-2 mb-2">Recent searches</div> -->
            <table>
              <thead>
                <!-- <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="font-semibold text-left">Image</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="font-semibold text-left">Name</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="font-semibold text-left">Description</div>
                </th> -->
              </thead>
              <tbody>
                <tr class="hover:bg-sky-600 hover:text-white border-b border-slate-200 dark:border-slate-700"
                  @click="handleSelect(product)" v-for="product in products">
                  <td class="px-2 first:pl-5 last:pr-5 py-3 min-w-[5rem] max-w-[40rem]">
                    <img :src="product.imageList[0]" />
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 min-w-[20rem]">
                    <div class="line-clamp-3">{{ product.name }}</div>
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3">
                    <div class="line-clamp-3">{{ product.description }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { mapActions, mapMutations, mapGetters } from '@/mapState'

export default {
  props: ['id', 'searchId', 'modalOpen', 'products'],
  emits: ['open-modal', 'close-modal'],
  watch: {
    modalOpen(newValue) {
      if (!newValue) {
        this.searchText = ''
      }
    }
  },
  setup(props, { emit }) {

    const modalContent = ref(null)
    const searchInput = ref(null)

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!props.modalOpen || modalContent.value.contains(target)) return
      emit('close-modal')
    }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!props.modalOpen || keyCode !== 27) return
      emit('close-modal')
    }

    onMounted(() => {
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })

    watch(() => props.modalOpen, (open) => {
      open && nextTick(() => searchInput.value.focus())
    })

    const handleSelect = (product) => {
      emit('close-modal', product)
    }

    const { getPProducts } = mapActions()

    const searchText = ref('')
    const search = () => {
      getPProducts({ categoryId: '', page: 1, keyWord: searchText.value })
    }

    return {
      modalContent,
      searchInput,
      handleSelect,
      searchText,
      search
    }
  }
}
</script>