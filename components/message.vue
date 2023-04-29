<template>
    <span class="msg">
        <slot></slot>
    </span>
</template>

<style scoped>
.msg {
    display: flex;
    max-width: 20rem;
    padding: .8rem;
    border-radius: 1rem;
    background: #33333354;
    color: #fff;
    margin: 0.5rem 0;
}
</style>