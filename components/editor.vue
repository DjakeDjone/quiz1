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
        <Editor tinymce-script-src="/cdn/tinymce/tinymce.min.js" :init="{
            menubar: false, height: 700, plugins: ['lists', 'link', 'image', 'code', 'media', 'table', 'paste', 'fullscreen', 'help', 'wordcount', 'advlist', 'autolink', 'autosave', 'codesample', 'directionality', 'imagetools', 'mediaembed', 'nonbreaking', 'pagebreak', 'preview', 'print', 'quickbars', 'searchreplace', 'tabfocus', 'template', 'textpattern', 'toc', 'visualblocks', 'visualchars', 'wordcount'],
            toolbar: 'undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | removeformat | fullscreen | help | image | link | media | table | code | codesample | preview | print | searchreplace | spellchecker | visualchars | visualblocks | wordcount',
        }" @update:modelValue="(html) => $emit('update:modelValue', html)" v-model="editor"/>
    </main>
</template>

<style scoped>

.tox .tox-promotion-link {
    display: none !important;
}
</style>