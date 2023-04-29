<template>
    <div class="question" id="currentQuestion">
        <slot class="question__text" name="question"></slot>
    </div>
</template>

<style scoped>
.question {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 1rem;
    background-color: rgba(51, 51, 51, 0.283);
}
.question__text {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1rem;
}
</style>