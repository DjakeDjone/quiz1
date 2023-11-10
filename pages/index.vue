<script lang="ts" setup>
import { useUserstore } from '~/stores/user';
import { useQuizStore } from '~/stores/quiz';

const user = useUserstore();
const quizStore = useQuizStore();
onMounted(async () => {
    console.log('quizStore', quizStore);
});

const uploadFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', file.name);
        user.uploadFile(formData);
    };
    input.click();
};

</script>


<template>
    <main>
        <div class="p-4">
            <div class="flex items-center">
                <h2 class="text-2xl">Welcome</h2>
                <gradibtn class="ml-auto w w-fit relative">Points: {{ user.points }}</gradibtn>
            </div>
            <h1 class="ml-8 text-4xl">{{ user.username }}</h1>
        </div>
        <v-card class="m-4" variant="tonal">
            <!-- <v-card-title>
                Actions
            </v-card-title> -->
            <v-card-item class="flex justify-center items-center">
                <v-btn class="w-full m-2 sm:w-fit" color="primary" @click="$router.push('/quiz/')">
                    View Quizzes
                </v-btn>
                <v-btn class="w-full m-2 sm:w-fit" color="secondary" @click="$router.push('/user')">
                    Profile and Groups
                </v-btn>
            </v-card-item>
        </v-card>
        <div class="p-4">
            <h2 class="text-2xl">Your Files</h2>
            <div class="w-full flex justify-left flex-wrap">
                <div v-for="file in user.files">
                    <FilePrev :file="file" :name="file.split('/').pop()!"
                        @click="useRouter().push('/file/' + file.split('/').pop()!.split('.')[0])"
                        class="cursor-pointer mr-4 mb-4" />
                </div>
                <FilePrev file="upload" name="Upload" @click="uploadFile()" class="cursor-pointer mr-4" />
            </div>
        </div>
    </main>
</template>