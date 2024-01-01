<script setup lang="ts">
const props = defineProps({
    headline: {
        type: String,
        default: "",
    },
    subheadline: {
        type: String,
        default: "",
    },
    content: {
        type: String,
        default: "",
    },
    bg: {
        type: String,
        default: "rgb(var(--v-theme-background))",
    },
    color: {
        type: String,
        default: "var(--v-theme-primary)",
    },
    width: {
        type: String,
        default: "100%",
    },
})


</script>

<template>
    <div class="card" :style="{ color: color, width: width, background: bg }">
        <div class="card-inner">
            <h1 class="text-2xl card-headline text-center" v-html="headline" />
            <h2 class="text-xl card-subheadline text-center !text-ellipsis" v-html="subheadline" />
            <div class="card-content">
                <span v-if="content" class="text-lg">{{ content }}</span>
                <slot></slot>
            </div>
        </div>
    </div>
</template>


<style scoped>
.card {
    overflow: hidden;
    backdrop-filter: blur(0.5rem);
    border-radius: 0.5rem;
    margin: 0.5rem;
    font-weight: bold;
    color: black;
    box-shadow: 0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
}

.card-inner {
    max-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    width: 100%;
    text-overflow: ellipsis;
    border-radius: 0.5rem;
    height: 100%;
}

.card-content {
    margin-top: 1rem;
    height: 100%;
    display: flex;
    text-overflow: ellipsis;

    flex-direction: column;
    justify-content: start;
    align-items: stretch;
}

/* darkmode */
@media (prefers-color-scheme: dark) {
    .card {
        backdrop-filter: blur(0.5rem);
        border-radius: 0.5rem;
        margin: 0.5rem;
        font-weight: bold;
        color: white;
        box-shadow: 0 0 0.5rem 0.5rem rgba(255, 255, 255, 0.1);
    }
}
</style>