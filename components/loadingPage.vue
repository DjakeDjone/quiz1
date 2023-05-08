<script lang="ts">

export default defineComponent({
    name: "LoadingPage",
    setup() {
        return {
        }
    },
    data() {
        const loadingPoints: string[] = ['', '.', '..', '...'];
        let loadingPoint = 0;
        return {
            loadingPoints,
            loadingPoint,
        }
    },
    mounted() {
        setInterval(async () => {
            if (this.loadingPoint < this.loadingPoints.length - 1) {
                this.loadingPoint++;
            } else {
                this.loadingPoint = 0;
            }
        }, 500);
    },
    methods: {
    }
});
</script>


<template>
    <main>
        <h2>Loading</h2>
        <h3>{{ loadingPoints[loadingPoint] }}</h3>
    </main>
</template>


<style scoped>
main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease-in-out;
}
main * {
    margin: 0;
    padding: 0;
    transition: all 0.5s ease-in-out;
}
</style>