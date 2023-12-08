<script setup lang="ts">
import { useUserstore } from '~/stores/user';
import { useQuizStore, type Quiz, type Question, type Answer } from '~/stores/quiz';
import { useMessagestore } from '~/stores/msg';

const user = useUserstore();
const quizStore = useQuizStore();
const quizId = useRoute().params.id as string;
const loaded = ref(false);

const quiz_edit = ref(null as Quiz | null);
const pushed = ref(false);
const edit_form = ref(true);
const quiz_edit_json = ref('');

const saveQuizLocalStore = () => {
    if (quiz_edit.value) {
        localStorage.setItem('quiz_edit' + quiz_edit.value.id, JSON.stringify(quiz_edit.value));
    }
}
const loadQuizLocalStore = () => {
    const quiz = localStorage.getItem('quiz_edit' + quizId);
    if (quiz) {
        quiz_edit.value = JSON.parse(quiz);
        quiz_edit_json.value = JSON.stringify(quiz_edit.value, null, 2);
        console.log('Loaded quiz from local storage');
        loaded.value = true;
    }
}

const deleteQuizLocalStore = () => {
    localStorage.removeItem('quiz_edit' + quizId);
}

onMounted(async () => {
    // try to load quiz from local storage
    loadQuizLocalStore();
    if (quiz_edit.value) {
        loaded.value = true;
    } else {
        if (user.loggedIn) {
            let quiz = await quizStore.loadQuiz(quizId);
            if (quiz) {
                console.log('Loaded quiz');
                loaded.value = true;
                quiz_edit.value = quiz;
                quiz_edit_json.value = JSON.stringify(quiz_edit.value, null, 2);
            } else {
                console.error('Failed to load quiz');
            }
        } else {
            watch(() => useUserstore().loggedIn == true, async () => {
                if (user.loggedIn) {
                    let quiz = await quizStore.loadQuiz(quizId);
                    if (quiz) {
                        console.log('Loaded quiz');
                        loaded.value = true;
                        quiz_edit.value = quiz;
                        quiz_edit_json.value = JSON.stringify(quiz_edit.value, null, 2);
                    } else {
                        console.error('Failed to load quiz');
                    }
                }
            });
        }
    }
});

const alert = ref({
    show: false,
    title: '',
    text: '',
    confirm: () => { },
    cancel: () => { }
})

const confirmDeleteQuiz = (quiz: Quiz) => { // TODO
    alert.value = {
        show: true,
        title: 'Quiz löschen',
        text: 'Willst du das Quiz wirklich löschen?',
        confirm: () => {
            alert.value.show = false;
            quizStore.deleteQuiz(quiz);
            deleteQuizLocalStore();
            useRouter().push('/quiz');
        },
        cancel: () => {
            alert.value.show = false;
        }
    }
}

const confirmDeleteQuestion = (question_idx: number) => { // TODO
    alert.value = {
        show: true,
        title: 'Frage löschen',
        text: 'Willst du die Frage wirklich löschen?',
        confirm: () => {
            quiz_edit.value!.questions.splice(question_idx, 1);
            quiz_edit_json.value = JSON.stringify(quiz_edit.value, null, 2);
            alert.value.show = false;
            saveQuizLocalStore();
        },
        cancel: () => {
            alert.value.show = false;
        }
    }
}

const confirmDeleteAnswer = (question: Question, answer_idx: number) => { // TODO
    alert.value = {
        show: true,
        title: 'Antwort löschen',
        text: 'Willst du die Antwort wirklich löschen?',
        confirm: () => {
            quiz_edit.value!.questions[quiz_edit.value!.questions.indexOf(question)].answers.splice(answer_idx, 1);
            alert.value.show = false;
            quiz_edit_json.value = JSON.stringify(quiz_edit.value, null, 2);
            saveQuizLocalStore();
        },
        cancel: () => {
            alert.value.show = false;
        }
    }
}

const resetQuiz = () => {
    // confirm reset
    alert.value = {
        show: true,
        title: 'Quiz zurücksetzen',
        text: 'Willst du das Quiz wirklich zurücksetzen?',
        confirm: () => {
            deleteQuizLocalStore();
            quiz_edit.value = null;
            window.location.reload();
            alert.value.show = false;
        },
        cancel: () => {
            alert.value.show = false;
        }
    }
}


</script>

