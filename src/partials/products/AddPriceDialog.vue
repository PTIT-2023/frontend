<template>
    <ModalBasic id="feedback-modal" :modalOpen="opened" @close-modal="cancel()" title="Create price detail">
        <!-- Modal content -->
        <div class="px-5 py-4 mb-10">
            <div class="text-sm">
                <div class="font-medium text-slate-800 dark:text-slate-100 mb-3">Let type info of new price detail 🙌</div>
            </div>
            <div class="space-y-3">
                <div>
                    <label class="block text-sm font-medium mb-1" for="name">Apply Date <span
                            class="text-rose-500">*</span></label>
                    <SingleDatePicker :minDate="Date.now() + (1000 * 60 * 60 * 24)" @onDateChanged="handleDateChanged" />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1" for="email">Price <span
                            class="text-rose-500">*</span></label>
                    <input id="email" class="form-input w-full px-2 py-1" v-model="price" type="number" min="0" step="1000"
                        required />
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1" for="feedback">Note <span
                            class="text-rose-500">*</span></label>
                    <textarea v-model="note" id="feedback" class="form-textarea w-full px-2 py-1 h-36" rows="4" required></textarea>
                </div>
            </div>
        </div>
        <!-- Modal footer -->
        <div class="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
            <div class="flex flex-wrap justify-end space-x-2">
                <button
                    class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                    @click.stop="cancel()">Cancel</button>
                <button @click="yes()" class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">OK, let create
                    it!</button>
            </div>
        </div>
    </ModalBasic>
</template>
<script>
import { ref } from 'vue'
import ModalBasic from '@/components/ModalBasic.vue'
import SingleDatePicker from '@/components/SingleDatePicker.vue'
import { mapGetters, mapMutations, mapActions } from '@/mapState'

export default {
    components: {
        ModalBasic,
        SingleDatePicker
    },
    props: {
        opened: {
            type: Boolean,
            default: false
        },
    },
    emits: ['on-cancel'],
    setup(props, { emit }) {
        const applyDate = ref(0)
        const price = ref(0)
        const note = ref('')

        const handleDateChanged = (date) => {
            applyDate.value = date?.getTime()
        }

        const { product } = mapGetters()
        const { setAddPriceDialogOpened } = mapMutations()
        const { createPriceDetail } = mapActions()

        const yes = () => {
            setAddPriceDialogOpened(false)
            createPriceDetail({
                applyDate: applyDate.value,
                price: price.value,
                note: note.value,
                employeeId: 'e13334a4-f3bf-45e7-9aae-98d35d164ee6',
                productId: product.value.id
            })
        }

        const cancel = () => {
            setAddPriceDialogOpened(false)
        }

        return {
            product,
            applyDate,
            price,
            note,
            handleDateChanged,
            yes,
            cancel
        }
    }
}
</script>