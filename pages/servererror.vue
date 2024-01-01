<script setup lang="ts">

const reload = () => {
    // useRouter().push('/');
    // window.location.reload();
}

</script>

<template>
    <main class="text-center h-screen w-full flex justify-center items-center flex-col">
        <h1 class="text-3xl">
            Server Error
        </h1>
        <p>
            Sorry, something went wrong. Please try again later, or contact the administrator.
        </p>
        <a href="/">
            <b-button class="button" @click="reload()">
                Reload
            </b-button>
        </a>
    </main>
</template>