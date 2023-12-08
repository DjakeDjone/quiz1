<script setup lang="ts">
import { useUserstore } from '~/stores/user';

const path = useRoute().params.id as string;
const file = useUserstore().getFile(path);

const deleteFile = (async() => {
    await useUserstore().deleteFile(path);
    useRouter().push('/file');
});

</script>

<template>
    <main class="h-screen">
        <nav class="flex justify-between items-center bg-gradient-to-tl bg-[#ffffff7a] backdrop-blur-md border-b-2 sticky top-0">
            <div class="p-2 flex items-center cursor-pointer" @click="$router.back()">
                <v-icon>mdi-arrow-left</v-icon>
                <h1 class="text-2xl">back</h1>
            </div>
            <!-- delete -->
            <div class="p-2 flex items-center cursor-pointer" @click="deleteFile()">
                <v-icon>mdi-delete</v-icon>
                <v-tooltip location="left" activator="parent">
                    <span>Delete this file</span>
                </v-tooltip>
            </div>
        </nav>
        <iframe :src="file" class="w-full h-full"></iframe>
    </main>
</template>