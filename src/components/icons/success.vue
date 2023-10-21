<template>
    <span :class="[className]">
        <svg
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="90"
            height="90" viewBox="25 0 256 256"
            xml:space="preserve" class="sizeIcon"
        >
            <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                <path
                    d="M 43.121 62.779 c -0.046 0 -0.093 -0.001 -0.14 -0.002 c -1.375 -0.039 -2.672 -0.642 -3.588 -1.666 L 26.376 46.546 c -1.84 -2.059 -1.663 -5.22 0.396 -7.06 c 2.059 -1.842 5.22 -1.663 7.06 0.396 l 9.492 10.621 l 31.347 -31.346 c 1.951 -1.952 5.119 -1.952 7.07 0 c 1.953 1.953 1.953 5.119 0 7.071 L 46.656 61.314 C 45.717 62.254 44.445 62.779 43.121 62.779 z"
                    style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255, 255, 255); fill-rule: nonzero; opacity: 1"
                    transform=" matrix(1 0 0 1 0 0) "
                    stroke-linecap="round"
                />
            </g>
        </svg>
    </span>
</template>

<script>
export default {
    name: "SuccessIcon",
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
