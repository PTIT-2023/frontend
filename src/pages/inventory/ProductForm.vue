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
            <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">{{ showTitle() }} ✨</h1>
          </div>

          <div class="border-t border-slate-200 dark:border-slate-700">

            <!-- Components -->
            <div class="space-y-8 mt-8">

              <div class="grid gap-5 md:grid-cols-2">
                <div>
                  <label class="block text-sm font-medium mb-1" for="mandatory">Name <span
                      class="text-rose-500">*</span></label>
                  <input class="form-input w-full" type="text" required v-model="product.name" />
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
                  <select class="form-select" v-model="product.categoryId" >
                    <option v-for="(category, index) in pCategories.data" :key="category.id" :value="category.id"
                      :selected="index === 0">{{ category.name }}
                    </option>
                  </select>
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
import { mapActions, mapGetters } from '../../mapState'

import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import Tooltip from '../../components/Tooltip.vue'

export default {
  name: 'FormPage',
  components: {
    Sidebar,
    Header,
    Tooltip,
  },

  setup() {
    const sidebarOpen = ref(false)
    const toggle1 = ref('On')
    const toggle2 = ref('Off')
    const toggle3 = ref('Off')

    const { product, pCategories } = mapGetters()
    const { resetProduct, getPCategories, createProduct } = mapActions()
    const route = useRoute();
    const productId = route.params?.id

    const save = () => {
      createProduct(product.value)
    }

    if (productId) {
      getPCategories({setFirstCategoryForProduct: false})
    } else {
      resetProduct()
      getPCategories({setFirstCategoryForProduct: true})
    }
    
    const showTitle = () => {
      return productId == null ? 'Create new product' : 'Edit product'
    }

    return {
      sidebarOpen,
      toggle1,
      toggle2,
      toggle3,
      pCategories,
      product,
      save,
      showTitle
    }
  },
}
</script>