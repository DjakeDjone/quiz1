<script lang="ts" setup>
import { useUserstore } from '~/stores/user';

const user = useUserstore();
const router = useRouter();
if (process.client) {
    user.loadCookies();
}
if (user.loggedIn) {
    console.log('logged in');
} else {
    // switch to login page
    router.push('/login');
}

</script>

<template>
    <main class="p-4">
        <div class="flex  justify-between">
            <h1 class="text-2xl">Your Profile</h1>
            <v-btn @click="$router.push('/')">
                <v-icon>mdi-home</v-icon>
            </v-btn>
        </div>
        <div class="p-2">
            <h3 v-if="user.username != ''">Username: {{ user.username }}</h3>
            <h3 v-if="user.email != ''">Email: {{ user.email }}</h3>
            <h3>Points: {{ user.points }}</h3>
        </div>
        <h2 class="text-lg">Your Quizzes</h2>
        <div id="quizzesPrev">
            <div v-for="quiz in user.quizzes" :key="quiz.id" class="quizPrev">
                <h3>{{ quiz.name }}</h3>
                <p>{{ quiz.description }}</p>
                <p>{{ quiz.questions.length }} questions</p>
                <div class="quizOptions">
                    <RouterLink :to="'/quiz/' + quiz.id + '/edit'">Edit</RouterLink>
                    <RouterLink :to="'/quiz/' + quiz.id">Play</RouterLink>
                </div>
            </div>
        </div>
    </main>
</template>