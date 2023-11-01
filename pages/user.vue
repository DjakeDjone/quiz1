<script lang="ts" setup>
import { useUserstore } from '~/stores/user';

const user = useUserstore();
const router = useRouter();
if (process.client) {
    const user = useUserstore();
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
    <main>
        <h1>Your Profile</h1>
        <div>
            <h3 v-if="user.username != ''">Name: {{ user.username }}</h3>
            <h3 v-else>No username registered</h3>
            <h3 v-if="user.email!=''">Email: {{ user.email }}</h3>
            <h3 v-else>No email registered</h3>
        </div>
        <h1>Your Quizzes</h1>
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

<style scoped>
#quizzesPrev {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
} 
.quizOptions {
    display: flex;
    justify-content: space-around;
}
.quizPrev {
    border: 1px solid black;
    background-color: var(--bg-color-secondary);
    padding: 1rem;
    margin: 1rem;
    border-radius: 1rem;
    transition: all .2s ease-in-out;
}
.quizPrev:hover {
    box-shadow: var(--box-shadow);
}
</style>