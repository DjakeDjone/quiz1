<script setup lang="ts">
import { useSummaryStore } from '~/stores/summary';

const summaryStore = useSummaryStore();

const searchword = ref('');
onMounted(async() => {
    summaryStore.loadSummaries();
    summaryStore.loadOwnSummaries();
});

watch(searchword, (newVal) => {
    summaryStore.loadSummaries(newVal);
});

const createSummary = async () => {
    // useRouter().push('/summaries');
    await summaryStore.createSummary("New Summary");
    useRouter().push(`/summaries/${summaryStore.curr_summary?.id}`);
};

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
    <main class="p-4 max-w-7xl mx-auto min-h-[calc(100vh-5rem)]">
        <h1 class="text-4xl">
            Summaries
        </h1>
        <h2 class="text-2xl">
            <u>Own Summaries:</u>
        </h2>
        <div class="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <SummaryPrev :create="true" @click="createSummary()" class="w-full" />
            <SummaryPrev v-for="summary in summaryStore.own_summaries" :key="summary.id" :id="summary.id" class="w-full"
                @click="useRouter().push(`/summaries/${summary.id}`)" />
        </div>
        <h2 class="text-2xl">
            <u>Public Summaries:</u>
        </h2>
        <v-text-field v-model="searchword" label="Search" class="m-4" variant="outlined" append-inner-icon="mdi-magnify"
            @click:append-inner="searchword = ''" color="primary" />
            <!-- center -->
        <div v-if="summaryStore.summaries" class="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <SummaryPrev v-for="summary in summaryStore.summaries" :key="summary.id" :id="summary.id" class="m-auto"
                @click="useRouter().push(`/summaries/${summary.id}`)" />
        </div>
    </main>
</template>