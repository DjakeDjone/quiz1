<script setup lang="ts">
import { useUserstore } from '~/stores/user';
import { useQuizStore, type answer } from '~/stores/quiz';
import { useMessagestore } from '~/stores/msg';

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

const setAnswerCorrect = (answer: answer) => {
    answer.correct = !answer.correct;
    answer.pushed = false;
    // check if there is at least one correct answer
    if (quizStore.current_quiz?.questions) {
        const question = quizStore.current_quiz.questions.find(q => q.id === answer.question);
        if (question) {
            const correctAnswers = question.answers.filter(a => a.correct);
            if (correctAnswers.length === 0) {
                answer.correct = true;
                useMessagestore().throwError('Es muss mindestens eine richtige Antwort geben');
            }
        }
    }
}
</script>

<template>
    <main v-if="loaded">
        <h1 class="p-4 text-3xl">Edit Quiz</h1>
        <v-card>
            <v-card-title v-if="quizStore.current_quiz">
                <v-text-field label="Title" variant="outlined" v-model="quizStore.current_quiz.name" v-on:update:model-value="quizStore.current_quiz.pushed = false"></v-text-field>
                <v-textarea label="Description" variant="outlined" counter v-model="quizStore.current_quiz.description" v-on:update:model-value="quizStore.current_quiz.pushed = false" clearable clear-icon="mdi-close-circle-outline" rows="1"></v-textarea>
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
                                    <v-text-field v-model="question.question" label="Frage" variant="outlined" @input="question.pushed = false"></v-text-field>
                                    <div v-if="question.answers">
                                        <v-text-field v-for="answer, j in question.answers" :key="answer.id"
                                            v-model="answer.text" label="Antwort" variant="outlined" @input="answer.pushed = false" :prepend-icon="answer.correct ? 'mdi-check' : 'mdi-close'" @click:prepend="setAnswerCorrect(answer)"></v-text-field>
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
            </v-card-text>
            <v-btn @click="quizStore.addQuestion(quizStore.current_quiz!)">Frage hinzufügen</v-btn>
            <v-card-item class="border-t-2 flex items-center !justify-between">
                <v-btn @click="quizStore.updateQuiz(quizStore.current_quiz!)" color="primary">Speichern</v-btn>
                <v-btn @click="quizStore.removeQuiz(quizStore.current_quiz!)" color="error">Löschen</v-btn>
                <v-btn @click="$router.back()">Zurück</v-btn>
            </v-card-item>
        </v-card>
    </main>
    <LoadingPage v-else />
</template>