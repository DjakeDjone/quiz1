<script setup lang="ts">
import { useUserstore } from '~/stores/user';

const path = useRoute().params.id as string;
const file = useUserstore().getFile(path);


</script>

<template>
    <main class="h-screen">
        <nav>
            <div class="p-2 flex items-center cursor-pointer" @click="$router.back()">
                <v-icon>mdi-arrow-left</v-icon>
                <h1 class="text-2xl">back</h1>
            </div>
        </nav>
        <iframe :src="file" class="w-full h-full"></iframe>
    </main>
</template>