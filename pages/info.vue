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
    // animate the headline if the element is on the top of the screen
    // move the headlline to the left if the element is on the top of the screen
    gsap.to("#headline", {
        scrollTrigger: {
            trigger: "#placeholder2",
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
        fontSize: "2rem",
        x: (i, target) => {
            return ((target.offsetWidth - window.innerWidth) / 2) + 15;
        },
    });
});

</script>

<template>
    <!-- <BgWave /> -->
    <main class="p-4 flex justify-center items-center flex-col">
        <div class="h-[calc(50vh-10rem)]" id="placeholder">

        </div>
        <b-button id="headline" class="text-center text-7xl btn sticky top-3 z-10 p-3" disabled color="#ffffff50"
            :shadow="false">
            <span class="text-7xl text-[#000000d5] dark:!text-white">
                <span v-for="letter, i in 'Learning'" :key="letter" :style="{ animationDelay: `${i * 1}s` }"
                    class="hadlineLetter">
                    {{ letter }}
                </span>
            </span>
        </b-button>
        <div class="mx-auto inline-block w-fit" id="benefits" color="white">
            <b-button class="btn benefitWords absolute text-4xl" v-for="benefit, i in benefit_words" :key="benefit"
                :style="{ animationDelay: `${(3 - i) * 3}s` }" disabled color="#ffffff50" :shadow="false">
                <div class="text-[#000000d5] dark:!text-white">
                    {{ benefit }}
                </div>
            </b-button>
        </div>
        <div id="placeholder2" class="!h-96">
        </div>
        <div id="placeholder3" class="!h-96">
        </div>
        <div class="h-screen w-full" id="offer">
            <h1 class="text-4xl text-center">
                Plans & Pricing
            </h1>
            <div class="flex justify-center flex-col items-center lg:items-stretch lg:flex-row">
                <b-card class="mt-8" bg="#ffffff3f" headline="Premium" subheadline="- on request -"
                    color="var(--v-theme-primary)" width="20rem">
                    <p class="offerAdvantage">
                        <v-icon>mdi-check</v-icon> <span>
                            1GB Storage
                        </span>
                    </p>
                    <p class="offerAdvantage">
                        <v-icon>mdi-check</v-icon> <span>
                            All Features
                        </span>
                    </p>
                    <b-button to="/login" animated class="w-full mt-auto">
                        Request
                    </b-button>
                </b-card>
                <b-card headline="Get started" subheadline="<span class='text-green'>- always free -</span>" width="20rem" bg="#ffffff2f">
                    <p class="offerAdvantage">
                        <v-icon>mdi-check</v-icon> <span>
                            5 MB Storage
                        </span>
                    </p>
                    <p class="offerAdvantage mb-16">
                        <v-icon>mdi-check</v-icon> <span>
                            All necessary Features
                        </span>
                    </p>
                    <div class="h-full flex justify-around items-end">
                        <b-button to="/login" animated width="7rem">
                            Sign in
                        </b-button>
                        <b-button to="/register" animated width="7rem">
                            Sign up
                        </b-button>
                    </div>
                </b-card>
                <b-card class="mt-8" bg="#ffffff4f" headline="Korruptes VIP Paket"
                    subheadline="- vip -" color="var(--v-theme-primary)" width="20rem">
                    <p class="offerAdvantage">
                        <v-icon>mdi-crown</v-icon>
                        <span>
                            Unlimited Storage
                        </span>
                    </p>
                    <p class="offerAdvantage mb-8">
                        <v-icon>mdi-crown</v-icon>
                        <span>
                            Others call you King 😎
                        </span>
                    </p>
                    <b-button to="/login" animated class="w-full mt-auto">
                        VIP-Request
                    </b-button>
                </b-card>
            </div>
        </div>
    </main>
</template>

<style scoped>
.offerAdvantage {
    font-size: 1.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin: 0.5rem;
    font-weight: bold;
    display: flex;
}

.offerAdvantage>span {
    margin-left: 1rem;
    text-align: left;
}

.offerAdvantage>.v-icon {
    margin-right: 0.5rem;
    font-size: 2rem;
}

.textGradient {
    background: linear-gradient(100deg,
            #1a9f8a,
            #a86265);
    text-shadow: 0 0 0.5rem 0.5rem rgba(255, 255, 255, 0.1);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
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