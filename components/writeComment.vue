<script setup lang="ts">
const props = defineProps({
    content: String,
    writer: String,
    id: String,
})

const content_ref = ref(props.content || '');

const emit = defineEmits(['sendComment']);
const sendComment = () => {
    emit('sendComment', content_ref.value);
    content_ref.value = '';
}
</script>

<template>
    <div>
        <v-card variant="outlined" class="m-2 !p-0 h-fit">
            <v-card-title class="!p-0">
                <!-- {{ content }} -->
                <v-textarea  v-model="content_ref" placeholder="Thank you for your summary!" name="Write a comment" counter />
                <v-card-actions>
                    <v-btn color="primary" class="w-full" @click="sendComment">
                        Send 
                        <v-icon>
                            mdi-send
                        </v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card-title>
        </v-card>
    </div>
</template>