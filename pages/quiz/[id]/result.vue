<script setup lang="ts">
import { useUserstore } from '~/stores/user';
import { useQuizStore, type answer } from '~/stores/quiz';
import { useMessagestore } from '~/stores/msg';

const user = useUserstore();
const quizStore = useQuizStore();
const quizId = useRoute().params.id as string;
const loaded = ref(false);

let idx_carousel = ref(0);

onMounted(async () => {
    console.log('quizId', quizId);
    loaded.value = true;
    // const quiz = await quizStore.loadQuiz(quizId);
    // if (!quiz) {
    //     console.log('quiz not found');
    //     return;
    // } else {
    //     console.log('quiz found');
    //     loaded.value = true;
    // }
});

const choseAnswer = (answer: answer) => {
    answer.chosen = !answer.chosen;
    if (quizStore.current_quiz?.questions) {
        const question = quizStore.current_quiz.questions.find(q => q.id === answer.question);
        if (question && question.possible_answers <= 1) {
            question.answers.forEach(a => {
                if (a.id !== answer.id) {
                    a.chosen = false;
                }
            });
        }
    }
}

const next = async () => {
    if (idx_carousel.value < quizStore.current_quiz?.questions.length - 1) {
        idx_carousel.value++;
        console.log('idx', idx_carousel);
    } else {
        // submit
        const points = await quizStore.submitAnswers();
        if (points) {
            useMessagestore().throwSuccess('Du hast ' + points + ' Punkte erreicht');
            useRouter().push('/quiz/' + quizStore.current_quiz?.id + '/result');
        } else {
            useMessagestore().throwError('Es ist ein Fehler aufgetreten');
        }
    }
}

</script>

<template>
    <main v-if="loaded" class="p-4 max-w-3xl mx-auto">
        <nav class="flex justify-between">
            <h1 class="text-3xl">
                Results: {{ quizStore.current_quiz?.name }}
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
            <h2 class="text-2xl">
                Du hast {{ quizStore.current_quiz?.points }} von {{ quizStore.current_quiz?.questions.length }} Punkten
                erreicht
            </h2>
        </div>
        <div v-if="quizStore.current_quiz?.questions">
            <v-card v-for="question in quizStore.current_quiz?.questions" :key="question.id" class="m-2">
                <v-card-title>
                    <div class="flex justify-between w-full">
                        <span>{{ question.question }}</span>
                        <span>
                            {{ question.answers.filter(a => a.correct && a.chosen).length/ question.answers.filter(a => a.correct).length }}/1
                        </span>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-list>
                        <div v-for="answer in question.answers" :key="answer.id" class="ml-2">
                            <div class="flex justify-start items-start" :class="{'text-green': answer.correct, 'text-red': !answer.correct}">
                                <!-- {{ answer }} -->
                                <v-icon v-if="answer.chosen" class="mr-2">mdi-checkbox-marked</v-icon>
                                <v-icon v-else class="mr-2">mdi-checkbox-blank-outline</v-icon>
                                <span class="text-base">{{ answer.text }}</span>
                            </div>
                        </div>
                    </v-list>
                </v-card-text>
            </v-card>
        </div>
    </main>
    <LoadingPage v-else />
</template>