<template>
  <div class="flex justify-center">
    <nav class="flex" role="navigation" aria-label="Navigation">
      <div class="mr-2">
        <button @click="previousPage()" :disabled="isFirstPage" :class="isDisabledState(isFirstPage)"
          class="inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <span class="sr-only">Previous</span><wbr />
          <svg class="h-4 w-4 fill-current" viewBox="0 0 16 16">
            <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
          </svg>
        </button>
      </div>
      <ul class="inline-flex text-sm font-medium -space-x-px shadow-sm">
        <li v-for="page in totalPage" :key="page">
          <button
            class="inline-flex items-center justify-center leading-5 px-3.5 py-2 dark:bg-slate-800 hover:bg-indigo-500 dark:hover:bg-indigo-500 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-white"
            :class="setBackgroundColor(page)" @click="click(page)">{{ page }}</button>
        </li>
      </ul>
      <div class="ml-2">
        <button @click="nextPage()" :disabled="isLastPage" :class="isDisabledState(isLastPage)"
          class="inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <span class="sr-only">Next</span><wbr />
          <svg class="h-4 w-4 fill-current" viewBox="0 0 16 16">
            <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
          </svg>
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'PaginationAdvanced',
  props: {
    totalPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      currentPage: 5,
      activeClass: 'hover:bg-indigo-500 dark:hover:bg-indigo-500 text-slate-600 dark:text-slate-300 hover:text-white shadow-sm',
      disabledClass: 'text-slate-300 dark:text-slate-600'
    }
  },
  computed: {
    isFirstPage() {
      return this.currentPage <= 1
    },
    isLastPage() {
      return this.currentPage >= this.totalPage
    }
  },
  methods: {
    click(page) {
      this.currentPage = page
      this.$emit('click', page)
    },
    setBackgroundColor(page) {
      return page === this.currentPage ? 'bg-indigo-500 text-white' : 'bg-white'
    },
    previousPage() {
      if (this.isFirstPage) {
        return;
      }
      --this.currentPage;
    },
    nextPage() {
      if (this.isLastPage) {
        return;
      }
      ++this.currentPage;
    },
    isDisabledState(disabled) {
      return disabled ? this.disabledClass : this.activeClass
    }
  }
}
</script>