<script setup lang="ts">
import { useUserstore } from '~/stores/user';
import { useSummaryStore } from '~/stores/summary';

const userStore = useUserstore();
const summaryStore = useSummaryStore();

const props = defineProps({
    id: {
        type: String,
        required: false,
    },
    create: {
        type: Boolean,
        default: false,
    },
    idx: {
        type: Number,
        required: false,
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
    <v-card width="100%" height="240" variant="outlined" class="transition-all hover:scale-[.99] cursor-pointer hover:backdrop-blur-sm !bg-[#ffffff96] dark:!bg-[#ffffff1f]">
        <v-card-actions v-if="!create && summary" class="!bg-[#00000030]">
            <div class="border-b-2">
                <p>
                    <span class="text-green">
                        {{ summary.writer_obj?.username }} - {{ (new Date(summary.created)).toLocaleDateString() }},
                    </span>
                    <br>
                    last updated:
                    {{ (new Date(summary.updated)).toLocaleTimeString() }}
                </p>
            </div>
        </v-card-actions>
        <v-card-text class="break-words !pt-0 !px-2" v-if="summary">
            <p v-html="summary.data"></p>
        </v-card-text>
        <v-card-title v-if="create" class="w-full h-full !flex justify-center items-center">
            <div>
                <v-icon class="hover:!scale-105 transition-all" size="80">
                    mdi-plus
                </v-icon>
                <v-tooltip activator="parent" color="primary" location="bottom">
                    <span>Create Summary</span>
                </v-tooltip>
            </div>
        </v-card-title>
    </v-card>
</template>