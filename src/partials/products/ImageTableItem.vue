<template>
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="flex items-center">
        <label class="inline-flex">
          <span class="sr-only">Select</span>
          <input :id="item.id" class="form-checkbox" type="checkbox" :value="value" @change="check" :checked="checked" />
        </label>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <img :src="item.url" width="100" height="auto"/>
    </td>    
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div>{{item.url}}</div>
    </td> 
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="space-x-1">
        <button @click.stop="setDialogOptions({
              opened: true,
              actionText: 'Yes, delete it!',
              onYes: () => {
                setDialogOptions({opened: false})
                deleteProductImageById({id: item.id, productId: item.productId})
              }
            })" class="text-rose-500 hover:text-rose-600 rounded-full">
          <span class="sr-only">Delete</span>
          <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
              <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
          </svg>
        </button>
      </div>
    </td>
  </tr>  
</template>

<script>
import { computed } from 'vue'
import { mapActions, mapMutations } from '@/mapState'

export default {
  props: ['item', 'value', 'selected'],
  setup(props, context) {
    console.log('x',props.item);

    const checked = computed(() => props.selected.includes(props.value))

    function check() {
      let updatedSelected = [...props.selected]
      if (this.checked) {
        updatedSelected.splice(updatedSelected.indexOf(props.value), 1)
      } else {
        updatedSelected.push(props.value)
      }
      context.emit('update:selected', updatedSelected)
    }

    const totalColor = (status) => {
      switch (status) {
        case 'Paid':
          return 'text-emerald-500'
        case 'Due':
          return 'text-amber-500'
        case 'Overdue':
          return 'text-rose-500'          
        default:
          return 'text-slate-500'
      }
    }    

    const statusColor = (status) => {
      switch (status) {
        case 'Paid':
          return 'bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400'
        case 'Due':
          return 'bg-amber-100 dark:bg-amber-400/30 text-amber-600 dark:text-amber-400'
        case 'Overdue':
          return 'bg-rose-100 dark:bg-rose-500/30 text-rose-500 dark:text-rose-400'          
        default:
          return 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
      }
    }
    
    const typeIcon = (type) => {
      switch (type) {
        case 'Subscription':
          return (
            `<svg class="w-4 h-4 fill-current text-slate-400 dark:text-slate-500 shrink-0 mr-2" viewBox="0 0 16 16">
              <path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" />
            </svg>`            
          )
        default:
          return (
            `<svg class="w-4 h-4 fill-current text-slate-400 dark:text-slate-500 shrink-0 mr-2" viewBox="0 0 16 16">
              <path d="M11.4 0L10 1.4l2 2H8.4c-2.8 0-5 2.2-5 5V12l-2-2L0 11.4l3.7 3.7c.2.2.4.3.7.3.3 0 .5-.1.7-.3l3.7-3.7L7.4 10l-2 2V8.4c0-1.7 1.3-3 3-3H12l-2 2 1.4 1.4 3.7-3.7c.4-.4.4-1 0-1.4L11.4 0z" />
            </svg>`
          )
      }
    }    

    const { setDialogOptions } = mapMutations()
    const { deleteProductImageById } = mapActions()

    return {
      check,
      checked,
      totalColor,
      statusColor,
      typeIcon,
      setDialogOptions,
      deleteProductImageById,
    }
  },
}
</script>