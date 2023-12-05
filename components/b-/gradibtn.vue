<script setup lang="ts">
const props = defineProps({
    bg: {
        type: String,
        default: "rgb(var(--v-theme-background))",
    },
})

</script>


<template>
    <!-- gradient red, green, blue -->
    <div class="bg-gradient-to-br from-red-500 to-blue-500 rounded-lg p-1">
        <div class="rounded-lg p-2" :style="{ background: bg }">
            <slot></slot>
        </div>
    </div>
</template>