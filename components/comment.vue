<script setup lang="ts">
const props = defineProps({
    content: String,
    writer: String,
    updated: {
        type: String,
        default: () => new Date().toISOString(),
    },
    id: String,
    comments: Array,
    stars: {
        type: Number,
        default: 0,
    }
})

const comments_objs = ref(props.comments || []);

</script>

<template>
    <div class="py-2">
        <v-card variant="outlined" class="mx-2 !bg-[#000000b7] text-white">
            <v-card-title class="!flex flex-col justify-end">
                <!-- Stars: {{ stars }} -->
                <v-rating color="primary" empty-icon="mdi-star-outline" half-increments :model-value="stars" disabled
                    half-icon="mdi-star-half" full-icon="mdi-star" />
                <p class="text-left flex-wrap overflow-hidden whitespace-normal">
                    {{ content }}
                </p>
            </v-card-title>
            <v-card-subtitle class="!flex !justify-end">
                <p>
                    - last updated:
                    {{ (new Date(updated)).toLocaleTimeString() }}
                </p>
                   <p v-if="writer">
                    - by {{ writer }}
                   </p> 
            </v-card-subtitle>
        </v-card>
        <div class="ml-4" v-if="comments_objs">
        </div>
    </div>
</template>