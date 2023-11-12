<script setup lang="ts">
import { useUserstore } from '~/stores/user';
import { useQuizStore, type answer, type Quiz, type question } from '~/stores/quiz';
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
    // 
    let saving = false;
    document.addEventListener('keydown', async (e) => {
        if (e.ctrlKey && e.key === 's') {
            if (saving) {
                return;
            }
            saving = true;
            e.preventDefault();
            const saved = await quizStore.updateQuiz(quizStore.current_quiz!);
            if (saved) {
                useMessagestore().throwSuccess('Quiz gespeichert');
            } else {
                useMessagestore().throwError('Quiz konnte nicht gespeichert werden');
            }
            setTimeout(() => {
                saving = false;
            }, 1000);
        }
    });
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

const alert = ref({
    show: false,
    title: '',
    text: '',
    confirm: () => { },
    cancel: () => { }
})

const confirmDeleteQuiz = (quiz: Quiz) => {
    alert.value = {
        show: true,
        title: 'Quiz löschen',
        text: 'Willst du das Quiz wirklich löschen?',
        confirm: () => {
            quizStore.removeQuiz(quiz);
            alert.value.show = false;
        },
        cancel: () => {
            alert.value.show = false;
        }
    }
}

const confirmDeleteQuestion = (question_idx: number) => {
    alert.value = {
        show: true,
        title: 'Frage löschen',
        text: 'Willst du die Frage wirklich löschen?',
        confirm: () => {
            quizStore.removeQuestion(quizStore.current_quiz!, question_idx);
            alert.value.show = false;
        },
        cancel: () => {
            alert.value.show = false;
        }
    }
}

const confirmDeleteAnswer = (question: question, answer_idx: number) => {
    alert.value = {
        show: true,
        title: 'Antwort löschen',
        text: 'Willst du die Antwort wirklich löschen?',
        confirm: () => {
            quizStore.removeAnswer(question, answer_idx);
            alert.value.show = false;
        },
        cancel: () => {
            alert.value.show = false;
        }
    }
}

</script>

<template>
    <main v-if="loaded" id="main_editing">
        <h1 class="p-4 text-3xl flex justify-between"><span>
                <v-icon size="20">mdi-pencil</v-icon>
                Edit Quiz
            </span>
            <v-btn @click="$router.back()" color="primary">
                <v-icon>mdi-arrow-left</v-icon>
                All Quizzes</v-btn>
        </h1>
        <v-card>
            <v-card-title v-if="quizStore.current_quiz">
                <v-text-field label="Title" variant="outlined" v-model="quizStore.current_quiz.name"
                    v-on:update:model-value="quizStore.current_quiz.pushed = false"></v-text-field>
                <v-textarea label="Description" variant="outlined" counter v-model="quizStore.current_quiz.description"
                    v-on:update:model-value="quizStore.current_quiz.pushed = false" clearable
                    clear-icon="mdi-close-circle-outline" rows="1"></v-textarea>
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
                                    <v-text-field v-model="question.question" label="Frage" variant="outlined"
                                        @input="question.pushed = false"></v-text-field>
                                    <div v-if="question.answers">
                                        <v-text-field v-for="answer, j in question.answers" :key="answer.id"
                                            v-model="answer.text" label="Antwort" variant="outlined"
                                            @input="answer.pushed = false"
                                            :prepend-icon="answer.correct ? 'mdi-check' : 'mdi-close'"
                                            @click:prepend="setAnswerCorrect(answer)" clearable
                                            clear-icon="mdi-close-circle-outline"
                                            @click:clear="confirmDeleteAnswer(question, j)"></v-text-field>
                                        <!-- add answer -->
                                        <v-btn @click="quizStore.addAnswer(question)">Antwort hinzufügen</v-btn>
                                    </div>
                                    <div v-else>
                                        <i>No answers</i>
                                        <v-btn @click="quizStore.addAnswer(question)">Antwort hinzufügen</v-btn>
                                    </div>
                                </v-card-text>
                                <v-card-actions class="flex justify-end">
                                    <v-icon @click="confirmDeleteQuestion(i)">mdi-delete</v-icon>
                                </v-card-actions>
                            </v-card>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
            <v-btn @click="quizStore.addQuestion(quizStore.current_quiz!)">Frage hinzufügen</v-btn>
            <v-card-item class="border-t-2">
                <div class="w-full flex flex-col sm:flex-row sm:justify-evenly">
                    <v-btn class="m-1" @click="quizStore.updateQuiz(quizStore.current_quiz!)" color="primary">
                        <v-icon>mdi-content-save</v-icon>
                        Speichern</v-btn>
                    <v-btn class="m-1" @click="confirmDeleteQuiz(quizStore.current_quiz!)" color="error">
                        <v-icon>mdi-delete</v-icon>
                        Löschen</v-btn>
                    <v-btn class="m-1" @click="quizStore.loadQuiz(quizStore.current_quiz!.id)" color="primary">
                        <v-icon>mdi-refresh</v-icon>
                        Abbrechen</v-btn>
                    <v-btn class="m-1" @click="$router.push('/quiz/' + quizStore.current_quiz?.id + '/')">Quiz starten</v-btn>
                </div>
            </v-card-item>
        </v-card>
        <!-- dialog -->
        <v-dialog v-model="alert.show" max-width="500px">
            <v-card>
                <v-card-title>{{ alert.title }}</v-card-title>
                <v-card-text>{{ alert.text }}</v-card-text>
                <v-card-actions>
                    <v-btn @click="alert.cancel()" color="error">Abbrechen</v-btn>
                    <v-btn @click="alert.confirm()" color="primary">Bestätigen</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </main>
    <LoadingPage v-else />
</template>