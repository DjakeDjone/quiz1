<script setup>
// Example HTML:
// <input type="file" id="fileInput" />

import PocketBase from 'pocketbase';
import { useUserstore } from '~/stores/user';


onMounted(async () => {
    const formData = new FormData();
    
    const fileInput = document.getElementById('fileInput');
    formData.append('title', 'Hello world!');

    // listen to file input changes and add the selected files to the form data
    fileInput.addEventListener('change', async() => {
        for (let file of fileInput.files) {
            formData.append('file', file);
            // const createdRecord = pb.collection('users').create(formData);
            const createdRecord = await useUserstore().pb.collection('files').create(formData);
        }
    });

    // set some other regular text field value



    // upload and create new record
}); 
</script>

<template>
    <div>
        <input type="file" id="fileInput" />
    </div>
</template>