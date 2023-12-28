
<script setup lang="ts">
const props = defineProps({
    color: {
        type: String,
        default: "rgb(var(--v-theme-primary))",
    },
    shadow: {
        type: Boolean,
        default: true,
    },
    width: {
        type: String,
        default: "100%",
    },
    modelValue: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "text",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    required: {
        type: Boolean,
        default: false,
    },
    autocomplete: {
        type: String,
        default: "off",
    },
    autofocus: {
        type: Boolean,
        default: false,
    },
    typingTimout: {
        type: Number,
        default: 500,
    },
})

const mdlvl = ref(props.modelValue);
const delay = props.typingTimout;
let typingTimer: any;

onMounted(() => {
    if (props.autofocus) {
        const input = document.querySelector('.input') as HTMLInputElement;
        input.focus();
    }
    const input = document.querySelector('.input') as HTMLInputElement;
    input.addEventListener('focus', () => {
        input.select();
    });
});

const typing = () => {
    onChange();
    emit('typeing');
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        emit('stopTypeing');
    }, delay);
}

const onChange = () => {
    // console.log('change', mdlvl.value);
    emit('update:modelValue', mdlvl.value);
}


const emit = defineEmits(['update:modelValue', 'typeing', 'enter', 'escape', 'stopTypeing']);
</script>

<template>
    <div class="inputContainer">
        <input v-model="mdlvl" :style="{ width: width }" :placeholder="placeholder" :type="type" :disabled="disabled"
            :required="required" :autocomplete="autocomplete" :autofocus="autofocus" class="input" @keyup="typing"
            @keydown.enter="() => { emit('enter'); }" @keydown.escape="() => { emit('escape'); }"
            @focus="() => { emit('typeing'); }">
        <slot></slot>
    </div>
</template>


<style scoped>
.input {
    cursor: text;
    /* selectabile */
    -webkit-user-select: text;
    user-select: text;
    -moz-user-select: text;
    font: "Fira Code", monospace;
    transition: 0.2s;
    color: white;
    border: none;
    background: transparent;
    outline: none;
}

.inputContainer {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
    background: rgb(var(--v-theme-background));
    padding: 0.5rem;
    border: 0.1rem dotted rgb(var(--v-theme-primary));
    border-radius: 0.5rem;
}

.inputContainer:focus-within {
    border: 0.1rem solid rgb(var(--v-theme-primary));
    box-shadow: 0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
    color: rgb(var(--v-theme-primary));
}
.input:focus {
    outline: none;
    color: rgb(var(--v-theme-primary));
}

.input::placeholder {
    color: white;
}
.input:focus::placeholder {
    color: rgb(var(--v-theme-primary));
}
</style>