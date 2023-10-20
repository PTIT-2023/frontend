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
                  <label class="block text-sm font-medium mb-1" for="mandatory">Name <span
                      class="text-rose-500">*</span></label>
                  <input class="form-input w-full" type="text" required v-model="product.name" />
                  <div v-for="error of v$.name.$errors" :key="error.$uid" class="mt-2">
                    <div class="text-red-500">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1" for="mandatory">Description <span
                      class="text-rose-500">*</span></label>
                  <textarea class="form-input w-full h-40" type="text" required v-model="product.description" />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1" for="mandatory">Habitat <span
                      class="text-rose-500">*</span></label>
                  <input class="form-input w-full" type="text" required v-model="product.habitat" />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1" for="mandatory">Position <span
                      class="text-rose-500">*</span></label>
                  <input class="form-input w-full" type="text" required v-model="product.position" />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1" for="mandatory">Reproduction method <span
                      class="text-rose-500">*</span></label>
                  <input class="form-input w-full" type="text" required v-model="product.reproductionMethod" />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1" for="mandatory">Food type <span
                      class="text-rose-500">*</span></label>
                  <input class="form-input w-full" type="text" required v-model="product.foodType" />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1" for="mandatory">Temperature <span
                      class="text-rose-500">*</span></label>
                  <input class="form-input w-full" type="number" required v-model="product.temperature" />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1" for="mandatory">pH <span
                      class="text-rose-500">*</span></label>
                  <input class="form-input w-full" type="number" required v-model="product.ph" />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1" for="mandatory">Max size <span
                      class="text-rose-500">*</span></label>
                  <input class="form-input w-full" type="number" required v-model="product.maxSize" />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1" for="country">Category
                    <span class="text-rose-500">*</span></label>
                  <select class="form-select" v-model="product.categoryId">
                    <option v-for="(category, index) in categories" :key="category.id" :value="category.id"
                      :selected="index === 0">{{ category.name }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1" for="mandatory">Status <span
                      class="text-rose-500">*</span></label>
                  <div class="flex items-center mt-5">
                    <div class="form-switch">
                      <input type="checkbox" id="toggle" class="sr-only" v-model="product.status" :true-value="true"
                        :false-value="false" />
                      <label class="bg-slate-400 dark:bg-slate-700" for="toggle">
                        <span class="bg-white shadow-sm" aria-hidden="true"></span>
                        <span class="sr-only">Toggle</span>
                      </label>
                    </div>
                    <div class="text-sm text-slate-400 dark:text-slate-500 italic ml-2">{{ product.status ? 'Active' :
                      'Inactive' }}</div>
                  </div>
                </div>

              </div>

            </div>

          </div>

          <div class="space-y-8 mt-8" />

          <div class="m-1.5 inline-block">
            <button @click="save" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Save</button>
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
import { ref } from 'vue'
import { useRoute } from "vue-router";
import { mapActions, mapGetters } from '@/mapState'
import { useVuelidate } from '@vuelidate/core'

import Sidebar from '@/partials/Sidebar.vue'
import Header from '@/partials/Header.vue'
import Tooltip from '@/components/Tooltip.vue'
import { required } from '@/helpers/i18n-validators'

export default {
  name: 'FormPage',
  components: {
    Sidebar,
    Header,
    Tooltip,
  },

  validations() {
    return {
      name: { required }
    }
  },

  mounted() {
    this.v$.$touch();
  },

  setup() {
    const sidebarOpen = ref(false)

    const { product, categories } = mapGetters()
    const { resetProduct, getCategories, createProduct, editProduct } = mapActions()
    const route = useRoute();
    const productId = route.params?.id

    const save = () => {
      if (productId) {
        editProduct(product.value)
      } else {
        createProduct(product.value)
      }
    }

    if (productId) {
      getCategories({ setFirstCategoryForProduct: false })
    } else {
      resetProduct()
      getCategories({ setFirstCategoryForProduct: true })
    }

    const rules = {
      name: { required }
    }

    const v$ = useVuelidate(rules, product)

    return {
      sidebarOpen,
      categories,
      product,
      save,
      v$
    }
  },
}
</script>