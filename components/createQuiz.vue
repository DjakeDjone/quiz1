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
            this.quiz.addAnswer(id);
        },
        showDetails(id: number) {
            const answers = document.getElementsByClassName('answer' + id.toString());
            const details = document.getElementById('showDetails'+id.toString()) as HTMLElement;
            for (let i = 0; i < answers.length; i++) {
                const answer = answers[i] as HTMLElement;
                answer.classList.toggle('show');
                if (answer.classList.contains('show')) {
                    details.style.transform = 'rotate(180deg)';
                } else {
                    details.style.transform = 'rotate(0deg)';
                }
            }
        }
    }
});
</script>


<template>
    <div>
        <h1>Create Quiz</h1>
        <form @submit.prevent="createQuiz()">
            <div class="inputDiv">
                <label for="quizName">Quiz Name</label>
                <input type="text">
            </div>
            <div class="inputDiv">
                <label for="quizDescription">Quiz Description</label>
                <input type="text">
            </div>
            <div class="inputDiv">
                <label for="quizCategory">Quiz Category</label>
                <input type="text">
            </div>
            <h2>Questions</h2>
            <div v-for="question, i in quiz.ownQuiz.questions" :id="question.id.toString + ''" class="questionAnswer">
                <div class="question inputDiv">
                    <input type="text" v-model="question.question">
                    <nuxt-icon name="details" @click="showDetails(i)" :id="'showDetails' + i"></nuxt-icon>
                </div>
                <div class="answers">
                    <div :class="'answer' + i.toString()" class="answer" v-for="answer in question.answers">
                        <div class="inputDiv">
                            <input type="text" v-model="answer.text">
                            <input type="checkbox" v-model="answer.correct">
                        </div>
                    </div>
                    <div :class="'answer' + i.toString()" class="answer">
                        <nuxt-icon name="add" @click="addAnswer(question.id)" />
                    </div>
                </div>
                <nuxt-icon name="add" @click="addQuestion()" />
            </div>
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

.inputDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: .8rem 0;
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
    font-size: 1rem;
    width: 100%;
    max-width: 30rem;
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
}

.question>span {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    margin-bottom: 0.5rem;
}

.question>span:hover {
    scale: 1.2;
}

.question>span:active {
    scale: 0.9;

}

.questionAnswer :has(.question > span:active) .answer,
.questionAnswer :has(.question > span:hover) .answer,
.questionAnswer :has(.question > span:focus) .answer {
    opacity: 1;
    max-height: 100vh;
}

.anser:focus,
.answer:active {
    opacity: 1;
    max-height: 100vh;
}

.answer {
    transition: opacity 0.2s ease-in-out, max-height .5s ease-in-out;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    justify-content: space-between;
    opacity: 0;
    height: 100%;
    max-height: 0vh;
    overflow: hidden;
}

.show {
    opacity: 1 !important;
    max-height: 100vh !important;
}</style>