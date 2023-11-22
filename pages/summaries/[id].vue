<script setup lang="ts">
import { useSummaryStore } from '~/stores/summary';
import { useUserstore } from '~/stores/user';

const summaryStore = useSummaryStore();
const userStore = useUserstore();

// id in the url
const id: string = useRoute().params.id as string;
const owner = computed(() => summaryStore.curr_summary?.writer === userStore.userId);

// load the summary
onMounted(async () => {
    await summaryStore.loadSummary(id);
    // summaryStore.loadSummaries();
    data.value = summaryStore.curr_summary?.data ?? '';
});
const data = ref('');

</script>

<template>
    <nav class="w-full flex">
        <v-btn class="m-4 w-fit relative" color="primary" @click="useRouter().push('/')">
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
        <div v-if="owner" class="inline ml-auto mr-0">
            <v-btn class="m-4 w-fit relative" color="primary" @click="summaryStore.updateSummary(data)">
                <v-icon>mdi-content-save</v-icon>
                <v-tooltip location="bottom" activator="parent">
                    <span>Save</span>
                </v-tooltip>
            </v-btn>
            <v-btn class="m-4 w-fit relative" color="primary" @click="summaryStore.deleteSummary()">
                <v-icon>mdi-delete</v-icon>
                <v-tooltip location="bottom" activator="parent">
                    <span>Delete</span>
                </v-tooltip>
            </v-btn>
        </div>
    </nav>
    <main class="md:p-4 md:flex p-4 max-w-7xl mx-auto min-h-[calc(100vh-5rem)]">
        <div class="w-full max-w-4xl bg-[rgb(var(--v-theme-surface))] dark:bg-[#cccccc] p-4 text-black rounded-md"
            v-if="summaryStore.curr_summary && summaryStore.curr_summary.data">
            <p v-html="summaryStore.curr_summary?.data" class="text-[rgb(var(--v-theme-))]"></p>
        </div>
        <!-- <div v-else-if="summaryStore.curr_summary && summaryStore.curr_summary.data" class="flex flex-col">
            <Editor v-if="summaryStore.curr_summary.data.length > 0" v-model="data" />
        </div> -->
        <div class="flex flex-col ml-4">
            <h2 class="text-2xl"><u>Comments:</u></h2>
            <div class="max-h-[calc(100vh-10rem)] overflow-x-auto">
                <div v-if="summaryStore.curr_summary?.comments_objs">
                    <div v-for="comment, i in summaryStore.curr_summary?.comments_objs" class="b-2">
                        <Comment :content="comment.content" :writer="comment.writer_obj?.username"
                            :updated="comment.updated" />
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