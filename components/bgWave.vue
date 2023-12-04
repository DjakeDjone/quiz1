<script setup lang="ts">
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(MotionPathPlugin);
// gsap.registerPlugin(ScrollTrigger);

const wave = {
    y: 132,
    length: 0.01,
    amplitude: 50,
    frequency: 0.007,
};

interface Wave {
    el: string;
    speed: number;
    amplitude: number;
    points: number;
}


onMounted(() => {
    const canvas = document.getElementById('waveCanvas') as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    wave.y = canvas.height / 2;


    // let increment = wave.frequency;
    let increment = 300;
    let frequency_wavy = 100;

    function animate() {
        // move the wave cubic-bezier
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
        ctx.beginPath(); // start drawing
        ctx.moveTo(0, canvas.height / 2); // move to the middle of the screen

        for (let i = 0; i < canvas.width; i++) {
            ctx.lineTo(i,	
            wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment));
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();
        increment += wave.frequency * (100 / frequency_wavy);
        frequency_wavy += 1;
        if (frequency_wavy > 1000) {
            frequency_wavy = 1000;
        }
        requestAnimationFrame(animate);
    }


    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
        wave.amplitude = ((e.clientY - canvas.height / 2) / canvas.height) * 20 ** 2 * ((e.clientX - canvas.width / 2) / canvas.width) * 20 ** .2;
    });
    window.addEventListener('click', (e) => {
    });
});

</script>

<template>
    <div class="fixed top-0 right-0 object-cover -z-2">
        <canvas id="waveCanvas" class="rotate-2"></canvas>
        <canvas id="bubbleCanvas" class="rotate-2"></canvas>
    </div>
</template>

<style scoped></style>