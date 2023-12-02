<script setup lang="ts">
import { useUserstore } from '~/stores/user';
import { useQuizStore, type Answer, type Question } from '~/stores/quiz';
import { useMessagestore } from '~/stores/msg';

const user = useUserstore();
const quizStore = useQuizStore();
const quizId = useRoute().params.id as string;
const loaded = ref(false);

let idx_carousel = ref(0);

onMounted(async () => {
    console.log('quizId', quizId);
    const quiz = await quizStore.loadQuiz(quizId);
    if (!quiz) {
        console.log('quiz not found');
        return;
    } else {
        console.log('quiz found');
        loaded.value = true;
    }
});

const choseAnswer = (answer: Answer) => {
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
                {{ quizStore.current_quiz?.title }}
            </h1>
            <v-btn @click="$router.back()" color="primary">
                <!-- X -->
                <v-icon>mdi-close</v-icon>
                <v-tooltip location="bottom" activator="parent">
                    <span>Abbrechen</span>
                </v-tooltip>
            </v-btn>
        </nav>
        <v-carousel hide-delimiters v-model="idx_carousel" progress="primary" height="100%" :show-arrows="false">
            <v-carousel-item v-for="question, i in quizStore.current_quiz?.questions" :key="question.id" :value="i">
                <v-card>
                    <v-card-title>
                        <h2 class="text-2xl">{{ question.question }}</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item v-for="answer, j in question.answers" :key="answer.id">
                                <h3 class="text-xl flex">
                                    <v-checkbox v-model="answer.chosen" @click="choseAnswer(answer)" true-icon="mdi-check"
                                        false-icon="mdi-close">
                                        <template v-slot:label>
                                            <span>{{ answer.text }}</span>
                                        </template>
                                    </v-checkbox>
                                </h3>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                    <div class="flex justify-between mb-16 w-full">
                        <v-btn @click="idx_carousel = i - 1" color="primary" class="w-1/2" :disabled="i === 0">
                            <v-icon>mdi-chevron-left</v-icon>
                            <v-tooltip location="bottom" activator="parent">
                                <span>Zurück</span>
                            </v-tooltip>
                        </v-btn>
                        <v-btn @click="next()" class="w-1/2" v-if="i < quizStore.current_quiz?.questions.length - 1"
                            color="primary">
                            <v-icon>mdi-chevron-right</v-icon>
                            <v-tooltip location="bottom" activator="parent">
                                <span>Weiter</span>
                            </v-tooltip>
                        </v-btn>
                        <v-btn class="w-1/2" @click="next()" v-if="i === quizStore.current_quiz?.questions.length - 1"
                            color="primary">
                            <v-icon>mdi-check</v-icon>
                            <v-tooltip location="bottom" activator="parent">
                                <span>Fertig</span>
                            </v-tooltip>
                        </v-btn>
                    </div>
                </v-card>
            </v-carousel-item>
        </v-carousel>
    </main>
    <LoadingPage v-else />
</template>