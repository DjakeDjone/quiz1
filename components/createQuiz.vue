<script lang="ts">
import { useUserstore } from '~/stores/user';
import { useQuizStore } from '~/stores/quiz';
import { SourceTextModule } from 'vm';

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
        const answersDetails = document.getElementById('answersDetails') as HTMLDivElement;
        const answerContainer = document.getElementById('answerContainer') as HTMLDivElement;
    },
    methods: {
        createQuiz() {
            this.quiz.createQuiz();
            // console.log(this.quiz.ownQuiz);
        },
        addQuestion() {
            this.quiz.addQuestion();
        },
        addAnswer(id: number) {
            this.quiz.addAnswer(id+1);
        },
        removeAnswer(questionId: number, answerId: number) {
            this.quiz.removeAnswer(questionId, answerId);
        },
    }
});
</script>


<template>
    <div>
        <h1>Create Quiz</h1>
        <form @submit.prevent="createQuiz()">
            <div class="inputDiv">
                <label for="quizName">Quiz Name</label>
                <input type="text" v-model="quiz.ownQuiz.name">
            </div>
            <div class="inputDiv">
                <label for="quizDescription">Quiz Description</label>
                <input type="text" v-model="quiz.ownQuiz.description">
            </div>
            <div class="inputDiv">
                <label for="quizCategory">Quiz Category</label>
                <input type="text" v-model="quiz.ownQuiz.signalWords">
            </div>
            <h2>Questions</h2>
            <div v-for="question, i in quiz.ownQuiz.questions" :id="question.id.toString + ''" class="questionAnswer">
                <div class="question inputDiv">
                    <input type="text" v-model="question.question">
                    <!-- <nuxt-icon name="details" @click="showDetails(i)" :id="'showDetails' + i"></nuxt-icon> -->
                    <div class="answers">
                        <div v-for="answer, j in question.answers" class="answer">
                            <input type="radio" v-model="answer.correct" :name="i.toString()" />
                            <!-- <label>{{ answer.text }}</label> -->
                            <input type="text" v-model="answer.text">
                            <nuxt-icon class="deleteIcon" name="delete" @click="removeAnswer(i, j)" />
                        </div>
                        <div>
                            <nuxt-icon name="add" @click="addAnswer(i)" />
                        </div>
                    </div>
                </div>
                <nuxt-icon name="add" @click="addQuestion()" />
            </div>
            <button class="button" type="submit">
                Create Quiz
            </button>
        </form>
    </div>
</template>

<style scoped>

.deleteIcon{
    font-size: 1.2rem !important;
    margin-left: -1.8rem !important;
    margin-top: 0.5rem !important;
    z-index: 1;
}
.button {
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

.inputDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 30rem;
    margin: auto auto 1rem auto !important;
    border-radius: 0.5rem;
}

.nuxt-icon {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    margin-left: 1rem;
}

.nuxt-icon:hover {
    font-size: 1.2rem;
}

.inputDiv input {
    transition: all 0.4s ease-in-out;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: var(--bg-color-secondary);
    font-size: 1rem;
    width: 100%;
    transition: all 0.2s ease-in-out;
}

.inputDiv input:focus,
.inputDiv input:hover,
.inputDiv input:active {
    outline: none;
    box-shadow: var(--box-shadow-small);
    border-bottom: 2px solid var(--bg-color-primary);
}


.question {
    margin: 0;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-color-secondary);
}

.question>span {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    margin-bottom: 0.5rem;
}
.answer {
    display: flex;
    flex-direction: row;
    margin: 0;
}
.answer input[type="radio"] {
    margin-right: 1rem;
    cursor: pointer;
    background-color: var(--bg-color-primary);
    /* webcit */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /* end webkit */
    width: 1rem;
    height: 1rem;
    padding: 0;
    border-radius: 50% 50% 0 50%;
    border: rgb(255, 0, 21) 1px solid;
    transform: rotate(-45deg);
    transition: all 0.2s ease-in-out, transform 0.7s ease-in-out;
}
.answer {
    margin: 0.5rem;
}

.answer input:checked {
    background-color: var(--bg-color-primary);
    border: 2px solid rgb(29, 196, 3);
    content: '✔';
    font-size: 1.5rem;
    transform: rotate(315deg);
}
.answer input[type="text"] {
    width: 100% !important;
}
.answers {
    width: calc(100% - 2rem);
    margin: 1rem;
    display: flex;
    flex-direction: column;
    margin: 0;
}
</style>