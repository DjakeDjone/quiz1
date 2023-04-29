<script lang="ts">
import { useMessagestore } from '~/stores/msg';
import { useQuizStore } from '~/stores/quiz';
export default defineComponent({
    name: "IndexPage",
    setup() {
        return {
            messagestore: useMessagestore(),
            quiz: useQuizStore(),
        }
    },
    mounted() {
        // load quizzes
        this.quiz.loadRelevantQuizzes();
    },
    methods: {
        openQuiz(id: number) {
            this.quiz.loadQuiz(id);
            this.$router.push('/quiz/' + id);
        }
    }
});
</script>


<template>
    <h1>Quize:</h1>
    <div id="filter">
        <input type="text" placeholder="Filter">
    </div>
    <div class="quizze">
        <div v-for="quizPrev in quiz.quizzes">
            <div>
                <h1>{{ quizPrev.name }}</h1>
                <p>{{ quizPrev.description }}</p>
                <button @click="openQuiz(quizPrev.id)">Start</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .quizze {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .quizze > div {
        transition: all .2s ease-in-out;
        width: 15rem;
        height: 13rem;
        /* border: 1px solid black; */
        border-radius: 1rem;
        background-color: var(--bg-color-secondary);
        margin: 1rem;
        padding: 1rem;
    }
    .quizze > div:hover {
        box-shadow: var(--box-shadow);
        scale: .9;
    }
    .quizze > div:active button,
    .quizze > div:focus button {
        transition: all .2s ease-in-out;
        box-shadow: var(--box-shadow);
        scale: 1.1;
    }
    .quizze > div > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
    .quizze > div > div > button {
        width: 100%;
    }
    button {
        border: none;
        border-radius: 1rem;
        background-color: var(--bg-color-primary);
        color: var(--color-secondary);
        padding: .5rem;
        cursor: pointer;
    }
    button:hover {
        box-shadow: var(--box-shadow);
    }
    button:active {
        transition: all .2s ease-in-out;
        box-shadow: var(--box-shadow);
    }
    button:active {
        scale: .9;
    }
</style>