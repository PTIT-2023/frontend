<template>
    <span :class="[className]">
        <svg
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="90"
            height="90" viewBox="0 0 90 90"
            xml:space="preserve" class="sizeIcon"
        >
            <path d="M 45 57.469 L 45 57.469 c -1.821 0 -3.319 -1.434 -3.399 -3.252 L 38.465 23.95 c -0.285 -3.802 2.722 -7.044 6.535 -7.044 h 0 c 3.813 0 6.82 3.242 6.535 7.044 l -3.137 30.267 C 48.319 56.036 46.821 57.469 45 57.469 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255, 255, 255); fill-rule: nonzero; opacity: 1" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
            <circle cx="45" cy="67.67" r="5.42" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255, 255, 255); fill-rule: nonzero; opacity: 1" transform="  matrix(1 0 0 1 0 0) " />
        </svg>
    </span>
</template>

<script>
export default {
    name: "AlertIcon",
    props: {
        // i used className keyword as class wasnt allowed to be used as prop name
        className: {
            type: String,
            default: ""
        }
    }
};
</script>
<style scoped>
.sizeIcon {
    height: 100% !important;
    width: 100% !important;
}
</style>
