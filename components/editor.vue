<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'
// import { start } from 'repl';

const props = defineProps(['modelValue']);
// const props = defineProps({
//     modelValue: {
//         type: String,
//         required: true,
//     }
// });
let editor = ref(props.modelValue);

onMounted(() => {
    console.log(editor.value);
    editor.value = props.modelValue;
    console.log("Second:", editor.value);
});
</script>

<template>
    <main>
        {{ editor }}
        <Editor tinymce-script-src="/cdn/tinymce/tinymce.min.js" :init="{
            menubar: false,
        }" @update:modelValue="(html) => $emit('update:modelValue', html)" v-model="editor"/>
    </main>
</template>

<style></style>