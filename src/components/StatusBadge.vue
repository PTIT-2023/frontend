<template>
    <li class="m-1">
        <button @click="handleClick()"
            class="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">{{
                title }}
            <!-- <span class="ml-1 text-indigo-200">67</span> -->
        </button>
    </li>
</template>
<script>
export default {
    props: ['title', 'value'],
    setup(props, { emit }) {
        const handleClick = () => {
            emit('onClick', props.value)
        }

        return {
            handleClick
        }
    }
}
</script>