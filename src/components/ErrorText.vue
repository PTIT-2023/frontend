<template>
    <div v-for="error of v.$errors" :key="error.$uid" class="mt-2">
        <div class="text-red-500">
            {{ error.$message }}
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'ErrorText',
    props: ['v'],
}
</script>