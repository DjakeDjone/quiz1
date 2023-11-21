<script setup lang="ts">
import { useUserstore } from '~/stores/user';
import { useSummaryStore } from '~/stores/summary';

const userStore = useUserstore();
const summaryStore = useSummaryStore();

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    create: {
        type: Boolean,
        default: false,
    },
});

const summary = computed(() => {
    if (summaryStore.summaries.find((s) => s.id === props.id)) {
        const foundSummary = summaryStore.summaries.find((s) => s.id === props.id);
        return foundSummary;
    }
    return null;
});

</script>

<template>
    <v-card width="200" height="200" v-if="summary" variant="outlined"
        class="transition-all hover:scale-[.99] cursor-pointer">
        <v-card-actions v-if="!create">
            <div class="border-b-2">
                <p>
                    {{ summary.writer_obj?.username }} - {{ (new Date(summary.created)).toLocaleDateString() }},
                    <br>
                    last updated:
                    {{ (new Date(summary.updated)).toLocaleTimeString() }}
                </p>
            </div>
        </v-card-actions>
        <v-card-text class="break-words !pt-0 !px-2" v-if="!create">
            <p v-html="summary.data"></p>
        </v-card-text>
        <v-card-title v-if="create">
            <v-icon>
                mdi-plus
            </v-icon>
        </v-card-title>
    </v-card>
</template>