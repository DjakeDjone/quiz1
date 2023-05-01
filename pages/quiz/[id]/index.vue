<script lang="ts">
import { useQuizStore } from '~/stores/quiz';
export default defineComponent({
    name: "QuizPage",
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
    beforeMount() {
        console.log('QuizPage mounted');
        // get quiz id from url
        const id = this.$route.params.id;
        // get quiz from store
        this.quiz.loadQuiz(id as unknown as number);
    },
    methods: {
        next() {
            const btnNext = document.getElementById('next') as HTMLButtonElement;
            if (this.quiz.idx < this.quiz.currentQuiz.questions.length - 1) {
                this.quiz.idx++;
            } else {
                btnNext.innerText = 'Finish';
                btnNext.onclick = () => {
                    this.$router.push('/quiz/' + this.quiz.currentQuiz.id + '/result');
                }
            }
        },
        prev() {
            const btnPrev = document.getElementById('prev') as HTMLButtonElement;
            if (this.quiz.idx > 0) {
                this.quiz.idx--;
                btnPrev.style.opacity = '1';
                btnPrev.style.cursor = 'pointer';
            } else {
                btnPrev.style.opacity = '0.5';
                btnPrev.style.cursor = 'not-allowed';
            }
        },
    }
});
</script>

<template>
    <h1>
        QuizPage
    </h1>
    <div class="question" v-if="quiz.currentQuiz.questions">
        <h2>{{ quiz.currentQuiz.questions[0].question }}</h2>
        <div class="answers">
            <div v-for="answer in quiz.currentQuiz.questions[quiz.idx].answers" class="answer">
                <input type="radio" :value="answer" />
                <label>{{ answer.text }}</label>
            </div>
        </div>
        <div class="buttons">
            <button id="prev" @click="prev">Prev</button>
            <button id="next" @click="next">Next</button>
        </div>
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<style scoped>
.question {
    padding: 1rem;
    border-radius: 0.5rem;
    max-width: 30rem;
    margin: 0 auto;
    background-color: var(--bg-color-secondary);
}

.answers {
    display: flex;
    flex-direction: column;
}

.answer {
    display: flex;
    align-items: center;
}

.answer input {
    margin-right: 1rem;
}

.buttons {
    display: flex;
    justify-content: space-between;
}

button {
    cursor: pointer;
    padding: .5rem;
    margin: .5rem 0;
    border: none;
    background-color: var(--bg-color-primary);
    color: var(--text-color-primary);
    border-radius: 0.5rem;
    cursor: pointer;
    /* border: 1px solid black; */
    transition: scale 0.2s ease-in-out;
}

button:hover {
    transform: scale(1.1);
}

button:active {
    transform: scale(0.9);
}
</style>