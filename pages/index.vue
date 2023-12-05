<script lang="ts" setup>
import { useUserstore, uploadFile } from '~/stores/user';
import { useQuizStore } from '~/stores/quiz';

const user = useUserstore();
const quizStore = useQuizStore();

onMounted(async () => {
    console.log('quizStore', quizStore);
});

const logout = async () => {
    await user.logout();
    useRouter().push('/login');
};

</script>


<template>
    <nav
        class="flex flex-col sm:flex-row flex-wrap items-cente p-4 bg-gradient-to-tl bg-[#ffffff7a] backdrop-blur-md border-b-2">
        <div id="logo"
            class="cursor-pointer m-2 mx-8 min-w-fit w-16 flex items-center scale-150 text-blue-600"
            @click="$router.push('/')">
            <img src="/Logo.svg" class="h-8 md:-ml-2 md:-mr-1" />uiz-App
        </div>
        <div class="sm:ml-auto sm:inline-flex lg:w-fit w-full justify-between">
            <v-btn class="w-full m-2 sm:w-fit" color="primary" @click="$router.push('/quiz/')">
                View own Quizzes
            </v-btn>
            <v-btn class="w-full m-2 sm:w-fit" color="secondary" @click="$router.push('/lobby')">
                Groups and Lobby
            </v-btn>
            <v-btn class="w-full m-2 sm:w-fit" color="primary" @click="$router.push('/summaries')">
                Summaries
            </v-btn>
            <v-btn class="w-full m-2 sm:w-fit" color="secondary" @click="logout()">
                Logout
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </div>
    </nav>
    <main class="p-4 pl-2 sm:m-4 rounded-md" v-if="user" v-cloak>
        <b-gradibtn class="ml-4 inline-block">
        <v-card variant="elevated" width="fit-content">
            <v-card-title class="flex justify-between items-start p-4">
                <h1 class="text-2xl inline-block mb-auto">
                    Welcome {{ user.username }}!
                </h1>
                </v-card-title>
                <v-card-text>
                    <p class="text-lg">You are logged in as {{ user.email }}.</p>
                    <p class="text-lg">You have {{ user.points }} points.</p>
                </v-card-text>
            </v-card>
        </b-gradibtn>
        
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

<style scoped>
#logo {
    font-family: 'Pacifico', cursive;
    transition: all 0.2s ease-in-out;
    /* font-size: 1.5rem; */
}

#logo:hover img {
    animation: spin 1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(359deg);
    }
}
</style>