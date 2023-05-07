<script lang="ts">

export default defineComponent({
    name: "RadioBoxes",
    setup() {
        return {
            props: {
                value: String,
                name: String,
            },
        }
    },
    data() {
        return {
            chosen: 0,
        }
    },
    methods: {
    }
});
</script>


<template>
    <div id="radioBox">
    </div>
</template>


<style scoped>
#radioBox {
    width: 1rem;
    height: 1rem;
    /* border: 2px solid black; */
    background-color: rgba(255, 255, 255, 0.319);
    border-radius: 50% 50% 0 50%;
    margin: 0.3rem;
    margin-right: 1rem;
    cursor: pointer;
}
</style>