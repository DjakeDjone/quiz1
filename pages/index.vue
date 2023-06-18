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
        },
        filter(text: string) {
            console.log(text);
            text = text.toLowerCase();
            this.quiz.filterWords = text.split(' ');
        }
    }
});
</script>


<template>
    <h1>Quizzes</h1>
    <div id="filter">
        <NuxtIcon name="search" id="searchIcon"/>
        <input type="text" placeholder="Filter" id="search" @input="(e: any) => { filter(e.target.value) }">
    </div>
    <div class="quizze">
        <div v-for="quizPrev in quiz.quizzes" >
            <div @click="openQuiz(quizPrev.id)">
                <h1>{{ quizPrev.name }}</h1>
                <p>{{ quizPrev.description }}</p>
                <!-- <button @click="openQuiz(quizPrev.id)">Start</button> -->
            </div>
        </div>
    </div>
</template>

<style scoped>

#searchIcon {
    cursor: pointer;
    margin-left: .5rem;
    transition: all .2s ease-in-out;
}
#searchIcon:hover {
    scale: 1.1;
}
#searchIcon:active {
    scale: .9;
}
#filter {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    padding: .1rem;
    border-radius: 1rem;
    background-color: var(--bg-color-secondary);
    box-shadow: var(--box-shadow);
}
#filter input {
    border: none;
    background-color: transparent;
    padding: .5rem;
    width: 100%;
    height: 100%;
}
#filter input:focus {
    outline: none;
    background-color: transparent;
    box-shadow: none;
}
#filter:hover,
#filter:focus,
#filter:active {
    box-shadow: var(--box-shadow-light);
}
.quizze {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
}

.quizze>div {
    transition: all .2s ease-in-out;
    width: 15rem;
    height: 13rem;
    /* border: 1px solid black; */
    border-radius: 1rem;
    background-color: var(--bg-color-secondary);
    box-shadow: var(--box-shadow-card);
    margin: 1rem;
    padding: 1rem;
}
.quizze>div:hover {
    cursor: pointer;
    scale: 1.01;
    box-shadow: var(--box-shadow-card-hover);
}
</style>