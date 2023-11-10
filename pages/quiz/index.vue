<script setup lang="ts">
import { useUserstore } from '~/stores/user';
import { useQuizStore } from '~/stores/quiz';

const user = useUserstore();
const quizStore = useQuizStore();
onMounted(async () => {
    watch(() => user.loggedIn, async (loggedIn) => {
        if (loggedIn) {
            await quizStore.loadOwnQuizzes();
        }
    });    
});

const createQuiz = async () => {
    const created = await quizStore.createQuiz();
    if (created) {
        // load quizz
        const quizz = await quizStore.loadQuiz(quizStore.current_quiz.id);
        if (quizz) {
            console.log('Loaded quiz');
            useRouter().push('/quiz/' + quizz.id + '/edit');
        } else {
            console.error('Failed to load quiz');
        }
    } else {
        console.error('Failed to create quiz');
    }
};
</script>

<template>
    <main class="p-4">
        <v-btn class="w-full m-2" color="primary" @click="createQuiz()">
            Create Quiz
        </v-btn>
        <h1 class="text-2xl">Your quizzes</h1>
        <div id="quizzesPrev" v-if="quizStore.own_quizzes">
            <v-card v-for="quiz in quizStore.own_quizzes" :key="quiz.id" class="m-2">
                <v-card-title>
                    <div class="flex justify-between w-full">
                        <span>{{ quiz.name }}</span>
                        <v-btn @click="quizStore.removeQuiz(quiz)"><v-icon>mdi-delete</v-icon></v-btn>
                    </div>
                </v-card-title>
                <v-card-text>
                    <span>{{ quiz.description }}</span>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="useRouter().push('/quiz/' + quiz.id + '/edit')">Edit<v-icon>mdi-file-document-edit-outline</v-icon></v-btn>
                    <v-btn color="primary" @click="useRouter().push('/quiz/' + quiz.id + '/')">Make<v-icon>mdi-play-circle-outline</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </main>
</template>