<script setup lang="ts">
import { useUserstore } from '~/stores/user';
import { useQuizStore } from '~/stores/quiz';

const user = useUserstore();
const quizStore = useQuizStore();
const filter = ref('');
const own_quizzes_visible = ref(true);

onMounted(async () => {
    // load quizzes
    quizStore.loadPublicQuizzes("");
    console.log('Loading quizzes');
    if (user.loggedIn) {
        quizStore.loadOwnQuizzes();
    } else {
        watch(() => useUserstore().loggedIn == true, async () => {
            if (user.loggedIn) {
                quizStore.loadOwnQuizzes();
            }
        });
    }
});

const createQuiz = async () => {
    const created = await quizStore.createQuiz();
    if (created && quizStore.current_quiz.id) {
        // load quizz
        const quizz = await quizStore.loadQuiz(quizStore.current_quiz.id);
        if (quizz) {
            console.log('Loaded quiz');
            useRouter().push('/quiz/' + quizz.id + '/edit');
        } else {
            console.error('Failed to load quiz');
        }
    } else {
        console.error('Failed to create quiz');
    }
};

const search = (searchword: string) => {
    console.log('Searching for ' + filter.value);
    // if (searchword == '') {
    //     return;
    // }
    quizStore.loadPublicQuizzes(searchword);
};


</script>

<template>
    <nav>
        <BButton to="/" color="#ffffff50" :shadow="false">
            <span>
                <v-icon size="30">
                    mdi-home
                </v-icon>
            </span>
        </BButton>
    </nav>
    <main class="transition-all md:p-4">
        <div id="ownQuizzes" class="p-4" v-auto-animate>
            <h1 class="text-4xl">Your quizzes
                <v-icon size="30" @click="own_quizzes_visible = !own_quizzes_visible">
                    mdi-eye{{ own_quizzes_visible ? '' : '-off' }}
                </v-icon>
            </h1>
            <div>
                <p>
                    Here you can find all your quizzes.
                </p>
            </div>
            <!-- calc height of the container -->
            <div id="ownQuizzesContainer" class="flex flex-wrap !justify-start"
                v-if="quizStore.own_quizzes && own_quizzes_visible">
                <div class="mr-2 !h-92 my-2">
                    <b-card width="15rem" bg="var(--card-filter)" class="h-full" headline="Create Quiz">
                        <b-button @click="createQuiz" class="h-full">Create</b-button>
                    </b-card>
                </div>
                <div v-for="quiz, i in quizStore.own_quizzes" class="mr-2 !h-92 my-2" :key="quiz.id || quiz.title">
                    <b-card width="15rem" bg="var(--card-filter)" class="h-full" :headline="quiz.title"
                        :subheadline="quiz.description">
                        <b-button @click="() => { useRouter().push('/quiz/' + quiz.id + '/edit'); }">Edit</b-button>
                        <b-button @click="() => { useRouter().push('/quiz/' + quiz.id + ''); }">Play</b-button>
                    </b-card>
                </div>
            </div>
        </div>
        <div id="publicQuizzes" class="p-4 border-t-2 border-dotted transition-all">
            <h1 class="text-3xl">
                Public quizzes
            </h1>
            <div>
                <p>
                    Here you can find all public quizzes.
                </p>
            </div>
            <div id="filter">
                <b-input class="w-full max-w-sm" v-model="filter" placeholder="Search"
                    @typeing="() => { console.log('typeing'); }" @stopTypeing="() => { search(filter); }"
                    @enter="() => { search(filter); }" @escape="() => { console.log('escape'); }" autofocus>
                    <v-icon @click="() => { search(filter); }">
                        mdi-magnify
                    </v-icon>
                </b-input>
            </div>
            <div class="flex flex-wrap justify-center md:!justify-start" v-auto-animate>
                <div v-for="quiz, i in quizStore.public_quizzes" class="mr-2 !h-92 my-2" :key="quiz.id || quiz.title">
                    <b-card width="15rem" bg="var(--card-filter)" class="h-full" :headline="quiz.title"
                        :subheadline="quiz.description">
                        <b-button @click="() => { useRouter().push('/quiz/' + quiz.id + ''); }">Play</b-button>
                    </b-card>
                </div>
            </div>
        </div>
    </main>
</template>