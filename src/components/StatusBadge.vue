<template>
    <li class="m-1">
        <button @click="handleClick()" :class="classList">{{
            title }}
            <!-- <span class="ml-1 text-indigo-200">67</span> -->
        </button>
    </li>
</template>
<script>
import { computed } from 'vue';

export default {
    props: ['title', 'value', 'active'],
    setup(props, { emit }) {
        const handleClick = () => {
            emit('onClick', props.value)
        }

        const classList = computed(() => {
            return props.active === props.value ? 'inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out' : 'inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out'
        })

        return {
            classList,
            handleClick,
        }
    }
}
</script>