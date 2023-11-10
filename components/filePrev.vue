<script setup lang="ts">

const props = defineProps({
    file: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
})

const type = computed(() => {
    const ext = props.file.split('.').pop();
    switch (ext) {
        case 'png':
        case 'jpg':
        case 'jpeg':
            return 'image';
        case 'mp4':
            return 'video';
        case 'mp3':
            return 'audio';
        case 'upload':
            return 'upload';
        default:
            return 'unknown';
    }
});

</script>

<template>
    <div class="filePrev">
        <div
            class="h-[4rem] bg-[#ffffff12] p-4 rounded-md flex items-center border-2 border-transparent hover:border-green-300 transition-all">
            <div class="">
                <v-icon v-if="type == 'image'">mdi-image</v-icon>
                <v-icon v-if="type == 'video'">mdi-video</v-icon>
                <v-icon v-if="type == 'audio'">mdi-audio</v-icon>
                <v-icon v-if="type == 'upload'">mdi-upload</v-icon>
                <v-icon v-if="type == 'unknown'">mdi-file</v-icon>
            </div>
            <div class="w-[4rem] h-[4rem] ml-2 flex flex-col justify-center py-2">
                <p class="break-words overflow-hidden">{{ name }}</p>
            </div>
            <!-- v-tooltip on hover -->
            <v-tooltip activator="parent" location="bottom">
                <span>{{ name }}</span>
            </v-tooltip>
        </div>
    </div>
</template>