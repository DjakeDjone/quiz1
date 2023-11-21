<script setup lang="ts">
import { useSummaryStore } from '~/stores/summary';
import { useUserstore } from '~/stores/user';

const summaryStore = useSummaryStore();
const userStore = useUserstore();

// id in the url
const id: string = useRoute().params.id as string;
const owner = computed(() => summaryStore.curr_summary?.writer === userStore.userId);

// load the summary
onMounted(() => {
    summaryStore.loadSummary(id);
    summaryStore.loadSummaries();
});
const test = ref("<h1>Hello World</h1>");

</script>

<template>
    <nav>
        <v-btn class="m-4 w-fit relative" color="primary" @click="useRouter().push('/')">
            <v-icon>mdi-home</v-icon>
            <v-tooltip location="bottom" activator="parent">
                <span>Home</span>
            </v-tooltip>
        </v-btn>
    </nav>
    <main class="md:p-4 md:flex">
        <!-- {{ summaryStore.curr_summary }} -->
        <div class="w-full max-w-4xl bg-[rgb(var(--v-theme-on-code))] text-black p-4" v-if="!owner">
            <p v-html="summaryStore.curr_summary?.data" />
        </div>
        <div v-else-if="summaryStore.curr_summary && summaryStore.curr_summary.data" class="flex flex-col">
            <Editor v-if="summaryStore.curr_summary.data.length>0" v-model="summaryStore.curr_summary.data" />
        </div>
        <div class="flex flex-col ml-4">
            <h2 class="text-2xl"><u>Comments:</u></h2>
            <div class="max-h-[calc(100vh-10rem)] overflow-x-auto">
                <div v-if="summaryStore.curr_summary?.comments_objs">
                    <div v-for="comment in summaryStore.curr_summary?.comments_objs" class="b-2">
                        <Comment :content="comment.content" :writer="comment.writer_obj?.username" :updated="comment.updated" />
                    </div>
                </div>
                <WriteComment :id="id" @sendComment="summaryStore.createComment($event)" />
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
</style>