<template>
    <NuxtLayout name="404">
        <main class="p-4 h-screen max-w-lg mx-auto flex justify-center flex-col text-center">
            <h1 class="text-5xl">
                404
            </h1>
            <h2 class="text-xl">
                Sorry, this page could not be found.
            </h2>
            <b-button @click="goBack" class="button">
                Bring me back
            </b-button>
        </main>
    </NuxtLayout>
</template>
<script>
export default {
    methods: {
        goBack() {
            this.$router.push('/')
        }
    }
}
</script>