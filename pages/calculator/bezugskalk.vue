<script setup lang="ts">
const rechnungspreis = ref(0);
const rabatt = ref(0);
const fakturspesen = ref(0);
const skonto = ref(0);
const eigene_bezugsspesen = ref(0);

// calculated
const rabattierter_preis = computed(() => {
    if (rechnungspreis.value === 0) {
        return 0;
    }
    rechnungspreis.value * (1 - rabatt.value / 100)
});
const zielpreis = computed(() => {
    if (rabattierter_preis.value === 0) {
        return 0;
    }
    rabattierter_preis.value + fakturspesen.value
});
const kassapreis = computed(() => {
    if (zielpreis.value === 0) {
        return 0;
    }
    zielpreis.value * (1 - skonto.value / 100)
});

const einstandspreis = computed(() => {
    if (kassapreis.value === 0) {
        return 0;
    }
    kassapreis.value + eigene_bezugsspesen.value
});


</script>

<template>
    <main class="p-4">
        <h1 class="text-2xl">
            Progressive Bezugskalkulation
        </h1>
        <div>
            <v-text-field v-model="rechnungspreis" label="Rechnungspreis" type="number"></v-text-field>
            <v-text-field v-model="rabatt" label="Rabatt" type="number"></v-text-field>
            <v-text-field v-model="fakturspesen" label="Fakturspesen" type="number"></v-text-field>
            <v-text-field v-model="skonto" label="Skonto" type="number"></v-text-field>
            <v-text-field v-model="eigene_bezugsspesen" label="Eigene Bezugsspesen" type="number"></v-text-field>
            {{ rabattierter_preis }}
            {{ zielpreis }}
            {{ kassapreis }}
            {{ einstandspreis }}
        </div>
    </main>
</template>