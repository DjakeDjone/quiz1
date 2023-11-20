<script setup lang="ts">
import { useSummaryStore } from '~/stores/summary';
import { useUserstore } from '~/stores/user';

const summaryStore = useSummaryStore();
const userStore = useUserstore();

// id in the url
const id: string = useRoute().params.id as string;

// load the summary
onMounted(() => {
    summaryStore.loadSummary(id);
    summaryStore.loadSummaries();
});

</script>

<template>
    <main class="md:p-4">
        <!-- {{ summaryStore.curr_summary }} -->
        <div class="w-full max-w-4xl bg-[rgb(var(--v-theme-on-code))] text-black p-4">
            <p v-html="summaryStore.curr_summary?.data" />
        </div>
        <div>
            -- {{ summaryStore.curr_summary?.comments_objs }} --
            <h3 v-for="comment in summaryStore.curr_summary?.comments_objs">
                {{ comment }}
                <!-- {{ comment.writer_obj?.username }} - {{ (new Date(comment.created)).toLocaleDateString() }}, -->
                <br>
                last updated:
                <!-- {{ (new Date(comment.updated)).toLocaleTimeString() }} -->
            </h3>
        </div>
    </main>
</template>