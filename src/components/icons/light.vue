<template>
    <span :class="[className]">
        <svg
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="90"
            height="90" viewBox="0 0 90 90"
            xml:space="preserve" class="sizeIcon"
        >
            <path
                d="M 62.978 14.11 c -5.34 -5.016 -12.318 -7.521 -19.667 -7.063 c -13.052 0.82 -23.587 11.272 -24.507 24.312 c -0.614 8.694 3.091 17.106 9.909 22.501 c 2.615 2.069 4.114 5.093 4.114 8.294 v 6.772 c 0 1.772 0.904 3.336 2.275 4.257 v 2.971 c 0 3.778 3.074 6.853 6.852 6.853 h 6.092 c 3.778 0 6.853 -3.074 6.853 -6.853 v -2.972 c 1.371 -0.921 2.275 -2.485 2.275 -4.257
                v -6.774 c 0 -3.189 1.47 -6.235 3.931 -8.147 c 6.457 -5.018 10.16 -12.58 10.16 -20.746 C 71.265 26.035 68.244 19.056 62.978 14.11 z M 57.423 49.266 c -3.913 3.041 -6.249 7.858 -6.249 12.886 v 5.901 H 38.826 v -5.899 c 0 -5.046 -2.329 -9.784 -6.391 -12.999 c -5.262 -4.164 -8.121 -10.658 -7.647 -17.374 c 0.709 -10.055 8.833 -18.114 18.898 -18.746 c 5.669 -0.36 11.064 1.579
                15.184 5.449 c 4.123 3.873 6.395 9.12 6.395 14.774 C 65.265 39.559 62.406 45.393 57.423 49.266 z"
                style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255, 255, 255); fill-rule: nonzero; opacity: 1"
                transform=" matrix(1 0 0 1 0 0) "
                stroke-linecap="round"
            />
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
