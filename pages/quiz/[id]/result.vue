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
            <div v-for="question, i in quiz.currentQuiz.questions">
                <h2>{{ question.question }}</h2>
                <div class="answers">
                    <!-- chosen -->
                    <p>
                        <!-- <span v-if="question. == question.correctAnswerId">✅</span> -->
                        <span>❌</span>
                        <!-- {{ question.answers[question.chosenAnswerId].answer }} -->
                    </p>
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
</style>