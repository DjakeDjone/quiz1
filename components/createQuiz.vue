<script lang="ts">
import { useUserstore } from '~/stores/user';
import { useQuizStore } from '~/stores/quiz';

export default defineComponent({
    name: "CreateQuiz",
    setup() {
        const user = useUserstore();
        const quiz = useQuizStore();
        return {
            user,
            quiz,
        }
    },
    mounted() {
    },
    methods: {
        createQuiz() {
            this.quiz.createQuiz();
        },
        addQuestion() {
            this.quiz.addQuestion();
        },
        addAnswer(id: number) {
            this.quiz.addAnswer(id);
        }
    }
});
</script>


<template>
    <div>
        <h1>Create Quiz</h1>
        <form @submit.prevent="createQuiz()">
            <div>
                <label for="quizName">Quiz Name</label>
                <input type="text">
            </div>
            <div>
                <label for="quizDescription">Quiz Description</label>
                <input type="text">
            </div>
            <div>
                <label for="quizCategory">Quiz Category</label>
                <input type="text">
            </div>
            <h2>Questions</h2>
            <div v-for="question, i in quiz.ownQuiz.questions" :id="question.id.toString + ''" class="question">
                <input type="text" v-model="question.question">
                <div class="answer" v-for="answer in question.answers">
                    <input type="text" v-model="answer.text">
                    <input type="checkbox" v-model="answer.correct">
                    <nuxt-icon name="add" @click="addAnswer(question.id)" />
                </div>
            </div>
            <nuxt-icon name="add" @click="addQuestion()"/>
            <button type="submit">
                Create Quiz
            </button>
        </form>
    </div>
</template>

<style scoped>
button {
    cursor: pointer;
    background-color: var(--bg-color-primary);
    color: var(--text-color-primary);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

button:hover {
    scale: 1.2;
}

button:active {
    scale: 0.9;
}

input[type="text"] {
    transition: scale 0.2s ease-in-out;
    background-color: var(--bg-color-primary);
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input[type="text"]:hover {
    scale: 1.01;
    background-color: var(--bg-color-secondary);
}

input[type="text"]:focus {
    border: 1px solid #000000ad !important;
    outline: none;
    background-color: var(--bg-color-secondary);
}

input[type="checkbox"] {
    /* ...existing styles */
    display: grid;
    place-content: center;
}

input[type="checkbox"]::before {
    transition: all 120ms ease-in-out;
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0) rotate(45deg) !important;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
}

input[type="checkbox"]:checked::before {
    transform: scale(1);
}

.question {
    margin: 0;
}

.answer {
    transition: opacity 0.2s ease-in-out, max-height .5s ease-in-out;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr auto;
    opacity: 1;
    height: 100%;
    display: none;
    max-height: 0vh;
}

.question:focus .answer,
.question:hover .answer,
.question:active .answer,
.question input:focus~.answer,
.question input:hover~.answer,
.question input:active~.answer {
    opacity: 1;
    max-height: 100vh;
}</style>