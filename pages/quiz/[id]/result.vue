<script setup lang="ts">
import { useUserstore } from '~/stores/user';
import { useQuizStore, type Answer, calcPoints } from '~/stores/quiz';
import { useMessagestore } from '~/stores/msg';

const user = useUserstore();
const quizStore = useQuizStore();
const quizId = useRoute().params.id as string;
const loaded = ref(false);
let score = ref(0);

let idx_carousel = ref(0);

onMounted(async () => {
    console.log('quizId', quizId);
    loaded.value = true;
    score.value = calcPoints(quizStore.quiz_doing);
});




</script>

<template>
    <main v-if="loaded" class="max-w-3xl mx-auto">
        <nav class="flex justify-between p-4">
            <h1 class="text-3xl">
                Results: {{ quizStore.current_quiz?.title }}
            </h1>
            <v-btn @click="$router.push('/quiz')" color="primary">
                <!-- X -->
                <v-icon>mdi-home</v-icon>
                <v-tooltip location="bottom" activator="parent">
                    <span>Alle Quizze</span>
                </v-tooltip>
            </v-btn>
        </nav>
        <div>
            <h2 class="text-2xl m-2 ml-4">
                Du hast {{ score }} von {{ quizStore.current_quiz?.questions.length }} Punkten
                erreicht! Das sind {{ (score / quizStore.current_quiz?.questions.length * 100).toFixed(2) }}%.
                <span v-if="score / quizStore.current_quiz?.questions.length * 100 > 90">
                    Sehr gut! 😍
                </span>
                <span v-else-if="score / quizStore.current_quiz?.questions.length * 100 > 80">
                    Gut! 😊
                </span>
                <span v-else-if="score / quizStore.current_quiz?.questions.length * 100 > 60">
                    Okay! 😐
                </span>
                <span v-else>
                    Schlecht! ☹
                </span>
            </h2>
        </div>
        <div v-if="quizStore.current_quiz?.questions">
            <v-card v-for="question, i in quizStore.quiz_doing" :key="i" class="">
                <v-card-title>
                    <div class="flex justify-between w-full">
                        <span>{{ question.question }}</span>
                        <span>

                        </span>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-list>
                        <!-- {{ question.chosen }} -->
                        <div v-for="answer, j in question.answers" :key="j">
                            <!-- {{ answer }} -->
                            <h2>
                                <div v-if="answer.correct && question.chosen.includes(j)">
                                    <v-icon color="green">mdi-check</v-icon>
                                    {{ answer.answer }}
                                </div>
                                <div v-else-if="question.chosen.includes(j) && !answer.correct">
                                    <v-icon color="red">mdi-close</v-icon>
                                    {{ answer.answer }}
                                </div>
                                <div v-else-if="answer.correct">
                                    <u>Wäre richtig gewesen:</u> {{ answer.answer }}
                                </div>
                            </h2>
                        </div>
                    </v-list>
                </v-card-text>
            </v-card>
        </div>
    </main>
    <LoadingPage v-else />
</template>