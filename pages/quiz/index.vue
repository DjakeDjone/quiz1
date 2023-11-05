<script setup lang="ts">
import { useUserstore } from '~/stores/user';
import { useQuizStore } from '~/stores/quiz';

const user = useUserstore();
const quizStore = useQuizStore();

const createQuiz = async () => {
    const quiz = await quizStore.createQuiz();
    if (quiz) {
        useRouter().push('/quiz/' + quiz.id + '/edit');
    } else {
        console.log('error creating quiz');
    }
};
</script>

<template>
    <main class="p-4">
        <v-btn class="w-full m-2" color="primary" @click="createQuiz()">
            Create Quiz
        </v-btn>
        <h1 class="text-2xl">Your quizzes</h1>
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