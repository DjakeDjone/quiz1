<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger);

const benefit_words = [
    "stressfree",
    "painless",
    "easy",
]

onMounted(() => {
    // animate the headline
    gsap.from("#headline", {
        duration: 2,
        y: -50,
        opacity: 0,
        ease: "back",
    });
    // animate the benefits
    gsap.from("#benefits", {
        duration: 2,
        y: -50,
        opacity: 0,
        ease: "back",
    });
    gsap.from(".benefitWords", {
        duration: 2,
        y: -50,
        opacity: 0,
        ease: "back",
        stagger: 0.5,
    });
});

</script>

<template>
    <!-- <BgWave /> -->
    <main class="p-4 flex justify-center items-center flex-col">
        <div class="h-[calc(50vh-10rem)]">

        </div>
        <div class="btn sticky top-0 z-10" id="headline">
            <span class="textGradient text-7xl">
                <span v-for="letter, i in 'Learning'" :key="letter" :style="{ animationDelay: `${i * 1}s` }" class="hadlineLetter">
                    {{ letter }}
                </span>
            </span>
        </div>
        <div class="mx-auto inline-block w-fit" id="benefits">
            <div class="btn benefitWords absolute text-4xl" v-for="benefit, i in benefit_words" :key="benefit"
                :style="{ animationDelay: `${(3 - i) * 3}s` }">
                <div>
                    {{ benefit }}
                </div>
            </div>
        </div>
        <div class="h-screen">
        </div>
        <div class="h-screen">
        </div>
    </main>
</template>

<style scoped>
.textGradient {
    background: linear-gradient(45deg, #71F6DD, #FEB9B8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.btn {
    font: "Fira Code", monospace;
    display: inline-block;
    background-color: #0000009f;
    color: white;
    border-radius: 0.5rem;
    backdrop-filter: blur(0.5rem);
    padding: 1rem;
    margin: 0.5rem;
    font-weight: bold;
}

.benefitWords {
    font-size: 1.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin: 0.5rem;
    font-weight: bold;
    color: white;
    /* opacity: 0; */
    animation: switch 9s infinite;
    /* animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); */
}


@keyframes switch {
    0% {
        opacity: 1;
        transform: translateY(0);
    }

    33% {
        opacity: 0;
        transform: translateY(-2rem);
    }

    66% {
        opacity: 0;
        transform: translateY(2rem);
    }

    70% {
        opacity: 0;
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.hadlineLetter {
    animation: textBump 3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes textBump {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-0.5rem);
    }
    100% {
        transform: translateY(0);
    }
}
</style>