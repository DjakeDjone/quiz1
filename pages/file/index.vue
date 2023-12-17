<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useUserstore, uploadFile } from '~/stores/user';

const files = useUserstore().files;



</script>

<template>
    <nav>
        <v-btn class="w-full m-2 sm:w-fit" color="primary" @click="$router.push('/')">
            <v-icon>mdi-home</v-icon>
            Home
        </v-btn>
    </nav>
    <main class="p-4">
        <h1 class="text-2xl">Alle eigenen Dateien</h1>
        <div class="w-full flex justify-left flex-wrap">
            <div v-for="file in files">
                <FilePrev :file="file" :name="file.split('/').pop()!"
                    @click="useRouter().push('/file/' + file.split('/').pop()!.split('.')[0])"
                    class="cursor-pointer mr-4 mb-4" />
            </div>
            <FilePrev file="upload" name="Upload" @click="uploadFile()" class="cursor-pointer mr-4" />
        </div>
    </main>
</template>