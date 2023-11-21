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
})

const comments_objs = ref(props.comments || []);

</script>

<template>
    <div class="py-2">
        <v-card variant="outlined" class="mx-2">
            <v-card-title>
                {{ content }}
            </v-card-title>
            <v-card-subtitle class="!flex !justify-end">
                - last updated:
                {{ (new Date(updated)).toLocaleTimeString() }}
            </v-card-subtitle>
        </v-card>
        <div class="ml-4" v-if="comments_objs">
            <!-- <Comment v-for="comment in comments" :content="comments_objs.content" :writer="comment.writer_obj?.username"
                :updated="comment.updated" /> -->
        </div>
    </div>
</template>