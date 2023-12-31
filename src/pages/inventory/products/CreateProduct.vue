<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          <!-- Page header -->
          <div class="mb-8">
            <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Create new product ✨</h1>
          </div>

          <div class="border-t border-slate-200 dark:border-slate-700">

            <!-- Components -->
            <div class="space-y-8 mt-8">

              <div class="grid gap-5 md:grid-cols-2">
                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Name <span
                      class="text-rose-500">*</span></h2>
                  <input class="form-input w-full" type="text" required v-model="product.name" />
                  <error-text :v="v$.name" />
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Description <span
                      class="text-rose-500">*</span></h2>
                  <textarea class="form-input w-full h-40" type="text" v-model="product.description" />
                  <error-text :v="v$.description" />
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Category <span
                      class="text-rose-500">*</span></h2>
                  <select class="form-select" v-model="product.categoryId">
                    <option v-for="(category, index) in categories" :key="category.id" :value="category.id"
                      :selected="index === 0">{{ category.name }}
                    </option>
                  </select>
                </div>

                <div>
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Status <span
                      class="text-rose-500">*</span></h2>
                  <div class="flex items-center mt-5">
                    <div class="form-switch">
                      <input type="checkbox" id="toggle" class="sr-only" v-model="product.status" :true-value="true"
                        :false-value="false" disabled />
                      <label class="bg-slate-400 dark:bg-slate-700" for="toggle">
                        <span class="bg-white shadow-sm" aria-hidden="true"></span>
                        <span class="sr-only">Toggle</span>
                      </label>
                    </div>
                    <div class="text-sm text-slate-400 dark:text-slate-500 italic ml-2">{{ product.status ? 'Active' :
                      'Inactive' }}</div>
                  </div>
                </div>

                <template v-if="isCreatureCategorySelected">
                  <div>
                    <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Habitat</h2>
                    <input class="form-input w-full" type="text" v-model="product.habitat" />
                  </div>

                  <div>
                    <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Position</h2>
                    <input class="form-input w-full" type="text" v-model="product.position" />
                  </div>

                  <div>
                    <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Reproduction method</h2>
                    <input class="form-input w-full" type="text" v-model="product.reproductionMethod" />
                  </div>

                  <div>
                    <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Food type</h2>
                    <input class="form-input w-full" type="text" v-model="product.foodType" />
                  </div>

                  <div>
                    <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Temperature </h2>
                    <input class="form-input w-full" type="number" v-model="product.temperature" />
                    <error-text :v="v$.temperature" />
                  </div>

                  <div>
                    <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">pH </h2>
                    <input class="form-input w-full" type="number" v-model="product.ph" />
                    <error-text :v="v$.ph" />
                  </div>

                  <div>
                    <h2 class="font-semibold text-slate-800 dark:text-slate-100 mb-2">Max size </h2>
                    <input class="form-input w-full" type="number" required v-model="product.maxSize" />
                    <error-text :v="v$.maxSize" />
                  </div>
                </template>

              </div>

            </div>

          </div>

          <div class="space-y-8 mt-8" />

          <div class="m-1.5 inline-block">
            <button @click="save" :disabled="v$.$invalid"
              class="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-50">Save</button>
          </div>

          <router-link :to="{ name: 'products.list' }">
            <div class="m-1.5 inline-block">
              <button class="btn bg-gray-500 hover:bg-gray-600 text-white">Cancel</button>
            </div>
          </router-link>

        </div>

      </main>

    </div>

  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from "vue-router";
import { mapActions, mapGetters } from '@/mapState'
import { useVuelidate } from '@vuelidate/core'

import Sidebar from '@/partials/Sidebar.vue'
import Header from '@/partials/Header.vue'
import Tooltip from '@/components/Tooltip.vue'
import ErrorText from '@/components/ErrorText.vue'
import { required, minValue, maxValue } from '@/helpers/i18n-validators'

export default {
  name: 'FormPage',
  components: {
    Sidebar,
    Header,
    Tooltip,
    'error-text': ErrorText
  },

  mounted() {
    this.v$.$touch();
  },

  computed: {
    isCreatureCategorySelected() {
      return this.creatureCategoryIds.includes(this.product.categoryId)
    }
  },

  setup() {
    const sidebarOpen = ref(false)

    const { product, categories } = mapGetters()
    const { resetProduct, getCategories, createProduct } = mapActions()

    const creatureCategoryIds = ref([])

    const save = () => {
      createProduct(product.value)
    }

    onMounted(() => {
      resetProduct()
      getCategories({ setFirstCategoryForProduct: true }).then(() => {
        creatureCategoryIds.value = categories.value
          .filter(category => category.name === 'ANIMAL' || category.name === 'PLANT')
          .map(category => category.id)
      })
    })

    const rules = {
      name: { required },
      description: { required },
      maxSize: {
        minValue: minValue(1)
      },
      ph: {
        minValue: minValue(0),
        maxValue: maxValue(14)
      },
      temperature: {
        minValue: minValue(20),
        maxValue: maxValue(30)
      }
    }

    const v$ = useVuelidate(rules, product)

    return {
      sidebarOpen,
      creatureCategoryIds,
      categories,
      product,
      save,
      v$
    }
  },
}
</script>