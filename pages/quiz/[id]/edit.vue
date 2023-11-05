<script setup lang="ts">
import { useUserstore } from '~/stores/user';
import { useQuizStore } from '~/stores/quiz';

const user = useUserstore();
const quizStore = useQuizStore();
const quizId = useRoute().params.id as string;
const loaded = ref(false);

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
</script>

<template>
    <main v-if="loaded">
        <v-card>
            <v-card-title>
                <h1 class="text-2xl">Quiz: {{ quizStore.current_quiz?.name }}</h1>
                <p class="text-lg break-words" v-text="quizStore.current_quiz?.description">
                </p>
            </v-card-title>
            <v-card-text v-if="quizStore.current_quiz?.questions">
                <v-expansion-panels v-for="question, i in quizStore.current_quiz?.questions" :key="question.id">
                    <v-expansion-panel>
                        <v-expansion-panel-title>
                            <div class="flex justify-between w-full">
                                <span>{{ question.question }}</span>
                                <v-icon>mdi-chevron-down</v-icon>
                                <!-- <v-btn @click="quizStore.removeQuestion(question)">Frage entfernen</v-btn> -->
                            </div>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-card>
                                <v-card-text>
                                    <v-text-field v-model="question.question" label="Frage" outlined></v-text-field>
                                    <div v-if="question.answers">
                                        <v-text-field v-for="answer, j in question.answers" :key="answer.id"
                                            v-model="answer.text" label="Antwort" outlined></v-text-field>
                                        <!-- add answer -->
                                        <v-btn @click="quizStore.addAnswer(question)">Antwort hinzufügen</v-btn>
                                    </div>
                                    <div v-else>
                                        <i>No answers</i>
                                        <v-btn @click="quizStore.addAnswer(question)">Antwort hinzufügen</v-btn>
                                    </div>
                                </v-card-text>
                                <v-card-actions class="flex justify-end">
                                    <v-icon
                                        @click="quizStore.removeQuestion(quizStore.current_quiz!, i)">mdi-delete</v-icon>
                                </v-card-actions>
                            </v-card>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
                <v-btn @click="quizStore.addQuestion(quizStore.current_quiz!)">Frage hinzufügen</v-btn>
            </v-card-text>
            <v-card-item>
                <v-btn @click="quizStore.updateQuiz(quizStore.current_quiz!)" color="primary">Speichern</v-btn>
            </v-card-item>
        </v-card>
    </main>
    <LoadingPage v-else />
</template>