<script lang="ts">
import { useUserstore } from './stores/user';
import { useMessagestore } from './stores/msg';
import { useQuizStore } from './stores/quiz';
import { Html } from './.nuxt/components';

export default defineComponent({
  name: 'App',
  setup() {
    const user = useUserstore();
    const messagestore = useMessagestore();
    const quiz = useQuizStore();
    return { user, messagestore, quiz };
  },
  mounted() {
    console.log('App mounted')
    this.user.loadCookies();
    this.user.connect();
  },
  methods: {
    changeColorMode() {
      const checkbox = document.querySelector('.switch input[type="checkbox"]') as HTMLInputElement;

    },
  },
})
</script>

<template>
  <main id="mainMain">
    <nav>
      <ul>
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/create">Create</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/user">User</NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="page">
      <NuxtPage />
    </div>
    <div id="errorFeld">
      <TransitionGroup name="list" tag="ul">
        <li v-for="msg in messagestore.messages" :key="msg.id">
          <Message>
            {{ msg.content }}
          </Message>
        </li>
      </TransitionGroup>
    </div>
  </main>
</template>
<style>

.checkbox-wrapper-54 input[type="checkbox"] {
  visibility: hidden;
  display: none;
}
/* #mode {
  position: absolute;
  right: 0;
  top: 0;
  margin: 1em;
} */
.checkbox-wrapper-54 *,
.checkbox-wrapper-54 ::after,
.checkbox-wrapper-54 ::before {
  box-sizing: border-box;
}

/* The switch - the box around the slider */
.checkbox-wrapper-54 .switch {
  --width-of-switch: 3em;
  --height-of-switch: 1em;
  /* size of sliding icon -- sun and moon */
  --size-of-icon: 1em;
  /* it is like a inline-padding of switch */
  --slider-offset: 0.3em;
  position: relative;
  width: var(--width-of-switch);
  height: var(--height-of-switch);
  display: inline-block;
}

/* The slider */
.checkbox-wrapper-54 .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  transition: .4s;
  border-radius: 30px;
}

.checkbox-wrapper-54 .slider:before {
  position: absolute;
  content: "";
  height: var(--size-of-icon, 1.4em);
  width: var(--size-of-icon, 1.4em);
  border-radius: 20px;
  left: var(--slider-offset, 0.3em);
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
  transition: .4s;
}

.checkbox-wrapper-54 input:checked+.slider {
  background-color: transparent;
}

.checkbox-wrapper-54 input:checked+.slider:before {
  left: calc(100% - (var(--size-of-icon, 1.4em) + var(--slider-offset, 0.3em)));
  background: #303136;
  /* change the value of second inset in box-shadow to change the angle and direction of the moon  */
  box-shadow: inset -3px -2px 5px -2px #8983f7, inset -10px -4px 0 0 #a3dafb;
}

* {
  text-align: center;
}

input[type="text"] {
  transition: all 0.3s ease-in-out;
  width: calc(100%-3rem);
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  font-size: 1.2rem;
  font-family: inherit;
  background-color: var(--bg-color-secondary);
  scale: 1;
  margin: auto;
}

input[type="text"]:focus {
  box-shadow: var(--box-shadow);
  scale: 1.05;
}



/* define variables */
:root {
  --color-primary: #000;
  --color-secondary: #ffffff;
  --bg-color-primary: #ffffff60;
  --bg-color-secondary: #7c7c7c4e;
  --nav-color-primary: #b9b9b9ab;
  --box-shadow: #00000095 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  --box-shadow-light: #00000063 0px 10px 20px, rgba(0, 0, 0, 0.108) 0px 6px 6px;
  --box-shadow-small: #00000063 0px 10px 20px, rgba(0, 0, 0, 0.108) 0px 6px 6px;
  --box-shadow-card: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
}

/* darkmode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #fff;
    --color-secondary: #000;
    --bg-color-primary: #000000ec;
    --bg-color-secondary: #ffffff2e;
    --nav-color-primary: #ffffff1e;
    --shadow-color: rgba(240, 46, 170, 0.4);
    --box-shadow: var(--shadow-color) 0px 0px 0px 3px;
    --box-shadow-light: var(--shadow-color) 0px 0px 0px 4px, rgba(240, 46, 170, 0.3) 0px 0px 0px 5px, rgba(240, 46, 170, 0.2) 0px 0px 0px 6px, rgba(240, 46, 170, 0.1) 0px 0px 0px 7px, rgba(240, 46, 170, 0.05) 0px 0px 0px 8px;
    /* --box-shadow-light: var(--shadow-color) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px; */

    --box-shadow-small: var(--shadow-color) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px;
    --box-shadow-card: var(--shadow-color) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px;
    --box-shadow-card-hover: var(--shadow-color) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px;

    /* --box-shadow-small: #ffffff63 0px 10px 20px, rgba(0, 0, 0, 0.108) 0px 6px 6px; */
    /* --box-shadow-card: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset; */
    /* --box-shadow-card-hover: rgb(204, 219, 232) 1px 1px 4px 0px inset, rgba(255, 255, 255, 0.5) -4px -5px 5px 1px inset; */
  }

  * {
    color: white;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
}

.page {
  padding: 1rem;
  padding-top: 4rem;
  min-height: 100vh;
  background-color: var(--bg-color-primary);
}
</style>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  backdrop-filter: blur(10px);
  box-shadow: var(--box-shadow);
}

nav ul {
  display: flex;
  list-style: none;
  padding: .8rem;
  align-items: center;
  justify-content: space-around;
  background-color: var(--nav-color-primary);
  font-size: 1.2rem;
  text-decoration: none;
}

.router-link-active {
  text-decoration: underline;
}

a {
  text-decoration: none;
  color: var(--color-primary);
}

#errorFeld {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 1rem;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

*::-webkit-scrollbar {
  width: 0.5rem;
}

.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

@media screen and (max-width: 768px) {
  #errorFeld {
    align-items: flex-end;
  }
}
</style>
