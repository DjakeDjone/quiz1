<script setup lang="ts">
import { useQuizStore } from '~/stores/quiz';
import { useSummaryStore } from '~/stores/summary';
import { useUserstore } from '~/stores/user';

const summaryStore = useSummaryStore();
const userStore = useUserstore();

// id in the url
const id: string = useRoute().params.id as string;
const owner = computed(() => summaryStore.curr_summary?.writer === userStore.userId);

let owner_mode = ref(true);
const data = ref("empty");
const title = ref("");
const description = ref("");
const linked_quizzes = ref([] as string[])
const possible_quizzes = ref([] as string[]);
const stars = ref(0);
const fullscreen = ref(false);
const show_comments = ref(true);

// load the summary
onMounted(async () => {
    await summaryStore.loadSummary(id);
    // summaryStore.loadSummaries();
    data.value = summaryStore.curr_summary?.data ?? '';
    title.value = summaryStore.curr_summary?.title ?? '';
    description.value = summaryStore.curr_summary?.description ?? '';
    linked_quizzes.value = summaryStore.curr_summary?.quiz_objs?.map((q) => q.title!) ?? [] as string[];
    // load the quizzes
    // wait untlin the user is loaded
    watch(() => userStore.userId, async () => {
        if (userStore.userId) {
            await useQuizStore().loadOwnQuizzes();
            console.log('own quizzes', useQuizStore().own_quizzes);
            possible_quizzes.value = useQuizStore().own_quizzes.map((q) => q.title!) ?? [] as string[];
        }
    });
    if (userStore.userId) {
        await useQuizStore().loadOwnQuizzes();
        console.log('own quizzes', useQuizStore().own_quizzes);
        possible_quizzes.value = useQuizStore().own_quizzes.map((q) => q.title!) ?? [] as string[];
    }
});

const requestDelete = () => {
    if (confirm("Are you sure you want to delete this summary?")) {
        summaryStore.deleteSummary();
    }
}

const addQuiz = () => {
    // first save the summary
    summaryStore.updateSummary(title.value, description.value, data.value, linked_quizzes.value);
}



</script>