<template>
    <main v-if="loaded" id="main_editing" class="p-2 sm:p-4 max-w-3xl mx-auto">
        <h1 class="sm:p-4 text-3xl flex justify-between"><span>
                <v-icon size="20">mdi-pencil</v-icon>
                Edit Quiz
            </span>
            <v-btn @click="$router.back()" color="primary">
                <v-icon>mdi-arrow-left</v-icon>
                All Quizzes</v-btn>
        </h1>
        <div class="px-4 flex justify-between">
            <v-switch v-model="edit_form" label="Edit Form" color="primary"></v-switch>
            <v-switch v-model="pushed" label="Pushed" color="primary" disabled></v-switch>
        </div>
        <v-card v-if="quiz_edit && edit_form">
            <v-card-title>
                <div class="flex justify-between mb-4 w-full">
                    <h2 class="text-2xl">Form</h2>
                    <v-icon>
                        mdi-form-select
                    </v-icon>
                </div>
                <div class="flex">
                    <v-text-field label="Title" variant="outlined" v-model="quiz_edit.title"
                        v-on:update:model-value="pushed = false"></v-text-field>
                    <!-- <div class="px-4">
                        <v-switch color="primary" v-model="quizStore.current_quiz.public" label="Public"></v-switch>
                    </div> -->
                </div>
                <v-textarea label="Description" variant="outlined" counter v-model="quizStore.current_quiz.description"
                    v-on:update:model-value="quizStore.current_quiz" clearable clear-icon="mdi-close-circle-outline"
                    rows="1"></v-textarea>
            </v-card-title>
            <v-card-text v-if="quiz_edit.questions.length > 0">
                <v-expansion-panels v-for="question, i in quiz_edit.questions" :key="i">
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
                                    <div class="flex justify-between">
                                        <v-text-field v-model="question.question" label="Frage" variant="outlined"
                                        @input="pushed = false"></v-text-field>
                                        <!-- <span class="block !w-28 ml-2">
                                            <v-select v-model="question.qz_type" :items="['single', 'multiple']" label="Type"
                                            variant="outlined" @input="pushed = false"></v-select>
                                        </span> -->
                                    </div>
                                    <div v-if="question.answers">
                                        <div v-for="answer, j in question.answers" class="flex justify-between">
                                            <v-checkbox v-model="answer.correct" true-icon="mdi-check" false-icon="mdi-close" @input="pushed = false"></v-checkbox>
                                            <v-text-field :key="j" v-model="answer.answer" class="ml-2 w-full"
                                            label="Antwort" variant="outlined" @input="pushed = false" clearable
                                            clear-icon="mdi-close-circle-outline"
                                            @click:clear="confirmDeleteAnswer(question, j)"></v-text-field>
                                        </div>
                                        <!-- add answer -->
                                        <v-btn
                                            @click="question.answers.push({ answer: 'False, because ...', correct: false })">Antwort
                                            hinzufügen</v-btn>
                                    </div>
                                    <div v-else>
                                        <i>No answers</i>
                                        <v-btn
                                            @click="question.answers = [{ answer: 'False, because ...', correct: false }]">Antwort
                                            hinzufügen</v-btn>
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
            <v-btn
                @click="quiz_edit.questions.push({ question: '', qz_type: 'single', answers: [{ answer: 'False, because ...', correct: false }], possible_answers: 1 })">Frage
                hinzufügen</v-btn>
            <v-card-item class="border-t-2">
                <div class="w-full flex flex-col sm:flex-row sm:justify-evenly">
                    <v-btn class="m-1" @click="quizStore.updateQuiz(quiz_edit!); pushed = true" color="primary">
                        <v-icon>mdi-content-save</v-icon>
                        Speichern</v-btn>
                    <v-btn class="m-1" @click="confirmDeleteQuiz(quiz_edit!)" color="error">
                        <v-icon>mdi-delete</v-icon>
                        Löschen</v-btn>
                    <v-btn class="m-1" color="primary" @click="resetQuiz()">
                        <v-icon>mdi-refresh</v-icon>
                        Abbrechen</v-btn>
                    <v-btn class="m-1"
                        @click="saveQuizLocalStore(); $router.push('/quiz/' + quizStore.current_quiz?.id + '/')">Quiz
                        starten</v-btn>
                </div>
            </v-card-item>
        </v-card>
        <v-card v-else-if="quiz_edit">
            <v-card-title>
                <div class="flex justify-between w-full">
                    <span>JSON</span>
                    <v-icon>mdi-code-json</v-icon>
                </div>
            </v-card-title>
            <v-card-text>
                <!-- edit json -->
                <!-- value is stringify -->
                <v-textarea v-model="quiz_edit_json" label="JSON" variant="outlined" rows="20"
                    v-on:update:model-value="quiz_edit = JSON.parse(quiz_edit_json); pushed = false"></v-textarea>
            </v-card-text>
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