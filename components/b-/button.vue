
import type { text } from 'stream/consumers';

import type { relative } from 'path';
<script setup lang="ts">
const props = defineProps({
    color: {
        type: String,
        default: "rgb(var(--v-theme-primary))",
    },
    to: {
        type: String,
        default: "",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    animated: {
        type: Boolean,
        default: false,
    },
    shadow: {
        type: Boolean,
        default: true,
    },
    width: {
        type: String,
        default: "100%",
    },
})

const onClick = () => {
    if (props.to) {
        // console.log(props.animated);
        useRouter().push(props.to)
    }
}

</script>

<template>
    <button :style="{ background: color }" class="btn"
        :class="{ 'btnActive': !disabled, 'animated': animated, 'shadow': shadow }" @click="onClick">
        <span :style="{ width: width }">
            <slot></slot>
        </span>
    </button>
</template>


<style scoped>
.btn {
    cursor: text;
    /* selectabile */
    -webkit-user-select: text;
    -moz-user-select: text;
    font: "Fira Code", monospace;
    transition: 0.2s;
    display: inline-block;
    color: white;
    border-radius: 0.5rem;
    backdrop-filter: blur(0.5rem);
    margin: 0.5rem;
    /* padding: 0.5rem; */
    font-weight: bold;
}

.shadow {
    box-shadow: 0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
}

.btn>span {
    border-radius: 0.5rem;
    background-color: #00000000;
    padding: .5rem;
    display: inline-block;
}

.animated {
    /* animation: wiggle 0.4s; */
}

.btnActive {
    cursor: pointer;
}

.btnActive:hover {
    position: relative;
    top: -0.1rem;
}

.btnActive:hover>span {
    background-color: #00000014;
}

.animated:hover {
    animation: wiggle 0.4s ease-in-out;
}

.btnActive:active {
    position: relative;
    top: 0.1rem;
}

.btnActive:active>span {
    background-color: #ffffff47;
}

.animated:active {
    animation: pressed 0.1s;
}

@keyframes wiggle {
    0% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(5deg);
    }

    50% {
        transform: rotate(0deg);
    }

    75% {
        transform: rotate(-5deg);
    }

    100% {
        transform: rotate(0deg);
    }
}

@keyframes pressed {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(0.1rem);
    }

    100% {
        transform: translateY(0);
    }
}</style>