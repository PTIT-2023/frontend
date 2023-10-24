<template>
    <ModalBasic id="feedback-modal" :modalOpen="opened" @close-modal="cancel()" title="Add new image">
        <!-- Modal content -->
        <div class="px-5 py-4 mb-10">
            <div class="space-y-3">
                <div>
                    <label class="block text-sm font-medium mb-1" for="feedback">Image URL</label>
                    <textarea v-model="image" id="feedback" class="form-textarea w-full px-2 py-1 h-20" rows="4"
                        required></textarea>
                    <error-text :v="v$.image" />
                </div>
                <div>
                    <img :src="image" alt="">
                </div>
            </div>
        </div>
        <!-- Modal footer -->
        <div class="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
            <div class="flex flex-wrap justify-end space-x-2">
                <button
                    class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                    @click.stop="cancel()">Cancel</button>
                <button :disabled="v$.$invalid" @click="yes()"
                    class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">OK, let add
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
import { useVuelidate } from '@vuelidate/core'
import { required, url } from '@/helpers/i18n-validators'
import ErrorText from '@/components/ErrorText.vue'

export default {
    components: {
        ModalBasic,
        SingleDatePicker,
        'error-text': ErrorText
    },
    props: {
        opened: {
            type: Boolean,
            default: false
        },
    },
    emits: ['on-cancel'],
    mounted() {
        this.v$.$touch();
    },
    setup(props, { emit }) {
        const image = ref('')

        const handleDateChanged = (date) => {
            applyDate.value = date?.getTime()
        }

        const { product } = mapGetters()
        const { setAddImageDialogOpened, addImageToProductImages } = mapMutations()

        const yes = () => {
            setAddImageDialogOpened(false)
            console.log(image.value);
            addImageToProductImages(image.value)
        }

        const cancel = () => {
            setAddImageDialogOpened(false)
        }

        const rules = {
            image: { required, url },
        }

        const v$ = useVuelidate(rules, { image })

        return {
            image,
            product,
            handleDateChanged,
            yes,
            cancel,
            v$
        }
    }
}
</script>