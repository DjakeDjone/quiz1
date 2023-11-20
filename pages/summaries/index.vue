<script setup lang="ts">
import { useSummaryStore } from '~/stores/summary';

const summaryStore = useSummaryStore();

summaryStore.loadSummaries();

</script>

<template>
    <main class="p-4">
        <h1 class="text-4xl">
            Summaries
        </h1>
        <div class="py-4">
            <SummaryPrev v-for="summary in summaryStore.summaries" :key="summary.id" :id="summary.id" class="m-4" @click="useRouter().push(`/summaries/${summary.id}`)" />
        </div>
    </main>
</template>