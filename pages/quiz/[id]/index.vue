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
            if (this.quiz.idx + 1 < this.quiz.currentQuiz.questions.length - 1) {
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
            <div v-for="answer, i in quiz.currentQuiz.questions[quiz.idx].answers" class="answer">
                <input type="radio" :value="quiz.currentQuiz.questions[0].chosenAnswer" :name="i.toString + ''" />
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

input[type="radio"] {
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
    border-radius: 50% 50% 0 50%;
    border: 2px solid var(--bg-color-primary);
    transition: all 0.2s ease-in-out;
}

input[type="radio"]:checked {
    background-color: var(--bg-color-primary);
    border: 2px solid rgb(29, 196, 3);
    transition: all 0.2s ease-in-out;
    content: '✔';
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(29, 196, 3);
}

input[type="radio"]:hover {
    transform: scale(1.1);
}

input[type="radio"]:active {
    transform: scale(0.9);
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

.checkbox-wrapper-12 {
    position: relative;
}

.checkbox-wrapper-12>svg {
    position: absolute;
    top: -130%;
    left: -170%;
    width: 110px;
    pointer-events: none;
}

.checkbox-wrapper-12 * {
    box-sizing: border-box;
}

.checkbox-wrapper-12 input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    margin: 0;
}

.checkbox-wrapper-12 input[type="checkbox"]:focus {
    outline: 0;
}

.checkbox-wrapper-12 .cbx {
    width: 24px;
    height: 24px;
    top: calc(50vh - 12px);
    left: calc(50vw - 12px);
}

.checkbox-wrapper-12 .cbx input {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border: 2px solid #bfbfc0;
    border-radius: 50%;
}

.checkbox-wrapper-12 .cbx label {
    width: 24px;
    height: 24px;
    background: none;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-filter: url("#goo-12");
    filter: url("#goo-12");
    transform: trasnlate3d(0, 0, 0);
    pointer-events: none;
}

.checkbox-wrapper-12 .cbx svg {
    position: absolute;
    top: 5px;
    left: 4px;
    z-index: 1;
    pointer-events: none;
}

.checkbox-wrapper-12 .cbx svg path {
    stroke: #fff;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 19;
    stroke-dashoffset: 19;
    transition: stroke-dashoffset 0.3s ease;
    transition-delay: 0.2s;
}

.checkbox-wrapper-12 .cbx input:checked+label {
    animation: splash-12 0.6s ease forwards;
}

.checkbox-wrapper-12 .cbx input:checked+label+svg path {
    stroke-dashoffset: 0;
}

@-moz-keyframes splash-12 {
    40% {
        background: #866efb;
        box-shadow: 0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb, 16px 8px 0 -8px #866efb, 0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb, -16px -8px 0 -8px #866efb;
    }

    100% {
        background: #866efb;
        box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
}

@-webkit-keyframes splash-12 {
    40% {
        background: #866efb;
        box-shadow: 0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb, 16px 8px 0 -8px #866efb, 0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb, -16px -8px 0 -8px #866efb;
    }

    100% {
        background: #866efb;
        box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
}

@-o-keyframes splash-12 {
    40% {
        background: #866efb;
        box-shadow: 0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb, 16px 8px 0 -8px #866efb, 0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb, -16px -8px 0 -8px #866efb;
    }

    100% {
        background: #866efb;
        box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
}

@keyframes splash-12 {
    40% {
        background: #866efb;
        box-shadow: 0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb, 16px 8px 0 -8px #866efb, 0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb, -16px -8px 0 -8px #866efb;
    }

    100% {
        background: #866efb;
        box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
}
</style>