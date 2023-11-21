<script setup lang="ts">
import { useSummaryStore } from '~/stores/summary';

const summaryStore = useSummaryStore();

const searchword = ref('');
onMounted(() => {
    summaryStore.loadSummaries();
    summaryStore.loadOwnSummaries();
});

watch(searchword, (newVal) => {
    summaryStore.loadSummaries(newVal);
});

</script>

<template>
    <main class="p-4">
        <h1 class="text-4xl">
            Summaries
        </h1>
        <h2 class="text-2xl">
            <u>Own Summaries:</u>
        </h2>
        <div class="my-4 border-b-2" v-if="summaryStore.own_summaries">
            <SummaryPrev :create="true"/>
            <SummaryPrev v-for="summary in summaryStore.own_summaries" :key="summary.id" :id="summary.id" class="m-4"
                @click="useRouter().push(`/summaries/${summary.id}`)" />
        </div>
        <h2 class="text-2xl">
            <u>Public Summaries:</u>
        </h2>
        <v-text-field v-model="searchword" label="Search" class="m-4" variant="outlined" append-inner-icon="mdi-magnify" @click:append-inner="searchword = ''" />
        <div class="py-4" v-if="summaryStore.summaries">
            <SummaryPrev v-for="summary in summaryStore.summaries" :key="summary.id" :id="summary.id" class="m-4"
                @click="useRouter().push(`/summaries/${summary.id}`)" />
        </div>
    </main>
</template>