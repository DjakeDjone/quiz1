<script lang="ts">
import { useQuizStore } from '~/stores/quiz';
export default defineComponent({
    name: "ResultPage",
    setup() {
        const quiz = useQuizStore();
        return {
            quiz,
        }
    },
    data() {
        return {
        }
    },
    mounted() {
        console.log("Quiz: ", this.quiz.currentQuiz);
    },
    methods: {
        score() {
            let score = 0;
            for (let i = 0; i < this.quiz.currentQuiz.questions.length; i++) {
                if (this.quiz.currentQuiz.questions[i]) {
                    score++;
                }
            }
            return score;
        },
        finish() {
            this.$router.push('/');
        }
    }
});
</script>

<template>
    <main>
        <h1>Result</h1>
        <div>
            <h2>Score: {{ score() }}</h2>
            <h2>Max Score: {{ quiz.currentQuiz.questions.length }}</h2>
        </div>
        <div class="answers">
            <div v-for="question, i in quiz.currentQuiz.questions" class="questionContainer">
                <h2 class="question">{{ question.question }}</h2>
                <div class="answers">
                    <!-- chosen -->
                    <!-- <p>
                        {{ question.answers }}
                        {{ question.chosenAnswer }}
                    </p> -->
                    <!-- correct -->
                    <p v-if="question.answers[chosenAnswer-1].correct" class="correctAnswer">{{ question.answers[chosenAnswer] }}</p>
                    <!-- incorrect -->
                    <p v-else class="wrongAnswer">{{ question.answers[chosenAnswer] }}</p>
                    <!-- correct -->
                    <span>correct would have been:</span>
                    <!-- <div v-if="!question.answers[chosenAnswer-1].correct" v-for="answer, i in question.answers" class="answer">
                        <span v-if="answer.correct">{{ answer }}; </span>
                    </div> -->
                </div>
            </div>
        </div>
        <button @click="finish()">finish</button>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

button {
    transition: all .2s ease-in-out;
    margin: 1rem;
    padding: .5rem;
    border: none;
    background-color: var(--bg-color-secondary);
    color: var(--text-color-primary);
    cursor: pointer;
    border-radius: .5rem;
}

button:hover {
    scale: 1.1;
}

button:active {
    scale: .9;
}

.answer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.answer span {
    margin-right: .5rem;
}

.questionContainer {
    margin: 1rem;
    padding: .5rem 1rem;
    border-radius: .5rem;
    background-color: var(--bg-color-secondary);
}

.question {
    margin-bottom: .5rem;
    text-decoration: underline;
    padding: .5rem;
}
</style>