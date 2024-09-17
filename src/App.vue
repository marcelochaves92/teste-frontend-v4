<template>
    <div class="d-flex align-center justify-center h-100">
        <hello-world />
    </div>
</template>

<script>
import HelloWorld from "@/views/mapView.vue";

export default {
    name: "App",
    components: {
        HelloWorld,
    },
};
</script>

<style>
html {
    font-family: Inter var, ui-sans-serif, system-ui, -apple-system,
        BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans,
        sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol,
        "Noto Color Emoji";
}

body {
    overflow-x: hidden;
}
</style>