<template>
    <nav class="w-full flex flex-wrap">
        <v-btn class="m-4 w-fit relative hidden sm:block" color="primary" @click="useRouter().push('/')">
            <v-icon>mdi-home</v-icon>
            <v-tooltip location="bottom" activator="parent">
                <span>Home</span>
            </v-tooltip>
        </v-btn>
        <v-btn class="m-4 w-fit relative" color="primary" @click="useRouter().push('/summaries')">
            <v-icon>mdi-arrow-left</v-icon>
            <v-tooltip location="bottom" activator="parent">
                <span>Back</span>
            </v-tooltip>
        </v-btn>
        <div v-if="owner" class="inline-flex ml-auto mr-0">
            <!-- only if owner_mode -->
            <div class="inline-flex actions" :class="owner_mode ? 'showActions' : ''">
                <v-btn class="m-4 w-fit relative" color="primary"
                    @click="summaryStore.updateSummary(title, description, data, linked_quizzes)">
                    <v-icon>mdi-content-save</v-icon>
                    <v-tooltip location="bottom" activator="parent">
                        <span>Save</span>
                    </v-tooltip>
                </v-btn>
                <v-btn class="m-4 w-fit relative" color="primary" @click="requestDelete()">
                    <v-icon>mdi-delete</v-icon>
                    <v-tooltip location="bottom" activator="parent">
                        <span>Delete</span>
                    </v-tooltip>
                </v-btn>
            </div>
            <v-btn class="m-4 w-fit relative" color="primary" @click="owner_mode = !owner_mode">
                <v-icon v-if="!owner_mode">mdi-pencil</v-icon>
                <v-icon v-else>mdi-pencil-off</v-icon>
                <v-tooltip location="bottom" activator="parent">
                    <span v-if="!owner_mode">Edit</span>
                    <span v-else>Stop Editing</span>
                </v-tooltip>
            </v-btn>
        </div>
    </nav>
    <main class="md:p-4 flex flex-col md:flex-row p-4 w-full min-h-[calc(100vh-5rem)]">
        <div class="w-full overflow-auto bg-[rgb(var(--v-theme-surface))] dark:bg-[#fff] p-4 text-black rounded-md h-full"
            v-if="summaryStore.curr_summary && summaryStore.curr_summary.data && (summaryStore.curr_summary.writer !== userStore.userId || !owner_mode)"
            :style="fullscreen ? 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000;' : ''">
            <!-- <h1 class="text-4xl">{{ summaryStore.curr_summary?.title }}</h1>
            <h2 class="text-2xl"><u>Summary:</u></h2>
            <i class="border-b-2">
                {{ summaryStore.curr_summary?.description }}
            </i> -->
            <div class="flex">
                <div>
                    <div v-for="star in 5" class="inline-flex">
                        <v-icon v-if="star <= summaryStore.curr_summary?.stars" color="primary">
                            mdi-star
                        </v-icon>
                        <v-icon v-else>
                            mdi-star-outline
                        </v-icon>
                    </div>
                </div>
                <span class="ml-auto">
                    <v-icon @click="fullscreen=true" v-if="!fullscreen">
                        mdi-fullscreen
                    </v-icon>
                    <v-icon @click="fullscreen=false" v-else>
                        mdi-fullscreen-exit
                    </v-icon>
                </span>
            </div>
            <div class="summaryNotEditable !text-sm h-full">
                <iframe class="border-red-800 border-2 max-h-screen" height="800" width="100%"
                    :srcdoc="'<h1>'+summaryStore.curr_summary.title+'</h1><h2>'+summaryStore.curr_summary.description+'</h2>'  + summaryStore.curr_summary?.data"
                    style="border: none; overflow: hidden; font: Arial !important; color: #333; max-width: 100%;" allowfullscreen>
                </iframe>
            </div>
            <div v-if="summaryStore.curr_summary?.quizzes">
                <h2 class="text-2xl"><u>Linked Quizzes:</u></h2>
                <div class="flex flex-wrap">
                    <v-chip v-for="quiz, i in summaryStore.curr_summary?.quiz_objs" :key="quiz.id!" class="m-1"
                        color="primary" @click="useRouter().push('/quiz/' + quiz.id)">
                        <span class="text-black">
                            {{ quiz.title }} ({{ quiz.questions.length }} Q.)
                        </span>
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-chip>
                </div>
            </div>
            <!-- quizzes -->
            <!-- {{ summaryStore.curr_summary?.quizzes }} -->
        </div>
        <div v-else-if="data != 'empty'" class="flex flex-col w-full">
            <v-text-field v-model="title" label="Title" />
            <v-textarea v-model="description" label="Description" autoGrow rows="1" />
            <Editor v-model="data" class="mb-4" />
            <div v-if="possible_quizzes.length > 0" class="flex flex-col">
                <v-select v-model="linked_quizzes" :items="possible_quizzes" label="Linked Quizzes" multiple dense chips />
            </div>
        </div>
        <div>
            <div v-if="show_comments"
                class="flex flex-col p-4 backdrop-blur-sm bg-[#ffffff49] rounded-lg md:max-w-sm md:ml-2 w-full">
                <h2 class="text-2x">
                    <v-icon class="mr-4" @click="show_comments = !show_comments">mdi-comment</v-icon>
                    <u>Comments:</u>
                </h2>
                <div class="max-h-[calc(100vh-10rem)] overflow-x-auto">
                    <div v-if="summaryStore.curr_summary?.comments_objs">
                        <div v-for="comment, i in summaryStore.curr_summary?.comments_objs" class="b-2">
                            <!-- {{ comment }} -->
                            <Comment :content="comment.content" :writer="comment.writer_obj?.username"
                                :updated="comment.updated" :stars="comment.stars" />
                        </div>
                    </div>
                    <WriteComment :id="id" @sendComment="summaryStore.createComment($event.txt, $event.stars)" />
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
sup {
    font-size: 0.7rem !important;
}

p {
    font-size: 1.5rem !important;
}

.actions {
    transition: all .8s ease-in-out;
    max-width: 0rem !important;
    overflow: hidden !important;
}

.showActions {
    max-width: 15rem !important;
}

/* defome Style for the summary */
.summaryNotEditable {
    min-height: 20rem !important;
}

.summaryNotEditable .showActions {
    max-width: 15rem !important;
}

.summaryNotEditable ul {
    list-style: inherit !important;
}

.summaryNotEditable ul li {
    font-size: 1.5rem !important;
    margin-left: 1rem !important;
}
</style>